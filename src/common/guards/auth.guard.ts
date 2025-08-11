import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTH_NOT_REQUIRED,
  REQUEST_USER_KEY,
} from '../constants/auth.constant';
import { Request } from 'express';
import { CommonUserRepository } from '../repositories/common-user.repository';
import { TokenService } from '../libs/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => CommonUserRepository))
    private commonUserRepository: CommonUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowAny = this.reflector.getAllAndOverride<boolean>(
      AUTH_NOT_REQUIRED,
      [context.getHandler(), context.getClass()],
    );

    if (allowAny) return true;

    await this.authenticateRequest(context);
    return true;
  }

  private async authenticateRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);

    try {
      const payload = await this.tokenService.verifyAccessToken(token);

      if (!payload) {
        this.throwException('Error.UnableToDecodeToken');
      }
      const user = await this.validate(payload.userId);
      if (!user) {
        this.throwException('Error.InvalidToken');
      }
      request[REQUEST_USER_KEY] = payload;
    } catch (e) {
      this.throwException('Error.InvalidToken');
    }
  }

  private validate(id: number) {
    return this.commonUserRepository.findUniqueUser({ id });
  }

  private getToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!type || !token) {
      this.throwException('Unauthorized', 'auth');
    }
    if (type.toLowerCase() !== 'bearer') {
      this.throwException('Error.AuthorizationTypeNotValid');
    }

    if (!token) {
      this.throwException('Error.TokenNotProvided');
    }
    return token;
  }

  throwException(message: string, path?: string) {
    throw new UnauthorizedException({
      message,
      path: path ?? 'token',
    });
  }
}
