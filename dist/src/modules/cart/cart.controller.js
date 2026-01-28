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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const nestjs_zod_1 = require("nestjs-zod");
const request_dto_1 = require("../../common/dtos/request.dto");
const response_dto_1 = require("../../common/dtos/response.dto");
const cart_dto_1 = require("./cart.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(userId, query) {
        return this.cartService.getCarts(userId, query);
    }
    addToCart(body, userId) {
        return this.cartService.create(userId, body);
    }
    updateCartItem(userId, param, body) {
        return this.cartService.update({
            id: param.id,
            userId,
            body,
        });
    }
    deleteCart(userId, param) {
        return this.cartService.delete({ id: param.id, userId });
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(cart_dto_1.CartItemResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.AddToCartBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, nestjs_zod_1.ZodSerializerDto)(cart_dto_1.CartItemResDTO),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, request_dto_1.GetParamsDTO,
        cart_dto_1.UpdateCartItemBodyDTO]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "deleteCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map