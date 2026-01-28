import { Server, Socket } from 'socket.io';
export declare class PaymentGateway {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleEvent(data: string): string;
}
