import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PAYMENT_QUEUE_NAME } from 'src/common/constants/queue.constant';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentProducer } from './payment.producer';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PAYMENT_QUEUE_NAME,
    }),
  ],
  controllers: [PaymentController, PaymentProducer, PaymentRepository],
  providers: [PaymentService],
})
export class PaymentModule {}
