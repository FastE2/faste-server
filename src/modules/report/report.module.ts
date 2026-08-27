import { Module } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { SellerReportService } from './seller-report.service';
import { SellerReportController } from './seller-report.controller';
import { AdminReportService } from './admin-report.service';
import { AdminReportController } from './admin-report.controller';

@Module({
  controllers: [SellerReportController, AdminReportController],
  providers: [ReportRepository, SellerReportService, AdminReportService],
  exports: [ReportRepository],
})
export class ReportModule {}
