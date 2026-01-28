import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CommonPaymentRepository } from 'src/common/repositories/common-payment.repository';
export declare class PaymentConsumer extends WorkerHost {
    private readonly commonPaymentRepository;
    constructor(commonPaymentRepository: CommonPaymentRepository);
    process(job: Job<{
        paymentId: number;
    }, any, string>): Promise<any>;
}
