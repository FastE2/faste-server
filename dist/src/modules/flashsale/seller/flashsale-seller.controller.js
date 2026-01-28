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
exports.FlashsaleSellerController = void 0;
const common_1 = require("@nestjs/common");
const flashsale_seller_service_1 = require("./flashsale-seller.service");
const flashsale_dto_1 = require("../flashsale.dto");
const active_user_decorator_1 = require("../../../common/decorators/active-user.decorator");
const flash_sale_constant_1 = require("../../../common/constants/flash-sale.constant");
const request_dto_1 = require("../../../common/dtos/request.dto");
const nestjs_zod_1 = require("nestjs-zod");
const response_dto_1 = require("../../../common/dtos/response.dto");
let FlashsaleSellerController = class FlashsaleSellerController {
    flashSaleSellerService;
    constructor(flashSaleSellerService) {
        this.flashSaleSellerService = flashSaleSellerService;
    }
    create(body, userId) {
        return this.flashSaleSellerService.createFlashsale({
            createdById: userId,
            data: body,
        });
    }
    findAll(query, userId) {
        const { limit, page, status } = query;
        return this.flashSaleSellerService.getAllFlashSales({
            limit,
            page,
            status,
            createdById: userId,
            type: flash_sale_constant_1.FLASH_SALE_TYPE.SELLER,
        });
    }
    findOne(params, userId) {
        return this.flashSaleSellerService.getOneBySeller({
            id: params.id,
            createdById: userId,
        });
    }
    update(body, params, userId) {
        return this.flashSaleSellerService.updateFlashSale({
            id: params.id,
            updatedById: userId,
            data: body,
        });
    }
    updateStatus(body, params, userId) {
        return this.flashSaleSellerService.updateFlashSaleStatus({
            id: params.id,
            updatedById: userId,
            status: body.status,
        });
    }
    addItem(body, params, userId) {
        return this.flashSaleSellerService.addItem({
            id: params.id,
            createdById: userId,
            data: body,
        });
    }
    updateItem(params, body, userId) {
        const { id, itemId } = params;
        return this.flashSaleSellerService.updateItem({
            id,
            itemId,
            data: body,
            updatedById: userId,
        });
    }
    removeItem(params, userId) {
        const { id, itemId } = params;
        return this.flashSaleSellerService.deleteItem({
            id,
            itemId,
            deletedById: userId,
        });
    }
};
exports.FlashsaleSellerController = FlashsaleSellerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.CreateFlashSaleBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.FlashSaleListSellerQueryDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.UpdateFlashSaleStatusBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/items'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.CreateFlashSaleItemBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)(':id/items/:itemId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.GetParamsFlashSaleDTO,
        flashsale_dto_1.UpdateFlashSaleItemBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':id/items/:itemId'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.GetParamsFlashSaleDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleSellerController.prototype, "removeItem", null);
exports.FlashsaleSellerController = FlashsaleSellerController = __decorate([
    (0, common_1.Controller)('seller/flashsales'),
    __metadata("design:paramtypes", [flashsale_seller_service_1.FlashsaleSellerService])
], FlashsaleSellerController);
//# sourceMappingURL=flashsale-seller.controller.js.map