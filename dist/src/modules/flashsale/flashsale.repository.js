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
exports.FlashSaleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FlashSaleRepository = class FlashSaleRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(query) {
        const skip = (query.page - 1) * query.limit;
        const take = query.limit;
        const where = { deletedAt: null };
        if (query.type)
            where.type = query.type;
        if (query.status)
            where.status = query.status;
        if (query.createdById)
            where.createdById = query.createdById;
        const [data, totalItem] = await Promise.all([
            this.prismaService.flashSale.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: 'desc' },
            }),
            this.prismaService.flashSale.count({
                where,
            }),
        ]);
        return {
            data,
            totalItem,
            page: query.page,
            limmit: query.limit,
            totalPage: Math.ceil(totalItem / query.limit),
        };
    }
    findById(id) {
        return this.prismaService.flashSale.findUnique({
            where: {
                id,
                deletedAt: null,
            },
        });
    }
    findBySellerById({ id, createdById, }) {
        return this.prismaService.flashSale.findUnique({
            where: {
                id,
                deletedAt: null,
                createdById,
            },
        });
    }
    create({ createdById, data, }) {
        return this.prismaService.flashSale.create({
            data: {
                ...data,
                createdById,
            },
        });
    }
    async update({ id, updatedById, data, }) {
        return this.prismaService.flashSale.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                ...data,
                updatedById,
            },
        });
    }
    delete({ id, deletedById, }, isHard) {
        return isHard
            ? this.prismaService.flashSale.delete({
                where: {
                    id,
                },
            })
            : this.prismaService.flashSale.update({
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
exports.FlashSaleRepository = FlashSaleRepository;
exports.FlashSaleRepository = FlashSaleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlashSaleRepository);
//# sourceMappingURL=flashsale.repository.js.map