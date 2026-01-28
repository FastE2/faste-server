import { PrismaService } from 'src/prisma/prisma.service';
import { WebhookPaymentBodyType } from 'src/modules/payment/payment.schema';
import { PaymentProducer } from './payment.producer';
export declare class PaymentRepository {
    private readonly prismaService;
    private readonly paymentProducer;
    constructor(prismaService: PrismaService, paymentProducer: PaymentProducer);
    private getTotalPrice;
    receiver(body: WebhookPaymentBodyType): Promise<number>;
}
