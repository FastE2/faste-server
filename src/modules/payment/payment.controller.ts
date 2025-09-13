import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { PaymentService } from './payment.service';
import { WebhookPaymentBodyDTO } from './payment.dto';
import { PaymentAPIKey } from 'src/common/decorators/payment-api-key.decorator';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('payment')
@UseGuards(ApiKeyGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/receiver')
  @ZodSerializerDto(MessageResDTO)
  @PaymentAPIKey()
  receiver(@Body() body: WebhookPaymentBodyDTO) {
    return this.paymentService.receiver(body);
  }
}
