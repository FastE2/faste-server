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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const permission_service_1 = require("./permission.service");
const permission_dto_1 = require("./permission.dto");
let PermissionController = class PermissionController {
    permissionService;
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    getAllUser() {
        return this.permissionService.getAllPermissions();
    }
    createUser(body, userId) {
        return this.permissionService.createPermission({
            data: body,
            createdById: userId,
        });
    }
    getById(params) {
        return this.permissionService.getPermissionById(params.id);
    }
    updateUser(body, params, userId) {
        return this.permissionService.updatePermission({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteUser(params, userId) {
        return this.permissionService.deletePermission({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(permission_dto_1.GetPermissionsResDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(permission_dto_1.CreatePermissionResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.CreatePermissionBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(permission_dto_1.GetPermissionByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.GetPermissionParamsDTO]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(permission_dto_1.UpdatePermissionResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.UpdatePermissionBodyDTO,
        permission_dto_1.GetPermissionParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.GetPermissionParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "deleteUser", null);
exports.PermissionController = PermissionController = __decorate([
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map