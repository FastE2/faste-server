import { PaymentService } from './payment.service';
import { WebhookPaymentBodyDTO } from './payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    receiver(body: WebhookPaymentBodyDTO): Promise<{
        message: string;
    }>;
}
