import { PaymentRepository } from 'src/modules/payment/payment.repository';
import { WebhookPaymentBodyType } from 'src/modules/payment/payment.schema';
import { Server } from 'socket.io';
export declare class PaymentService {
    private readonly paymentRepository;
    server: Server;
    constructor(paymentRepository: PaymentRepository);
    receiver(body: WebhookPaymentBodyType): Promise<{
        message: string;
    }>;
}
