import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenTask {
  private readonly logger = new Logger(RefreshTokenTask.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupExpiredRefreshTokens() {
    this.logger.log('Running task: cleanupExpiredRefreshTokens');
    const now = new Date();

    try {
      const result = await this.prisma.refreshToken.deleteMany({
        where: {
          expiresAt: { lt: now },
        },
      });

      if (result.count > 0) {
        this.logger.log(`Cleaned up ${result.count} expired refresh tokens.`);
      }
    } catch (error: any) {
      this.logger.error(
        `Error in cleanupExpiredRefreshTokens: ${error.message}`,
        error.stack,
      );
    }
  }
}
