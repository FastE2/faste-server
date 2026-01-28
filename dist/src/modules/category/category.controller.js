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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const request_dto_1 = require("../../common/dtos/request.dto");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getAllCategorys(query) {
        return this.categoryService.getAllCategorys(query);
    }
    createUser(body, userId) {
        return this.categoryService.createCategory({
            data: body,
            createdById: userId,
        });
    }
    getById(params) {
        return this.categoryService.getCategoryById(params.id);
    }
    updateUser(body, params, userId) {
        return this.categoryService.updateRole({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteUser(params, userId) {
        return this.categoryService.deleteCategory({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(category_dto_1.GetCategoryResDTO),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.PaginationQueryDTO]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getAllCategorys", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(category_dto_1.CreateCategoryResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(category_dto_1.GetCategoryByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(category_dto_1.UpdateCategoryResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.UpdateCategoryBodyDTO,
        request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.GetParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "deleteUser", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map