import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import envConfig from '../configs/validate-env';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePaymentApiKey = this.reflector.get<boolean>(
      'PAYMENT_API_KEY',
      context.getHandler(),
    );

    if (!requirePaymentApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = Array.isArray(request.headers['x-api-key'])
      ? request.headers['x-api-key'][0]
      : request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('Missing x-api-key header');
    }

    if (apiKey !== envConfig.PAYMENT_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
