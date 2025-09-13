import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PAYMENT_QUEUE_NAME } from 'src/common/constants/queue.constant';
import { generateCancelPaymentJobId } from 'src/common/helpers/generate';

@Injectable()
export class PaymentProducer {
  constructor(@InjectQueue(PAYMENT_QUEUE_NAME) private paymentQueue: Queue) {}

  removeJob(transactionId: number) {
    return this.paymentQueue.remove(generateCancelPaymentJobId(transactionId));
  }
}
