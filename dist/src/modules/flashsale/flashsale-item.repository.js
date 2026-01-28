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
exports.FlashSaleItemRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FlashSaleItemRepository = class FlashSaleItemRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list(query, flashSaleId) {
        const skip = (query.page - 1) * query.limit;
        const take = query.limit;
        const where = { deletedAt: null };
        where.flashSaleId = flashSaleId;
        const [items, totalItem] = await Promise.all([
            this.prismaService.flashSaleItem.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    sku: {
                        include: {
                            product: true,
                        },
                    },
                },
            }),
            this.prismaService.flashSaleItem.count({
                where,
            }),
        ]);
        const productMap = new Map();
        for (const item of items) {
            const product = item.sku.product;
            if (!productMap.has(product.id)) {
                productMap.set(product.id, {
                    ...product,
                    skus: [],
                });
            }
            productMap.get(product.id).skus.push({
                id: item.sku.id,
                price: item.sku.price,
                quantity: item.sku.quantity,
                image: item.sku.image,
                flashSaleItem: {
                    id: item.id,
                    flashSaleId: item.flashSaleId,
                    flashPrice: item.flashPrice,
                    stock: item.flashPrice,
                    sold: item.sold,
                },
            });
        }
        return {
            data: Array.from(productMap.values()),
            totalItem,
            page: query.page,
            limmit: query.limit,
            totalPage: Math.ceil(totalItem / query.limit),
        };
    }
    findBySellerById({ id, createdById, }) {
        return this.prismaService.flashSaleItem.findUnique({
            where: {
                id,
                deletedAt: null,
                createdById,
            },
        });
    }
    createMany({ id, data, createdById, }) {
        return this.prismaService.flashSaleItem.createMany({
            data: data.map((item) => ({
                flashSaleId: id,
                skuId: item.skuId,
                flashPrice: item.flashPrice,
                stock: item.stock,
                createdById,
            })),
        });
    }
    async update({ id, updatedById, data, }) {
        return this.prismaService.flashSaleItem.update({
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
            ? this.prismaService.flashSaleItem.delete({
                where: {
                    id,
                },
            })
            : this.prismaService.flashSaleItem.update({
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
exports.FlashSaleItemRepository = FlashSaleItemRepository;
exports.FlashSaleItemRepository = FlashSaleItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlashSaleItemRepository);
//# sourceMappingURL=flashsale-item.repository.js.map