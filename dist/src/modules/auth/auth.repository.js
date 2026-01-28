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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthRepository = class AuthRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createUser(user) {
        return this.prismaService.user.create({
            data: user,
            omit: {
                password: true,
                totpSecret: true,
            },
        });
    }
    async createUserIncludeRole(user) {
        return this.prismaService.user.create({
            data: user,
            include: {
                role: true,
            },
        });
    }
    updateOrCreateDeviceUser(body) {
        const deviceUser = this.prismaService.device.upsert({
            where: {
                ip: body.ip,
            },
            create: {
                ip: body.ip,
                userAgent: body.userAgent,
                userId: body.userId,
            },
            update: {
                lastActive: new Date(),
            },
        });
        return deviceUser;
    }
    createRefreshToken(data) {
        return this.prismaService.refreshToken.create({
            data,
        });
    }
    findUniqueRefreshTokenIncludeUserRole(token) {
        return this.prismaService.refreshToken
            .findUnique({
            where: {
                token,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phoneNumber: true,
                        avatar: true,
                        gender: true,
                        dateOfBirth: true,
                        roleId: true,
                        totpSecret: true,
                        createdById: true,
                        updatedById: true,
                        deletedAt: true,
                        deletedById: true,
                        createdAt: true,
                        updatedAt: true,
                        role: { select: { id: true } },
                    },
                },
            },
        })
            .then((result) => result?.user ?? null);
    }
    deleteRefreshToken(token) {
        return this.prismaService.refreshToken.delete({
            where: {
                token,
            },
        });
    }
    createVerificationCode(payload) {
        return this.prismaService.verificationCode.upsert({
            where: {
                email_type: {
                    email: payload.email,
                    type: payload.type,
                },
            },
            update: {
                code: payload.code,
                expiresAt: payload.expiresAt,
            },
            create: payload,
        });
    }
    findUniqueVerificationCode(uniqueValue) {
        return this.prismaService.verificationCode.findUnique({
            where: uniqueValue,
        });
    }
    deleteVerificationCode(uniqueValue) {
        return this.prismaService.verificationCode.delete({
            where: uniqueValue,
        });
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map