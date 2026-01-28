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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserRepository = class UserRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(pagination) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const [data, totalItem] = await Promise.all([
            this.prismaService.user.findMany({
                where: {
                    deletedAt: null,
                },
                omit: {
                    password: true,
                    totpSecret: true,
                },
                take,
                include: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                skip,
            }),
            this.prismaService.user.count({
                where: {
                    deletedAt: null,
                },
            }),
        ]);
        return {
            data,
            totalItem,
            page: pagination.page,
            limmit: pagination.limit,
            totalPage: Math.ceil(totalItem / pagination.limit),
        };
    }
    create({ createdById, data, }) {
        return this.prismaService.user.create({
            data: {
                ...data,
                createdById,
            },
            omit: {
                password: true,
                totpSecret: true,
            },
        });
    }
    delete({ id, deletedById, }, isHard) {
        return isHard
            ? this.prismaService.user.delete({
                where: {
                    id,
                },
            })
            : this.prismaService.user.update({
                where: {
                    id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: new Date(),
                    deletedById,
                },
            });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map