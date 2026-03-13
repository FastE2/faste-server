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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
const role_service_1 = require("./role.service");
const role_dto_1 = require("./role.dto");
let RoleController = class RoleController {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    getAllUser(query) {
        return this.roleService.getAllRoles(query);
    }
    createUser(body, userId) {
        return this.roleService.createRole({
            data: body,
            createdById: userId,
        });
    }
    getById(params) {
        return this.roleService.getRoleById(params.id);
    }
    getByIdIncludePermission(params) {
        return this.roleService.getRoleByIdIncludePermissions(params.id);
    }
    updateUser(body, params, userId) {
        return this.roleService.updateRole({
            id: params.id,
            data: body,
            updatedById: userId,
        });
    }
    deleteUser(params, userId) {
        return this.roleService.deleteRole({
            id: params.id,
            deletedById: userId,
        });
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(role_dto_1.GetRolesResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.GetRolesQueryDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(role_dto_1.CreateRoleResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.CreateRoleBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(role_dto_1.GetRoleByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.GetRoleParamsDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/:id/permissions'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.GetRoleParamsDTO]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getByIdIncludePermission", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(role_dto_1.UpdateRoleResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.UpdateRoleBodyDTO,
        role_dto_1.GetRoleParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.GetRoleParamsDTO, Number]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteUser", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map