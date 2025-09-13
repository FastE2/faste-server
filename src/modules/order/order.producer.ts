import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  CANCEL_PAYMENT_JOB_NAME,
  PAYMENT_QUEUE_NAME,
} from 'src/common/constants/queue.constant';
import { generateCancelPaymentJobId } from 'src/common/helpers/generate';

@Injectable()
export class OrderProducer {
  constructor(@InjectQueue(PAYMENT_QUEUE_NAME) private paymentQueue: Queue) {}

  async scheduleCancelJob(transactionId: number) {
    await this.paymentQueue.add(
      CANCEL_PAYMENT_JOB_NAME,
      { transactionId },
      {
        delay: 24 * 60 * 60 * 1000, // 24h
        jobId: generateCancelPaymentJobId(transactionId),
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
