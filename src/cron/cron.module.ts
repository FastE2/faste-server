import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import envConfig from 'src/common/configs/validate-env';
import { FlashSaleStatusTask } from './tasks/flash-sale-status.task';
import { VerificationCodeTask } from './tasks/verification-code.task';
import { ProductViewsTask } from './tasks/product-views.task';
import { RefreshTokenTask } from './tasks/refresh-token.task';
import { ReportSnapshotTask } from './tasks/report-snapshot.task';
import { ReportModule } from 'src/modules/report/report.module';

const tasks = envConfig.CRON_ENABLED
  ? [ProductViewsTask, RefreshTokenTask, ReportSnapshotTask]
  : [];

@Module({
  imports: [
    ...(envConfig.CRON_ENABLED ? [ScheduleModule.forRoot()] : []),
    ReportModule,
  ],
  providers: tasks,
  exports: tasks,
})
export class CronModule {}
