import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonUserRepository } from '../repositories/common-user.repository';
import { TokenService } from '../libs/token/token.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly tokenService;
    private readonly prismaService;
    private commonUserRepository;
    constructor(reflector: Reflector, tokenService: TokenService, prismaService: PrismaService, commonUserRepository: CommonUserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private authenticateRequest;
    private validate;
    private validateUserPermission;
    private getToken;
    throwException(message: string): void;
}
