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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const nestjs_zod_1 = require("nestjs-zod");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const active_role_permissions_decorator_1 = require("../../common/decorators/active-role-permissions.decorator");
const response_dto_1 = require("../../common/dtos/response.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getAllUser(query) {
        return this.userService.getAllUsers(query);
    }
    getById(params) {
        return this.userService.getUserById(params.id);
    }
    createUser(body, userId, roleName) {
        return this.userService.createUser({
            data: body,
            updatedById: userId,
            updatedByRoleName: roleName,
        });
    }
    updateUser(body, params, userId, roleName) {
        return this.userService.updateUser({
            id: params.id,
            data: body,
            updatedById: userId,
            updatedByRoleName: roleName,
        });
    }
    deleteUser(params, userId, roleName) {
        return this.userService.deleteUser({
            id: params.id,
            deletedById: userId,
            deletedByRoleName: roleName,
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, nestjs_zod_1.ZodSerializerDto)(user_dto_1.GetUsersResDTO),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUsersQueryDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(user_dto_1.GetUserByIdResDTO),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUserParamsDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, nestjs_zod_1.ZodSerializerDto)(user_dto_1.CreateUserResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserBodyDTO, Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(user_dto_1.UpdateUserResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(3, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserBodyDTO,
        user_dto_1.GetUserParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __param(2, (0, active_role_permissions_decorator_1.ActiveRolePermissions)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUserParamsDTO, Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map