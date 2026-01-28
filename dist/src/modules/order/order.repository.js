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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const errors_1 = require("../../common/errors");
const order_error_1 = require("./order.error");
const payment_constant_1 = require("../../common/constants/payment.constant");
const order_constant_1 = require("../../common/constants/order.constant");
const order_producer_1 = require("./order.producer");
let OrderRepository = class OrderRepository {
    prismaService;
    orderProducer;
    constructor(prismaService, orderProducer) {
        this.prismaService = prismaService;
        this.orderProducer = orderProducer;
    }
    async list({ _where, query, }) {
        const { page, limit, status } = query;
        const skip = (page - 1) * limit;
        const take = limit;
        const where = {
            ..._where,
            status,
        };
        const [totalItems, data] = await Promise.all([
            this.prismaService.order.count({
                where,
            }),
            this.prismaService.order.findMany({
                where,
                include: {
                    items: true,
                    Payment: true,
                    Shop: {
                        select: {
                            name: true,
                            slug: true,
                        },
                    },
                },
                skip,
                take,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
        ]);
        return {
            data,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        };
    }
    async findUniqueOrder(where) {
        const order = await this.prismaService.order.findUnique({
            where: {
                ...where,
                deletedAt: null,
            },
            include: {
                items: true,
            },
        });
        if (!order) {
            throw errors_1.NotFoundRecordException;
        }
        return order;
    }
    async findUniqueClientById({ userId, orderId, }) {
        const order = await this.prismaService.order.findUnique({
            where: {
                id: orderId,
                userId,
                deletedAt: null,
            },
            include: {
                items: true,
                voucher: true,
                Payment: {
                    select: {
                        amount: true,
                    },
                },
            },
        });
        if (!order) {
            throw errors_1.NotFoundRecordException;
        }
        return order;
    }
    async findUniqueShopById({ userId, orderId, }) {
        const order = await this.prismaService.order.findUnique({
            where: {
                id: orderId,
                shopId: userId,
                deletedAt: null,
            },
            include: {
                items: true,
                Payment: true,
            },
        });
        if (!order) {
            throw errors_1.NotFoundRecordException;
        }
        return order;
    }
    async create({ userId, body, }) {
        const arrayCartItems = body.map((cartItem) => cartItem.cartItemIds).flat();
        const cartItems = await this.prismaService.cartItem.findMany({
            where: {
                id: {
                    in: arrayCartItems,
                },
                userId,
            },
            include: {
                sku: {
                    include: {
                        product: {
                            include: {
                                productTranslations: true,
                            },
                        },
                    },
                },
            },
        });
        if (cartItems.length !== arrayCartItems.length) {
            throw order_error_1.NotFoundCartItemException;
        }
        const isOutOfStock = cartItems.some((item) => {
            return item.sku.quantity <= item.quantity;
        });
        if (isOutOfStock) {
            throw (0, order_error_1.OutOfStockSKUException)('sku');
        }
        const isExistProduct = cartItems.some((item) => {
            return (item.sku.product.deletedAt !== null ||
                item.sku.deletedAt !== null ||
                item.sku.product.publishedAt == null ||
                item.sku.product.publishedAt > new Date());
        });
        if (isExistProduct) {
            throw errors_1.NotFoundRecordException;
        }
        const mapCartItem = new Map();
        cartItems.forEach((item) => {
            mapCartItem.set(item.id, item);
        });
        const isValidBodyData = body.every((item) => {
            const bodyCartItemIds = item.cartItemIds;
            return bodyCartItemIds.every((cartItemId) => {
                const cartItem = mapCartItem.get(cartItemId);
                return item.shopId === cartItem?.sku.product.shopId;
            });
        });
        if (!isValidBodyData) {
            throw order_error_1.ProductNotBelongToShopException;
        }
        const total = cartItems.reduce((acc, item) => {
            return acc + item.sku.price * item.quantity;
        }, 0);
        const [transaction, orders] = await this.prismaService.$transaction(async (tx) => {
            const orders = await Promise.all(body.map((item) => tx.order.create({
                data: {
                    userId,
                    status: item.paymentMethod === 'COD'
                        ? order_constant_1.ORDER_STATUS.PENDING_CONFIRMATION
                        : order_constant_1.ORDER_STATUS.PENDING_PAYMENT,
                    paymentMethod: item.paymentMethod,
                    addressShipId: item.addressShipId,
                    deliveryId: item.deliveryId,
                    shopId: item.shopId,
                    createdById: userId,
                    items: {
                        create: item.cartItemIds.map((cartItemId) => {
                            const cartItem = mapCartItem.get(cartItemId);
                            return {
                                productName: cartItem.sku.product.name,
                                skuPrice: cartItem.sku.price,
                                skuAttributes: cartItem.sku.attributes ?? {},
                                image: cartItem?.sku.image ?? '',
                                quantity: cartItem.quantity,
                                productId: cartItem.sku.productId,
                                skuId: cartItem.skuId,
                                productTranslations: cartItem?.sku.product.productTranslations.map((translation) => {
                                    return {
                                        id: translation.id,
                                        name: translation.name,
                                        description: translation.description,
                                        languageId: translation.languageId,
                                    };
                                }) ?? [],
                            };
                        }),
                    },
                },
            })));
            const transaction = await tx.transaction.create({
                data: {
                    status: payment_constant_1.PAYMENT_STATUS.PENDING,
                    method: body[0].paymentMethod,
                    total,
                    userId,
                },
            });
            const payments = await Promise.all(orders.map((order) => {
                const orderCartItems = cartItems.filter((i) => i.sku.product.shopId === order.shopId);
                const amount = orderCartItems.reduce((sum, i) => sum + i.sku.price * i.quantity, 0);
                return tx.payment.create({
                    data: {
                        transactionId: transaction.id,
                        amount,
                        status: payment_constant_1.PAYMENT_STATUS.PENDING,
                        userId,
                        orderId: order.id,
                    },
                });
            }));
            const cartItem$ = tx.cartItem.deleteMany({
                where: {
                    id: {
                        in: arrayCartItems,
                    },
                },
            });
            const sku$ = Promise.all(cartItems.map((item) => tx.sKU.update({
                where: {
                    id: item.sku.id,
                },
                data: {
                    quantity: {
                        decrement: item.quantity,
                    },
                },
            })));
            const updatePaymentOrder$ = await Promise.all(payments.map((payment) => tx.order.update({
                where: { id: payment.orderId },
                data: { paymentId: payment.id },
            })));
            let scheduleCancelPaymentJob$ = null;
            if (body[0].paymentMethod !== 'COD') {
                scheduleCancelPaymentJob$ = this.orderProducer.scheduleCancelJob(transaction.id);
            }
            const [_] = await Promise.all([
                cartItem$,
                sku$,
                updatePaymentOrder$,
                scheduleCancelPaymentJob$,
            ]);
            return [transaction, orders];
        });
        return { transaction, orders };
    }
    async cancel(userId, orderId) {
        try {
            const order = await this.prismaService.order.findUniqueOrThrow({
                where: {
                    id: orderId,
                    userId,
                    deletedAt: null,
                },
            });
            if (order.status !== order_constant_1.ORDER_STATUS.PENDING_PAYMENT) {
                throw order_error_1.CannotCancelOrderException;
            }
            const updatedOrder = await this.prismaService.order.update({
                where: {
                    id: orderId,
                    userId,
                    deletedAt: null,
                },
                data: {
                    status: order_constant_1.ORDER_STATUS.CANCELLED,
                    updatedById: userId,
                },
            });
            return updatedOrder;
        }
        catch (error) {
            console.log('order/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    async update({ id, updatedById, body, }) {
        return this.prismaService.order.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                ...body,
                updatedById,
            },
        });
    }
    delete({ id, deletedById, }, isHard) {
        return isHard
            ? this.prismaService.order.delete({
                where: {
                    id,
                },
            })
            : this.prismaService.order.update({
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
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        order_producer_1.OrderProducer])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map