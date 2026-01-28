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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const client_1 = require("@prisma/client");
const permission_repository_1 = require("./permission.repository");
let PermissionService = class PermissionService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async getAllPermissions() {
        try {
            return await this.permissionRepository.list();
        }
        catch (error) {
            console.log('/permission', error);
            throw error;
        }
    }
    async getPermissionById(id) {
        try {
            const permission = await this.permissionRepository.findById(id);
            if (!permission) {
                throw errors_1.NotFoundRecordException;
            }
            return permission;
        }
        catch (error) {
            console.log('/permission/:id', error);
            throw error;
        }
    }
    async createPermission({ data, createdById, }) {
        try {
            const role = await this.permissionRepository.create({
                createdById,
                data,
            });
            return role;
        }
        catch (error) {
            console.log('/permission', error);
            throw error;
        }
    }
    async updatePermission({ id, data, updatedById, }) {
        try {
            const updatedPermission = await this.permissionRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedPermission;
        }
        catch (error) {
            console.log('/permission/:id', error);
            throw error;
        }
    }
    async deletePermission({ id, deletedById, }) {
        try {
            await this.permissionRepository.delete({ id, deletedById });
            return { message: 'Delete permission successfully' };
        }
        catch (error) {
            console.log('/permission/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map