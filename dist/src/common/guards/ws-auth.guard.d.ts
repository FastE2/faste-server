import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../libs/token/token.service';
export declare class WsAuthGuard implements CanActivate {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
