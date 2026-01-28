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
exports.CommonPaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const payment_constant_1 = require("../constants/payment.constant");
let CommonPaymentRepository = class CommonPaymentRepository {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async cancelPaymentAndOrder(transactionId) {
        const transaction = await this.prismaService.transaction.findUnique({
            where: {
                id: transactionId,
            },
            include: {
                payments: {
                    include: {
                        order: {
                            include: {
                                items: true,
                            },
                        },
                    },
                },
            },
        });
        if (!transaction) {
            throw Error('Transaction not found');
        }
        const orders = transaction.payments.map((item) => item.order);
        const payMentIds = transaction.payments.map((item) => item.id);
        const productSKUSnapshots = orders.map((order) => order?.items).flat();
        await this.prismaService.$transaction(async (tx) => {
            const updateOrder$ = tx.order.updateMany({
                where: {
                    id: {
                        in: orders.map((order) => Number(order.id)),
                    },
                    status: client_1.OrderStatus.PENDING_PAYMENT,
                    deletedAt: null,
                },
                data: {
                    status: client_1.OrderStatus.CANCELLED,
                },
            });
            const updateSkus$ = Promise.all(productSKUSnapshots
                .filter((item) => item.skuId)
                .map((item) => tx.sKU.update({
                where: {
                    id: item.skuId,
                },
                data: {
                    quantity: {
                        increment: item.quantity,
                    },
                },
            })));
            await tx.payment.updateMany({
                where: {
                    id: {
                        in: payMentIds,
                    },
                },
                data: {
                    status: payment_constant_1.PAYMENT_STATUS.FAILED,
                },
            });
            const updateTransaction$ = tx.transaction.update({
                where: {
                    id: transactionId,
                },
                data: {
                    status: payment_constant_1.PAYMENT_STATUS.FAILED,
                },
            });
            return await Promise.all([updateOrder$, updateSkus$, updateTransaction$]);
        });
    }
};
exports.CommonPaymentRepository = CommonPaymentRepository;
exports.CommonPaymentRepository = CommonPaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommonPaymentRepository);
//# sourceMappingURL=common-payment.repository.js.map