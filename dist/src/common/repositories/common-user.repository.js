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
exports.CommonUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommonUserRepository = class CommonUserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    findUniqueUser(where) {
        return this.prismaService.user.findFirst({
            where: {
                ...where,
                deletedAt: null,
            },
        });
    }
    findUniqueUserProfile(where) {
        return this.prismaService.user.findFirst({
            where: {
                ...where,
                deletedAt: null,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phoneNumber: true,
                role: {
                    select: {
                        name: true,
                    },
                },
                gender: true,
                addresses: true,
                avatar: true,
                createdAt: true,
                dateOfBirth: true,
                followers: true,
                following: true,
                totpSecret: true,
            },
        });
    }
    findUniqueUserIncludeRole(where) {
        return this.prismaService.user.findFirst({
            where: {
                ...where,
                deletedAt: null,
            },
            omit: {
                password: true,
                totpSecret: true,
            },
            include: {
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }
    update(where, data) {
        const { id, ...dataToUpdate } = data;
        return this.prismaService.user.update({
            where: {
                ...where,
                deletedAt: null,
            },
            data: {
                ...dataToUpdate,
                gender: dataToUpdate.gender
                    ? dataToUpdate.gender
                    : null,
            },
        });
    }
};
exports.CommonUserRepository = CommonUserRepository;
exports.CommonUserRepository = CommonUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonUserRepository);
//# sourceMappingURL=common-user.repository.js.map