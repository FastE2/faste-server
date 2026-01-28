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
exports.FlashsaleAdminController = void 0;
const common_1 = require("@nestjs/common");
const flashsale_admin_service_1 = require("./flashsale-admin.service");
const active_user_decorator_1 = require("../../../common/decorators/active-user.decorator");
const request_dto_1 = require("../../../common/dtos/request.dto");
const flashsale_dto_1 = require("../flashsale.dto");
const response_dto_1 = require("../../../common/dtos/response.dto");
const nestjs_zod_1 = require("nestjs-zod");
let FlashsaleAdminController = class FlashsaleAdminController {
    flashsaleAdminService;
    constructor(flashsaleAdminService) {
        this.flashsaleAdminService = flashsaleAdminService;
    }
    create(body, userId) {
        return this.flashsaleAdminService.createFlashsale({
            data: body,
            createdById: userId,
        });
    }
    findAll(query) {
        return this.flashsaleAdminService.getAllFlashSales(query);
    }
    findOne(params) {
        return this.flashsaleAdminService.getFlashSaleById(params.id);
    }
    update(body, params, userId) {
        return this.flashsaleAdminService.updateFlashSale({
            id: params.id,
            updatedById: userId,
            data: body,
        });
    }
    remove(params, userId) {
        return this.flashsaleAdminService.deleteFlashSale({
            deletedById: userId,
            id: params.id,
        });
    }
    updateStatus(body, params, userId) {
        return this.flashsaleAdminService.updateFlashSaleStatus({
            id: params.id,
            updatedById: userId,
            status: body.status,
        });
    }
};
exports.FlashsaleAdminController = FlashsaleAdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.FlashSaleListQueryDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flashsale_dto_1.UpdateFlashSaleStatusBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], FlashsaleAdminController.prototype, "updateStatus", null);
exports.FlashsaleAdminController = FlashsaleAdminController = __decorate([
    (0, common_1.Controller)('admin/flashsales'),
    __metadata("design:paramtypes", [flashsale_admin_service_1.FlashsaleAdminService])
], FlashsaleAdminController);
//# sourceMappingURL=flashsale-admin.controller.js.map