import { Queue } from 'bullmq';
export declare class OrderProducer {
    private paymentQueue;
    constructor(paymentQueue: Queue);
    scheduleCancelJob(transactionId: number): Promise<void>;
}
