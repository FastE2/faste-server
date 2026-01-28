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
exports.TemplateRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TemplateRepository = class TemplateRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(pagination) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const [data, totalItem] = await Promise.all([
            this.prismaService.template.findMany({
                take,
                skip,
            }),
            this.prismaService.template.count({}),
        ]);
        return {
            data,
            totalItem,
            page: pagination.page,
            limmit: pagination.limit,
            totalPage: Math.ceil(totalItem / pagination.limit),
        };
    }
    async listByShop(pagination, sellerId) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const [data, totalItem] = await Promise.all([
            this.prismaService.template.findMany({
                where: {
                    sellerId,
                },
                take,
                skip,
            }),
            this.prismaService.template.count({
                where: {
                    sellerId,
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
    findByIdIsPublic(id) {
        return this.prismaService.template.findUnique({
            where: {
                id,
                isActive: true,
            },
        });
    }
    findAllByShop(id) {
        return this.prismaService.template.findFirst({
            where: {
                sellerId: id,
            },
        });
    }
    create({ sellerId, data, }) {
        return this.prismaService.template.create({
            data: {
                ...data,
                sellerId,
            },
        });
    }
    async update({ id, data, }) {
        return this.prismaService.template.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }
    delete({ id }) {
        return this.prismaService.template.delete({
            where: {
                id,
            },
        });
    }
};
exports.TemplateRepository = TemplateRepository;
exports.TemplateRepository = TemplateRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplateRepository);
//# sourceMappingURL=template.repository.js.map