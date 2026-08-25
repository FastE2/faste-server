import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import envConfig from 'src/common/configs/validate-env';
import { FlashSaleStatusTask } from './tasks/flash-sale-status.task';
import { VerificationCodeTask } from './tasks/verification-code.task';
import { ProductViewsTask } from './tasks/product-views.task';

const tasks = envConfig.CRON_ENABLED ? [ProductViewsTask] : [];

@Module({
  imports: envConfig.CRON_ENABLED ? [ScheduleModule.forRoot()] : [],
  providers: tasks,
  exports: tasks,
})
export class CronModule {}
