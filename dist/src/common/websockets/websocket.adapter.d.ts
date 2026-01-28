import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server } from 'socket.io';
export declare class WebsocketAdapter extends IoAdapter {
    private readonly tokenService;
    private adapterConstructor;
    constructor(app: INestApplicationContext);
    connectToRedis(): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): Server;
    private registerAuthMiddleware;
    private wsAuthMiddleware;
}
