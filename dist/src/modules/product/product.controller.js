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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./product.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const active_role_permissions_decorator_1 = require("../../common/decorators/active-role-permissions.decorator");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    getPublicProducts(query) {
        return this.productService.findAllPublic(query);
    }
    getPublicProductsByShop(query, params) {
        return this.productService.findAllPublicByShop(query, params.id);
    }
    getById(params) {
        return this.productService.findByIdPublic(params.id);
    }
    getBySlugId(params) {
        return this.productService.findBySlugIdPublic(params.slugId);
    }
    getProducts(query, userId, roleName) {
        return this.productService.findAll({ query, userId, roleName });
    }
    createProduct(body, userId, roleName) {
        return this.productService.create({
            data: body,
            createdById: userId,
            roleName,
        });
    }
    updateUser(body, params, userId, roleName) {
        return this.productService.update({
            id: params.id,
            data: body,
            updatedById: userId,
            roleName,
        });
    }
    deleteUser(params, userId, roleName) {
        return this.productService.delete({
            id: params.id,
            deletedById: userId,
            roleName,
        });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('/public'),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(product_dto_1.GetAllProductPublicResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductsQueryDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getPublicProducts", null);
__decorate([
    (0, common_1.Get)('/public/shop/:id'),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(product_dto_1.GetAllProductPublicResDTO),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductsQueryDTO,
        request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getPublicProductsByShop", null);
__decorate([
    (0, common_1.Get)('/public/:id'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/public/slug/:slugId'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetParamSlugIdDTO]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBySlugId", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.GetProductsQueryDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductBodyDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(3, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductBodyDTO,
        request_dto_1.GetParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteUser", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map