"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_constant_1 = require("../constants/auth.constant");
const common_user_repository_1 = require("../repositories/common-user.repository");
const token_service_1 = require("../libs/token/token.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthGuard = class AuthGuard {
    reflector;
    tokenService;
    prismaService;
    commonUserRepository;
    constructor(reflector, tokenService, prismaService, commonUserRepository) {
        this.reflector = reflector;
        this.tokenService = tokenService;
        this.prismaService = prismaService;
        this.commonUserRepository = commonUserRepository;
    }
    async canActivate(context) {
        const allowAny = this.reflector.getAllAndOverride(auth_constant_1.AUTH_NOT_REQUIRED, [context.getHandler(), context.getClass()]);
        if (allowAny)
            return true;
        await this.authenticateRequest(context);
        return true;
    }
    async authenticateRequest(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);
        try {
            const payload = await this.tokenService.verifyAccessToken(token);
            if (!payload) {
                this.throwException('Error.UnableToDecodeToken');
            }
            const [user] = await Promise.all([
                this.validate(payload.userId),
                this.validateUserPermission(payload, request),
            ]);
            console.log('Authenticated user:', user);
            if (!user) {
                this.throwException('Error.InvalidToken');
            }
            request[auth_constant_1.REQUEST_USER_KEY] = payload;
        }
        catch (error) {
            console.log('Authorize', error);
            throw error;
        }
    }
    validate(id) {
        console.log('Validating user with id:', id);
        return this.commonUserRepository.findUniqueUser({ id });
    }
    async validateUserPermission(decodedAccessToken, request) {
        const roleId = decodedAccessToken.roleId;
        const path = request.route?.path?.replace(/^\/api\/v\d+/, '') || request.originalUrl.split('?')[0].replace(/^\/api\/v\d+/, '');
        const method = request.method;
        console.log('Validating permissions for roleId:', roleId, 'path:', path, 'method:', method);
        await this.prismaService.rolePermission
            .findFirst({
            where: {
                roleId,
                role: {
                    deletedAt: null,
                    isActive: true,
                },
                permission: {
                    deletedAt: null,
                    path,
                    method,
                },
            },
            select: {
                role: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
                permission: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })
            .catch((error) => {
            console.log("auth guard - validateUserPermission", error);
            throw new common_1.ForbiddenException();
        });
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
            throw new common_1.ForbiddenException();
        });
        const canAccess = role.permissions.length > 0;
        if (!canAccess) {
            throw new common_1.ForbiddenException();
        }
        request[auth_constant_1.REQUEST_ROLE_PERMISSIONS] = role;
    }
    getToken(request) {
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
    throwException(message) {
        throw new common_1.UnauthorizedException({
            message,
        });
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => common_user_repository_1.CommonUserRepository))),
    __metadata("design:paramtypes", [core_1.Reflector,
        token_service_1.TokenService,
        prisma_service_1.PrismaService,
        common_user_repository_1.CommonUserRepository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map