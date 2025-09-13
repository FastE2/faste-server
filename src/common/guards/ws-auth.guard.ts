// src/common/guards/ws-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { TokenService } from '../libs/token/token.service';
import { generateRoomUserId } from '../helpers/generate';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const token = client.handshake?.headers?.authorization;

    if (!token) {
      throw new WsException('Missing authorization header');
    }

    const accessToken = token.split(' ')[1];
    try {
      const { userId } = await this.tokenService.verifyAccessToken(accessToken);

      client.userId = userId;

      client.join(generateRoomUserId(userId));

      return true;
    } catch (err) {
      throw new WsException('Unauthorized');
    }
  }
}
