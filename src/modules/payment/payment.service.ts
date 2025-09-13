import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/modules/payment/payment.repository';
import { WebhookPaymentBodyType } from 'src/modules/payment/payment.schema';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers/generate';

@Injectable()
@WebSocketGateway({ namespace: 'payment' })
export class PaymentService {
  @WebSocketServer()
  server: Server;
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async receiver(body: WebhookPaymentBodyType) {
    const userId = await this.paymentRepository.receiver(body);
    this.server.to(generateRoomUserId(userId)).emit('payment', {
      status: 'success',
    });
    // try {
    //   const websockets = await this.sharedWebsocketRepository.findMany(userId)
    //   websockets.forEach((ws) => {
    //     this.server.to(ws.id).emit('payment', {
    //       status: 'success',
    //     })
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    return {
      message: 'Payment received successfully',
    };
  }
}
