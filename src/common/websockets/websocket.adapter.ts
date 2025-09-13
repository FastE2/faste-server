import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server, Socket } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers/generate';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { TokenService } from '../libs/token/token.service';
import envConfig from '../configs/validate-env';

export class WebsocketAdapter extends IoAdapter {
  private readonly tokenService: TokenService;
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(app: INestApplicationContext) {
    super(app);
    this.tokenService = app.get(TokenService);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: envConfig.REDIS_URL });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server: Server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        credentials: true,
      },
    });

    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    }

    this.registerAuthMiddleware(server);

    return server;
  }

  private registerAuthMiddleware(server: Server) {
    // áp dụng cho tất cả namespaces
    server.of(/.*/).use((socket, next) => {
      this.wsAuthMiddleware(socket, next).catch(next);
    });
  }

  private async wsAuthMiddleware(socket: Socket, next: (err?: any) => void) {
    const { authorization } = socket.handshake.headers;
    if (!authorization) {
      return next(new Error('Missing Authorization header'));
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return next(new Error('Invalid Authorization format'));
    }

    try {
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);

      socket.data.userId = userId;

      // join room cho user
      await socket.join(generateRoomUserId(userId));

      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  }
}
