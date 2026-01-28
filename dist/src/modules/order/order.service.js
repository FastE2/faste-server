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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const order_repository_1 = require("./order.repository");
const role_base_constant_1 = require("../../common/constants/role-base.constant");
const order_constant_1 = require("../../common/constants/order.constant");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
const prisma_1 = require("../../common/errors/prisma");
const transaction_repository_1 = require("./transaction.repository");
let OrderService = class OrderService {
    orderRepository;
    transactionRepository;
    commonUserRepository;
    constructor(orderRepository, transactionRepository, commonUserRepository) {
        this.orderRepository = orderRepository;
        this.transactionRepository = transactionRepository;
        this.commonUserRepository = commonUserRepository;
    }
    async getOrdersByUser({ userId, query, }) {
        try {
            return await this.orderRepository.list({ _where: { userId }, query });
        }
        catch (error) {
            console.log('/order', error);
            throw error;
        }
    }
    async getOrdersBySeller({ userId, query, }) {
        try {
            return await this.orderRepository.list({
                _where: { shopId: userId },
                query,
            });
        }
        catch (error) {
            console.log('/order/seller', error);
            throw error;
        }
    }
    async cancelOrder({ userId, id }) {
        try {
            await this.orderRepository.cancel(userId, id);
            return {
                message: 'Cancel order successfully',
            };
        }
        catch (error) {
            console.log('/order/cancel/:id', error);
            throw error;
        }
    }
    async getOrderDetailByUser({ userId, id }) {
        try {
            const order = await this.orderRepository.findUniqueClientById({
                orderId: id,
                userId,
            });
            if (!order) {
                throw errors_1.NotFoundRecordException;
            }
            return order;
        }
        catch (error) {
            console.log('/order/:id', error);
            throw error;
        }
    }
    async getOrderDetailByShop({ userId, id }) {
        try {
            const order = await this.orderRepository.findUniqueShopById({
                orderId: id,
                userId,
            });
            if (!order) {
                throw errors_1.NotFoundRecordException;
            }
            return order;
        }
        catch (error) {
            console.log('/order/shop/:id', error);
            throw error;
        }
    }
    async getTransactionDetailByUser({ userId, id, }) {
        try {
            const transaction = await this.transactionRepository.findUniqueClientById({
                transactionId: id,
                userId,
            });
            if (!transaction) {
                throw errors_1.NotFoundRecordException;
            }
            return transaction;
        }
        catch (error) {
            console.log('/tx/:id', error);
            throw error;
        }
    }
    async createOrder({ body, userId, }) {
        try {
            const order = await this.orderRepository.create({ userId, body });
            return order;
        }
        catch (error) {
            console.log('/order', error);
            throw error;
        }
    }
    async updateOrderStatus({ orderId, status, userId, roleName, }) {
        const allowedStatuses = order_constant_1.ALLOWED_STATUS_BY_ROLE[roleName];
        if (!allowedStatuses.includes(status)) {
            throw new common_1.ForbiddenException(`Role ${roleName} cannot set status ${status}`);
        }
        const filter = { id: orderId };
        if (roleName === role_base_constant_1.ROLE_NAME.CLIENT)
            filter.userId = userId;
        if (roleName === role_base_constant_1.ROLE_NAME.SELLER)
            filter.shopId = userId;
        const order = await this.orderRepository.findUniqueOrder(filter);
        if (!order) {
            throw errors_1.NotFoundRecordException;
        }
        const currentStatus = order.status;
        const nextStatus = status;
        const allowedNextStatuses = order_constant_1.ALLOWED_STATUS_TRANSITIONS[currentStatus];
        if (!allowedNextStatuses || !allowedNextStatuses.includes(nextStatus)) {
            console.log('allowedNextStatuses', allowedNextStatuses);
            console.log('allowedNextStatuses', !allowedNextStatuses.includes(nextStatus), nextStatus);
            throw new common_1.BadRequestException(`Invalid status transition from ${currentStatus} to ${nextStatus}.`);
        }
        return this.orderRepository.update({
            id: orderId,
            body: { status },
            updatedById: userId,
        });
    }
    async deleteOrder({ id, deletedById }) {
        try {
            const user = await this.commonUserRepository.findUniqueUserIncludeRole({
                id,
            });
            if (!user) {
                throw errors_1.NotFoundUserException;
            }
            if (user.role.name !== role_base_constant_1.ROLE_NAME.ADMIN) {
                throw new common_1.ForbiddenException();
            }
            await this.orderRepository.delete({ id, deletedById });
            return { message: 'Delete order successfully' };
        }
        catch (error) {
            console.log('/order/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        transaction_repository_1.TransactionRepository,
        common_user_repository_1.CommonUserRepository])
], OrderService);
//# sourceMappingURL=order.service.js.map