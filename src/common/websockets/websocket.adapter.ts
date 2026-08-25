import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server, Socket } from 'socket.io';
import { generateRoomUserId } from 'src/common/helpers/generate';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { TokenService } from '../libs/token/token.service';
import envConfig from '../configs/validate-env';

export class WebsocketAdapter extends IoAdapter {
  private readonly logger = new Logger(WebsocketAdapter.name);
  private readonly tokenService: TokenService;
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(app: INestApplicationContext) {
    super(app);
    this.tokenService = app.get(TokenService);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: envConfig.REDIS_URL,
      pingInterval: 10000,
      socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            this.logger.error('Redis reconnect failed after 10 attempts');
            return new Error('Redis reconnect limit exceeded');
          }
          return Math.min(retries * 200, 3000);
        },
      },
    });

    const subClient = pubClient.duplicate();

    pubClient.on('error', (err) =>
      this.logger.error(`Redis PubClient Error: ${err.message}`),
    );
    subClient.on('error', (err) =>
      this.logger.error(`Redis SubClient Error: ${err.message}`),
    );

    try {
      await Promise.all([pubClient.connect(), subClient.connect()]);
      this.logger.log('Connected to Upstash Redis Adapter successfully');
      this.adapterConstructor = createAdapter(pubClient, subClient);
    } catch (error) {
      this.logger.error(`Failed to connect to Redis: ${error.message}`);
      throw error;
    }
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
      await socket.join(generateRoomUserId(userId));
      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  }
}
