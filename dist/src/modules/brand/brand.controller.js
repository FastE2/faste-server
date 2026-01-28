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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const brand_service_1 = require("./brand.service");
const brand_dto_1 = require("./brand.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let BrandController = class BrandController {
    brandService;
    constructor(brandService) {
        this.brandService = brandService;
    }
    getAllBrands(query) {
        return this.brandService.getAllBrands(query);
    }
    createBrand(body, userId) {
        return this.brandService.createBrand({
            data: body,
            createdById: userId,
        });
    }
    getById(params) {
        return this.brandService.getBrandById(params.id);
    }
    updateBrand(body, params, userId) {
        return this.brandService.updateBrand({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteBrand(params, userId) {
        return this.brandService.deleteBrand({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(brand_dto_1.GetBrandResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "getAllBrands", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(brand_dto_1.CreateBrandResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_dto_1.CreateBrandBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "createBrand", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(brand_dto_1.GetBrandByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(brand_dto_1.UpdateBrandResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_dto_1.UpdateBrandBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], BrandController.prototype, "deleteBrand", null);
exports.BrandController = BrandController = __decorate([
    (0, common_1.Controller)('brand'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
//# sourceMappingURL=brand.controller.js.map