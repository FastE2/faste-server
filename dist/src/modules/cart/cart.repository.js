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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errors_1 = require("../../common/errors");
const cart_error_1 = require("./cart.error");
const product_constant_1 = require("../../common/constants/product.constant");
let CartRepository = class CartRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async list({ userId, languageId, page, limit, }) {
        const skip = (page - 1) * limit;
        const take = limit;
        const [cartItems, totalItem] = await Promise.all([
            this.prismaService.cartItem.findMany({
                where: {
                    userId,
                    sku: {
                        deletedAt: null,
                        product: {
                            deletedAt: null,
                            publishedAt: {
                                lte: new Date(),
                                not: null,
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    quantity: true,
                    skuId: true,
                    createdAt: true,
                    updatedAt: true,
                    sku: {
                        select: {
                            id: true,
                            price: true,
                            quantity: true,
                            attributes: true,
                            shopId: true,
                            image: true,
                            sold: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    basePrice: true,
                                    variants: true,
                                    images: true,
                                    slugId: true,
                                    productTranslations: {
                                        where: languageId
                                            ? { deletedAt: null }
                                            : { name: languageId, deletedAt: null },
                                        select: {
                                            id: true,
                                            name: true,
                                            description: true,
                                            languageId: true,
                                        },
                                    },
                                    shop: {
                                        select: {
                                            shopid: true,
                                            name: true,
                                            logo: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                take,
                skip,
            }),
            this.prismaService.cartItem.count({
                where: {
                    userId,
                },
            }),
        ]);
        const gropMapCartItem = new Map();
        for (const cartItem of cartItems) {
            const shopId = cartItem.sku.shopId;
            if (!gropMapCartItem.has(shopId)) {
                gropMapCartItem.set(shopId, []);
            }
            gropMapCartItem.get(shopId)?.push(cartItem);
        }
        const cartGroupedByShop = Array.from(gropMapCartItem, ([shopId, items]) => {
            const shop = items[0].sku.product.shop;
            const cartItemsWithoutCreatedBy = items.map((item) => {
                const { shop, ...productWithoutCreatedBy } = item.sku.product;
                return {
                    ...item,
                    sku: {
                        ...item.sku,
                        product: productWithoutCreatedBy,
                    },
                };
            });
            return {
                shop,
                cartItems: cartItemsWithoutCreatedBy,
            };
        });
        return {
            data: cartGroupedByShop,
            totalItem,
            page,
            limit,
            totalPage: Math.ceil(totalItem / limit),
        };
    }
    async create(userId, body) {
        await this.validateSKU({
            skuId: body.skuId,
            quantity: body.quantity,
            userId,
            isCreate: true,
        });
        return this.prismaService.cartItem.upsert({
            where: {
                userId_skuId: {
                    userId,
                    skuId: body.skuId,
                },
            },
            update: {
                quantity: {
                    increment: body.quantity,
                },
            },
            create: {
                userId,
                skuId: body.skuId,
                quantity: body.quantity,
            },
        });
    }
    async validateSKU({ skuId, quantity, userId, isCreate, }) {
        const [sku, cartIteam] = await Promise.all([
            this.prismaService.sKU.findUnique({
                where: {
                    id: skuId,
                },
                select: {
                    product: true,
                    quantity: true,
                },
            }),
            this.prismaService.cartItem.findUnique({
                where: {
                    userId_skuId: {
                        userId,
                        skuId,
                    },
                },
            }),
        ]);
        if (!sku) {
            throw errors_1.NotFoundRecordSKUException;
        }
        if (cartIteam && isCreate && quantity + cartIteam.quantity > sku.quantity) {
            throw cart_error_1.UnprocessableEntityQuantitySKUInValidException;
        }
        if (sku.quantity < 1 || quantity > sku.quantity) {
            throw cart_error_1.UnprocessableEntityQuantitySKUInValidException;
        }
        if (sku.product.status !== product_constant_1.PRODUCT_STATUS.PUBLISHED ||
            sku.product.deletedAt !== null ||
            sku.product.publishedAt === null ||
            (sku.product.publishedAt !== null && sku.product.publishedAt > new Date())) {
            throw errors_1.NotFoundRecordException;
        }
        return true;
    }
    async update({ id, userId, body, }) {
        await this.validateSKU({
            skuId: body.skuId,
            quantity: body.quantity,
            userId,
            isCreate: false,
        });
        return this.prismaService.cartItem.update({
            where: {
                id,
                userId,
            },
            data: {
                quantity: body.quantity,
                skuId: body.skuId,
            },
        });
    }
    delete({ id, userId }) {
        return this.prismaService.cartItem.delete({
            where: {
                id,
                userId,
            },
        });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartRepository);
//# sourceMappingURL=cart.repository.js.map