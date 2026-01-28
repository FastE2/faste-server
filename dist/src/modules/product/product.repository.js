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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const product_constant_1 = require("../../common/constants/product.constant");
const normalize_helper_1 = require("../../common/helpers/normalize.helper");
let ProductRepository = class ProductRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAllPublic(query) {
        const { limit, orderBy, page, sortBy, brandIds, categories, createdById, maxPrice, minPrice, name, } = query;
        console.log(query);
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {
            status: 'PUBLISHED',
            deletedAt: null,
            shopId: createdById ? createdById : undefined,
            publishedAt: {
                lte: new Date(),
                not: null,
            },
        };
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }
        if (brandIds && brandIds.length > 0) {
            where.brandId = {
                in: brandIds,
            };
        }
        if (categories && categories.length > 0) {
            where.categories = {
                some: {
                    category: {
                        id: {
                            in: categories,
                        },
                    },
                },
            };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.basePrice = {
                gte: minPrice,
                lte: maxPrice,
            };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.basePrice = {
                gte: minPrice,
                lte: maxPrice,
            };
        }
        const [data, totalItem] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                include: {
                    skus: {
                        select: {
                            price: true,
                        },
                    },
                    _count: {
                        select: { likes: true },
                    },
                },
                take,
                skip,
            }),
            this.prismaService.product.count({
                where: {
                    status: 'PUBLISHED',
                    deletedAt: null,
                    publishedAt: {
                        lte: new Date(),
                        not: null,
                    },
                },
            }),
        ]);
        return {
            data,
            totalItem,
            page,
            limit,
            totalPage: Math.ceil(totalItem / limit),
        };
    }
    async findAllPublicByShop(query, id) {
        const { limit, orderBy, page, sortBy, brandIds, categories, maxPrice, minPrice, name, } = query;
        console.log(query);
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {
            status: 'PUBLISHED',
            deletedAt: null,
            shopId: id,
            publishedAt: {
                lte: new Date(),
                not: null,
            },
        };
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }
        if (brandIds && brandIds.length > 0) {
            where.brandId = {
                in: brandIds,
            };
        }
        if (categories && categories.length > 0) {
            where.categories = {
                some: {
                    category: {
                        id: {
                            in: categories,
                        },
                    },
                },
            };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.basePrice = {
                gte: minPrice,
                lte: maxPrice,
            };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.basePrice = {
                gte: minPrice,
                lte: maxPrice,
            };
        }
        const [data, totalItem] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                include: {
                    skus: {
                        select: {
                            price: true,
                        },
                    },
                    _count: {
                        select: { likes: true },
                    },
                },
                take,
                skip,
            }),
            this.prismaService.product.count({
                where: {
                    status: 'PUBLISHED',
                    deletedAt: null,
                    publishedAt: {
                        lte: new Date(),
                        not: null,
                    },
                },
            }),
        ]);
        return {
            data,
            totalItem,
            page,
            limit,
            totalPage: Math.ceil(totalItem / limit),
        };
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
    async findAll({ pagination, where, }) {
        const skip = (pagination.page - 1) * pagination.limit;
        const take = pagination.limit;
        const [data, totalItem] = await Promise.all([
            this.prismaService.product.findMany({
                where,
                include: { brand: true, categories: true, skus: true, discounts: true },
                take,
                skip,
            }),
            this.prismaService.product.count({
                where,
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
    async findById(where) {
        return this.prismaService.product.findFirst({
            where,
            include: {
                productTranslations: {
                    where: {
                        deletedAt: null,
                    },
                },
                skus: {
                    where: { deletedAt: null },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                brand: {
                    include: {
                        translations: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        });
    }
    create({ createdById, data, }) {
        const { skus, categories, ...productData } = data;
        const now = productData.status === product_constant_1.PRODUCT_STATUS.PUBLISHED ? new Date() : null;
        return this.prismaService.product
            .create({
            data: {
                ...productData,
                publishedAt: now,
                shopId: createdById,
                categories: {
                    createMany: {
                        data: categories.map((id) => ({
                            categoryId: id,
                        })),
                    },
                },
                skus: {
                    createMany: {
                        data: skus.map((sku) => ({
                            ...sku,
                            shopId: createdById,
                        })),
                    },
                },
            },
            include: {
                productTranslations: {
                    where: {
                        deletedAt: null,
                    },
                },
                skus: {
                    where: { deletedAt: null },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                brand: {
                    include: {
                        translations: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        })
            .then((product) => {
            return {
                ...product,
                categories: product.categories.filter((category) => category.category.deletedAt === null),
            };
        });
    }
    async update({ id, updatedById, data, }) {
        const { skus, categories, ...productData } = data;
        const existingSkusInDB = await this.prismaService.sKU.findMany({
            where: {
                productId: id,
                deletedAt: null,
            },
        });
        const payloadSetSku = new Set(skus.map((sku) => (0, normalize_helper_1.normalize)(sku.attributes)));
        const DBSetSku = new Set(existingSkusInDB.map((sku) => (0, normalize_helper_1.normalize)(sku.attributes)));
        const skusToDeleteIds = existingSkusInDB
            .filter((skuInDB) => !payloadSetSku.has((0, normalize_helper_1.normalize)(skuInDB.attributes)))
            .map((skuDelete) => skuDelete.id);
        const skusToCreate = skus.filter((skuInPayload) => !DBSetSku.has((0, normalize_helper_1.normalize)(skuInPayload.attributes)));
        const skusToUpdate = existingSkusInDB.filter((skuInDB) => payloadSetSku.has((0, normalize_helper_1.normalize)(skuInDB.attributes)));
        const now = productData.status === product_constant_1.PRODUCT_STATUS.PUBLISHED ? new Date() : null;
        await this.prismaService.$transaction([
            this.prismaService.product.update({
                where: {
                    id,
                    deletedAt: null,
                },
                data: {
                    ...productData,
                    publishedAt: now,
                    updatedById,
                },
            }),
            this.prismaService.$executeRaw `
    DELETE FROM "ProductCategory"
    WHERE "productId" = ${id}
    AND "categoryId" NOT IN (SELECT unnest(${categories}::int[]));
  `,
            this.prismaService.$executeRaw `
    INSERT INTO "ProductCategory" ("productId", "categoryId")
    SELECT ${id}, unnest(${categories}::int[])
    ON CONFLICT DO NOTHING;
  `,
            this.prismaService.sKU.updateMany({
                where: {
                    id: {
                        in: skusToDeleteIds,
                    },
                },
                data: {
                    deletedAt: new Date(),
                    deletedById: updatedById,
                },
            }),
            this.prismaService.sKU.updateMany({
                data: skusToUpdate.map((sku) => ({
                    ...sku,
                    updatedById,
                })),
            }),
            this.prismaService.sKU.createMany({
                data: skusToCreate.map((sku) => ({
                    ...sku,
                    productId: id,
                    shopId: updatedById,
                })),
            }),
        ]);
        const productUpdate = this.prismaService.product.findFirst({
            where: {
                id,
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
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                brand: {
                    include: {
                        translations: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        });
        return productUpdate;
    }
    async delete({ id, deletedById, }, isHard) {
        if (isHard) {
            return this.prismaService.product.delete({
                where: {
                    id,
                },
            });
        }
        const now = new Date();
        const [product] = await Promise.all([
            this.prismaService.product.update({
                where: {
                    id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: now,
                    deletedById,
                },
            }),
            this.prismaService.productTranslation.updateMany({
                where: {
                    productId: id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: now,
                    deletedById,
                },
            }),
            this.prismaService.sKU.updateMany({
                where: {
                    productId: id,
                    deletedAt: null,
                },
                data: {
                    deletedAt: now,
                    deletedById,
                },
            }),
        ]);
        return product;
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map