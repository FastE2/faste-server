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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const role_base_constant_1 = require("../../common/constants/role-base.constant");
const client_1 = require("@prisma/client");
const role_repository_1 = require("./role.repository");
const role_error_1 = require("./role.error");
let RoleService = class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getAllRoles(query) {
        try {
            return await this.roleRepository.list(query);
        }
        catch (error) {
            console.log('/role', error);
            throw error;
        }
    }
    async getRoleById(id) {
        try {
            const role = await this.roleRepository.findById(id);
            if (!role) {
                throw errors_1.NotFoundRecordException;
            }
            return role;
        }
        catch (error) {
            console.log('/role/:id', error);
            throw error;
        }
    }
    async getRoleByIdIncludePermissions(id) {
        try {
            const role = await this.roleRepository.findByIdIncludePermissions(id);
            if (!role) {
                throw errors_1.NotFoundRecordException;
            }
            return role;
        }
        catch (error) {
            console.log('/role/:id/permissions', error);
            throw error;
        }
    }
    async createRole({ data, createdById, }) {
        try {
            const role = await this.roleRepository.create({ createdById, data });
            return role;
        }
        catch (error) {
            console.log('/role', error);
            throw error;
        }
    }
    async updateRole({ id, data, updatedById, }) {
        try {
            await this.verifyRole(id);
            const updatedRole = await this.roleRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedRole;
        }
        catch (error) {
            console.log('/role/:id', error);
            throw error;
        }
    }
    async verifyRole(roleId) {
        const role = await this.roleRepository.findById(roleId);
        if (!role) {
            throw errors_1.NotFoundRecordException;
        }
        const baseRoles = [
            role_base_constant_1.ROLE_NAME.ADMIN,
            role_base_constant_1.ROLE_NAME.CLIENT,
            role_base_constant_1.ROLE_NAME.SELLER,
        ];
        if (baseRoles.includes(role.name)) {
            console.log(`Forbidden action on base role: ${role.name}`, role);
            throw role_error_1.ForbiddenActionOnBaseRoleException;
        }
    }
    async deleteRole({ id, deletedById }) {
        try {
            await this.verifyRole(id);
            await this.roleRepository.delete({ id, deletedById });
            return { message: 'Delete role successfully' };
        }
        catch (error) {
            console.log('/role/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleService);
//# sourceMappingURL=role.service.js.map