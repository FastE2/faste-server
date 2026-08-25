import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';

@Injectable()
export class ProductViewsTask {
  private readonly logger = new Logger(ProductViewsTask.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: Redis,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncProductViews() {
    this.logger.log('Starting sync product views from Redis to DB...');

    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const stream = this.redis.scanStream({
        match: `views:product:*:${yesterdayStr}`,
        count: 100,
      });

      let totalSyncedKeys = 0;

      for await (const keys of stream) {
        if (!keys || keys.length === 0) continue;

        const pipeline = this.redis.pipeline();
        keys.forEach((key: string) => pipeline.pfcount(key));
        const results = await pipeline.exec();

        if (!results) continue;

        const updatePromises: Promise<any>[] = [];

        results.forEach(([err, count], index) => {
          if (err) {
            this.logger.error(
              `Error pfcount for key ${keys[index]}: ${err.message}`,
            );
            return;
          }

          const uniqueViews = Number(count) || 0;
          if (uniqueViews > 0) {
            const parts = keys[index].split(':');
            const slugId = parts[2];

            if (slugId) {
              updatePromises.push(
                this.prisma.product.updateMany({
                  where: { slugId, deletedAt: null },
                  data: {
                    totalViews: {
                      increment: uniqueViews,
                    },
                  },
                }),
              );
            }
          }
        });

        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
          totalSyncedKeys += updatePromises.length;
        }
      }

      this.logger.log(
        `Finished syncing product views to DB. Total products updated: ${totalSyncedKeys}`,
      );
    } catch (error: any) {
      this.logger.error(
        `Failed to sync product views: ${error.message}`,
        error.stack,
      );
    }
  }
}
