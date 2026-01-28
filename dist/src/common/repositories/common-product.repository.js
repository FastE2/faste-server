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
exports.CommonProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CommonProductRepository = class CommonProductRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findOneUniquePublic(uniqueValue) {
        return this.prismaService.product.findFirst({
            where: {
                ...uniqueValue,
                status: 'PUBLISHED',
                deletedAt: null,
            },
            include: {
                productTranslations: {
                    where: {
                        deletedAt: null,
                    },
                },
                skus: {
                    where: { deletedAt: null },
                    omit: {
                        deletedAt: true,
                        deletedById: true,
                        skuCode: true,
                        updatedAt: true,
                        updatedById: true,
                    },
                },
                shop: {
                    select: {
                        shopid: true,
                        name: true,
                        logo: true,
                        slug: true,
                        createdAt: true,
                        description: true,
                        addressShip: true,
                    },
                },
                categories: {
                    include: {
                        category: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
                brand: {
                    omit: {
                        deletedAt: true,
                        deletedById: true,
                        id: true,
                        createdById: true,
                    },
                    include: {
                        translations: {
                            where: {
                                deletedAt: null,
                            },
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async updateRating({ id, data, }) {
        return this.prismaService.product.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                ...data,
            },
        });
    }
};
exports.CommonProductRepository = CommonProductRepository;
exports.CommonProductRepository = CommonProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonProductRepository);
//# sourceMappingURL=common-product.repository.js.map