import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  forwardRef,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTH_NOT_REQUIRED,
  REQUEST_ROLE_PERMISSIONS,
  REQUEST_USER_KEY,
} from '../constants/auth.constant';
import { Request } from 'express';
import { CommonUserRepository } from '../repositories/common-user.repository';
import { TokenService } from '../libs/token/token.service';
import { AccessTokenPayload } from '../types/jwt.type';
import { HTTPMethod } from '../constants/method.constant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
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
      // console.log('payload', payload);
      if (!payload) {
        this.throwException('Error.UnableToDecodeToken');
      }
      // const [user, _] = await Promise.all([
      //   this.validate(payload.userId),
      //   this.validateUserPermission(payload, request),
      // ]);
      // if (!user) {
      //   this.throwException('Error.InvalidToken');
      // }
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      console.log('Authorize');
      throw error;
    }
  }

  private validate(id: number) {
    console.log('Validating user with id:', id);
    return this.commonUserRepository.findUniqueUser({ id });
  }

  private async validateUserPermission(
    decodedAccessToken: AccessTokenPayload,
    request: any,
  ): Promise<void> {
    const roleId: number = decodedAccessToken.roleId;
    const path = request.originalUrl.split('?')[0].replace(/^\/api\/v\d+/, '');
    const method = request.method as keyof typeof HTTPMethod;
    // const data = await this.prismaService.rolePermission
    //   .findFirst({
    //     where: {
    //       roleId,
    //       role: {
    //         deletedAt: null,
    //         isActive: true,
    //       },
    //       permission: {
    //         deletedAt: null,
    //         path,
    //         method,
    //       },
    //     },
    //     select: {
    //       role: {
    //         select: {
    //           name: true,
    //           id: true,
    //         },
    //       },
    //       permission: {
    //         select: {
    //           id: true,
    //           name: true,
    //         },
    //       },
    //     },
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     throw new ForbiddenException();
    //   });
    // console.log('OKOKOKK', data);

    const role = await this.prismaService.role
      .findUniqueOrThrow({
        where: {
          id: roleId,
          deletedAt: null,
          isActive: true,
        },
        include: {
          permissions: {
            where: {
              deletedAt: null,
              path,
              method,
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
        throw new ForbiddenException();
      });
    const canAccess = role.permissions.length > 0;
    if (!canAccess) {
      throw new ForbiddenException();
    }
    request[REQUEST_ROLE_PERMISSIONS] = role;
  }

  private getToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!type || !token) {
      this.throwException('Unauthorized');
    }
    if (type.toLowerCase() !== 'bearer') {
      this.throwException('Error.AuthorizationTypeNotValid');
    }

    if (!token) {
      this.throwException('Error.TokenNotProvided');
    }
    return token;
  }

  throwException(message: string) {
    throw new UnauthorizedException({
      message,
    });
  }

  // throwException(ctx: ExecutionContext, message: string) {
  //   if (ctx.getType() === 'ws') {
  //     ctx.switchToWs().getClient<Socket>().disconnect(true);
  //   }

  //   throw new UnauthorizedException(message);
  // }
}
