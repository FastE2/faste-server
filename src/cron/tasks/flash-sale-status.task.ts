import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { FLASH_SALE_STATUS } from 'src/common/constants/flash-sale.constant';

@Injectable()
export class FlashSaleStatusTask {
  private readonly logger = new Logger(FlashSaleStatusTask.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleFlashSaleStatuses() {
    this.logger.log('Running task: handleFlashSaleStatuses');
    const now = new Date();

    try {
      // 1. Transition SCHEDULED -> LIVE
      const startResult = await this.prisma.flashSale.updateMany({
        where: {
          status: FLASH_SALE_STATUS.SCHEDULED as any,
          startAt: { lte: now },
          endAt: { gt: now },
          deletedAt: null,
        },
        data: {
          status: FLASH_SALE_STATUS.LIVE as any,
        },
      });

      if (startResult.count > 0) {
        this.logger.log(
          `Started ${startResult.count} flash sales (SCHEDULED -> LIVE).`,
        );
      }

      // 2. Transition LIVE -> ENDED
      const endResult = await this.prisma.flashSale.updateMany({
        where: {
          status: FLASH_SALE_STATUS.LIVE as any,
          endAt: { lte: now },
          deletedAt: null,
        },
        data: {
          status: FLASH_SALE_STATUS.ENDED as any,
        },
      });

      if (endResult.count > 0) {
        this.logger.log(
          `Ended ${endResult.count} live flash sales (LIVE -> ENDED).`,
        );
      }

      // 3. Transition SCHEDULED -> ENDED (if they missed starting)
      const missedResult = await this.prisma.flashSale.updateMany({
        where: {
          status: FLASH_SALE_STATUS.SCHEDULED as any,
          endAt: { lte: now },
          deletedAt: null,
        },
        data: {
          status: FLASH_SALE_STATUS.ENDED as any,
        },
      });

      if (missedResult.count > 0) {
        this.logger.log(
          `Ended ${missedResult.count} missed flash sales (SCHEDULED -> ENDED).`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in handleFlashSaleStatuses: ${error.message}`,
        error.stack,
      );
    }
  }
}
