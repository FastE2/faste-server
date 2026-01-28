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
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const payment_constant_1 = require("../../common/constants/payment.constant");
const prisma_service_1 = require("../../prisma/prisma.service");
const order_constant_1 = require("../../common/constants/order.constant");
const product_constant_1 = require("../../common/constants/product.constant");
const payment_producer_1 = require("./payment.producer");
let PaymentRepository = class PaymentRepository {
    prismaService;
    paymentProducer;
    constructor(prismaService, paymentProducer) {
        this.prismaService = prismaService;
        this.paymentProducer = paymentProducer;
    }
    getTotalPrice(orders) {
        return orders.reduce((total, order) => {
            const orderTotal = order.items.reduce((totalPrice, productSku) => {
                return totalPrice + productSku.skuPrice * productSku.quantity;
            }, 0);
            return total + orderTotal;
        }, 0);
    }
    async receiver(body) {
        let amountIn = 0;
        let amountOut = 0;
        if (body.transferType === 'in') {
            amountIn = body.transferAmount;
        }
        else if (body.transferType === 'out') {
            amountOut = body.transferAmount;
        }
        const paymentTransaction = await this.prismaService.paymentTransaction.findUnique({
            where: {
                id: body.id,
            },
        });
        if (paymentTransaction) {
            throw new common_1.BadRequestException('Transaction already exists');
        }
        const userId = await this.prismaService.$transaction(async (tx) => {
            await tx.paymentTransaction.create({
                data: {
                    id: body.id,
                    gateway: body.gateway,
                    transactionDate: (0, date_fns_1.parse)(body.transactionDate, 'yyyy-MM-dd HH:mm:ss', new Date()),
                    accountNumber: body.accountNumber,
                    subAccount: body.subAccount,
                    amountIn,
                    amountOut,
                    accumulated: body.accumulated,
                    code: body.code,
                    transactionContent: body.content,
                    referenceNumber: body.referenceCode,
                    body: body.description,
                },
            });
            const transactionId = body.code
                ? Number(body.code.split(product_constant_1.PREFIX_PAYMENT_CODE)[1])
                : Number(body.content?.split(product_constant_1.PREFIX_PAYMENT_CODE)[1]);
            if (isNaN(transactionId)) {
                throw new common_1.BadRequestException('Cannot get payment id from content');
            }
            const transaction = await tx.transaction.findUnique({
                where: {
                    id: transactionId,
                },
                include: {
                    payments: {
                        include: {
                            order: true,
                        },
                    },
                },
            });
            if (!transaction) {
                throw new common_1.BadRequestException(`Cannot find transaction with id ${transaction}`);
            }
            const payMentIds = transaction.payments.map((item) => item.id);
            const userId = transaction.userId;
            const orders = transaction.payments.map((item) => ({ ...item.order }));
            const totalPrice = this.getTotalPrice(orders);
            if (totalPrice !== body.transferAmount) {
                throw new common_1.BadRequestException(`Price not match, expected ${totalPrice} but got ${body.transferAmount}`);
            }
            await Promise.all([
                tx.transaction.update({
                    where: {
                        id: transactionId,
                    },
                    data: {
                        status: payment_constant_1.PAYMENT_STATUS.SUCCESS,
                    },
                }),
                tx.payment.updateMany({
                    where: {
                        id: {
                            in: payMentIds,
                        },
                    },
                    data: {
                        status: payment_constant_1.PAYMENT_STATUS.SUCCESS,
                    },
                }),
                tx.order.updateMany({
                    where: {
                        id: {
                            in: orders.map((order) => order.id),
                        },
                    },
                    data: {
                        status: order_constant_1.ORDER_STATUS.PENDING_PICKUP,
                    },
                }),
                this.paymentProducer.removeJob(transactionId),
            ]);
            return userId;
        });
        return userId;
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payment_producer_1.PaymentProducer])
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map