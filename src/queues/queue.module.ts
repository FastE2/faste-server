// src/queues/queue.module.ts
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import envConfig from 'src/common/configs/validate-env';
import { PAYMENT_QUEUE_NAME } from 'src/common/constants/queue.constant';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: envConfig.REDIS_URL,
      },
    }),
    BullModule.registerQueue({ name: PAYMENT_QUEUE_NAME }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
