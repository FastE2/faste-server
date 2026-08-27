import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReportRepository } from 'src/modules/report/report.repository';
import { startOfDay, endOfDay, subDays } from 'date-fns';

@Injectable()
export class ReportSnapshotTask {
  private readonly logger = new Logger(ReportSnapshotTask.name);

  constructor(private readonly reportRepository: ReportRepository) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDailySnapshots() {
    this.logger.log('Starting daily report snapshot generation...');

    try {
      const yesterday = subDays(new Date(), 1);
      const range = {
        from: startOfDay(yesterday),
        to: endOfDay(yesterday),
      };
      const snapshotDate = startOfDay(yesterday);

      // Get all sellers who had orders yesterday
      const sellerIds = await this.reportRepository.getActiveSellerIds(range);
      this.logger.log(
        `Found ${sellerIds.length} active sellers for ${snapshotDate.toISOString().split('T')[0]}`,
      );

      // Generate per-seller snapshots
      for (const sellerId of sellerIds) {
        const overview = await this.reportRepository.getOverview(
          range,
          sellerId,
        );
        await this.reportRepository.upsertSellerDailySnapshot(
          sellerId,
          snapshotDate,
          {
            totalRevenue: overview.totalRevenue,
            totalQuantity: overview.totalProductsSold,
            totalOrders: overview.totalOrders,
            totalReturns: overview.totalReturns,
          },
        );
      }

      // Generate platform-wide admin summary
      const [adminOverview, extras] = await Promise.all([
        this.reportRepository.getOverview(range),
        this.reportRepository.getAdminExtraCounts(range),
      ]);

      await this.reportRepository.upsertAdminDailySummary(snapshotDate, {
        totalRevenue: adminOverview.totalRevenue,
        totalOrders: adminOverview.totalOrders,
        totalQuantity: adminOverview.totalProductsSold,
        totalReturns: adminOverview.totalReturns,
        totalCustomers: extras.totalCustomers,
        totalSellers: extras.totalSellers,
      });

      this.logger.log(
        `Daily report snapshot completed. Sellers: ${sellerIds.length}, Admin summary saved.`,
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to generate daily snapshots: ${message}`,
        stack,
      );
    }
  }
}
