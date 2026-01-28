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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const order_service_1 = require("./order.service");
const order_dto_1 = require("./order.dto");
const active_role_permissions_decorator_1 = require("../../common/decorators/active-role-permissions.decorator");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrders(query, userId) {
        return this.orderService.getOrdersByUser({ userId, query });
    }
    getOrdersByShop(query, userId) {
        return this.orderService.getOrdersBySeller({ userId, query });
    }
    getByIdByShop(params, userId) {
        return this.orderService.getOrderDetailByShop({ userId, id: params.id });
    }
    createOrder(body, userId) {
        return this.orderService.createOrder({
            body,
            userId,
        });
    }
    cancelOrder(params, userId) {
        return this.orderService.cancelOrder({ userId, id: params.id });
    }
    getById(params, userId) {
        return this.orderService.getOrderDetailByUser({ userId, id: params.id });
    }
    getTXById(params, userId) {
        return this.orderService.getTransactionDetailByUser({
            userId,
            id: params.id,
        });
    }
    updateOrderStatus(body, params, userId, roleName) {
        return this.orderService.updateOrderStatus({
            orderId: params.id,
            roleName,
            userId,
            status: body.status,
        });
    }
    deleteUser(params, userId) {
        return this.orderService.deleteOrder({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.GetOrderListQueryDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('seller'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.GetOrderListQueryDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOrdersByShop", null);
__decorate([
    (0, common_1.Get)('shop/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getByIdByShop", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('cancel/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('tx/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getTXById", null);
__decorate([
    (0, common_1.Patch)('/status/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(3, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.UpdateOrderStatusBodyDTO,
        request_dto_1.GetParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteUser", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map