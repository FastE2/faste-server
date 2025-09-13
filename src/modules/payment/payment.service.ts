import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/modules/payment/payment.repository';
import { WebhookPaymentBodyType } from 'src/modules/payment/payment.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers/generate';
import { WS_EVENT, WS_NAMESPACE } from 'src/common/constants/socket.constant';

@Injectable()
@WebSocketGateway({ namespace: WS_NAMESPACE.PAYMENT })
export class PaymentService {
  @WebSocketServer()
  server: Server;
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async receiver(body: WebhookPaymentBodyType) {
    const userId = await this.paymentRepository.receiver(body);
    this.server.to(generateRoomUserId(userId)).emit(WS_EVENT.PAYMENT.PAYMENT, {
      status: 'success',
    });

    return {
      message: 'Payment received successfully',
    };
  }
}
