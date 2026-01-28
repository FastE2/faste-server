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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const shop_dto_1 = require("./shop.dto");
const shop_service_1 = require("./shop.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let ShopController = class ShopController {
    shopService;
    constructor(shopService) {
        this.shopService = shopService;
    }
    getAllShopsIsPublic(query) {
        return this.shopService.getAllShopsIsPublic(query);
    }
    getBySlug(params) {
        return this.shopService.getShopBySlug(params.slug);
    }
    getAllShops(query) {
        return this.shopService.getAllShops(query);
    }
    registerShop(body, userId) {
        return this.shopService.registerShop(userId, body);
    }
    getById(params) {
        return this.shopService.getShopById(params.id);
    }
    getShopMe(userId) {
        console.log(userId);
        return this.shopService.getShopById(userId);
    }
    updateShop(body, params, userId) {
        return this.shopService.updateShop({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteShop(params, userId) {
        return this.shopService.deleteShop({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, common_1.Get)('/public'),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(shop_dto_1.GetShopResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getAllShopsIsPublic", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(shop_dto_1.GetShopByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_dto_1.GetParamSlugDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getBySlug", null);
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(shop_dto_1.GetShopResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getAllShops", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_dto_1.RegisterShopBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "registerShop", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(shop_dto_1.GetShopByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/me/detail'),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getShopMe", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(shop_dto_1.UpdateShopResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shop_dto_1.UpdateShopBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "updateShop", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "deleteShop", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
//# sourceMappingURL=shop.controller.js.map