import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WS_EVENT, WS_NAMESPACE } from '../constants/socket.constant';

@WebSocketGateway({ namespace: WS_NAMESPACE.PAYMENT })
export class PaymentGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-money')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit(WS_EVENT.PAYMENT.RECEIVE, {
      data: `Money: ${data}`,
    });
    return data;
  }
}
