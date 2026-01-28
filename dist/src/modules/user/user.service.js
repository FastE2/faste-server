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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
const errors_1 = require("../../common/errors");
const user_error_1 = require("./user.error");
const role_base_constant_1 = require("../../common/constants/role-base.constant");
const common_role_repository_1 = require("../../common/repositories/common-role.repository");
const hash_service_1 = require("../../common/libs/crypto/hash.service");
const prisma_1 = require("../../common/errors/prisma");
let UserService = class UserService {
    userRepository;
    commonUserRepository;
    commonRoleRepository;
    hashService;
    constructor(userRepository, commonUserRepository, commonRoleRepository, hashService) {
        this.userRepository = userRepository;
        this.commonUserRepository = commonUserRepository;
        this.commonRoleRepository = commonRoleRepository;
        this.hashService = hashService;
    }
    async getAllUsers(query) {
        try {
            return await this.userRepository.list(query);
        }
        catch (error) {
            console.log('/user', error);
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await this.commonUserRepository.findUniqueUserIncludeRole({
                id,
            });
            if (!user) {
                throw errors_1.NotFoundRecordException;
            }
            return user;
        }
        catch (error) {
            console.log('/user/:id', error);
            throw error;
        }
    }
    async createUser({ data, updatedById, updatedByRoleName, }) {
        try {
            const existEmail = await this.commonUserRepository.findUniqueUser({
                email: data.email,
            });
            if (existEmail) {
                throw errors_1.EmailAlreadyExistsException;
            }
            await this.verifyRoleAdmin({
                roleIdTarget: data.roleId,
                roleNameAgent: updatedByRoleName,
            });
            const hasPassword = await this.hashService.hash(data.password);
            const user = await this.userRepository.create({
                createdById: updatedById,
                data: {
                    ...data,
                    password: hasPassword,
                },
            });
            return user;
        }
        catch (error) {
            console.log('/user/:id', error);
            throw error;
        }
    }
    async updateUser({ id, data, updatedById, updatedByRoleName, }) {
        try {
            this.verifyYourself({ userId: updatedById, userTargetId: id });
            const userRoleId = await this.getRoleIdByUserId(id);
            await this.verifyRoleAdmin({
                roleIdTarget: userRoleId,
                roleNameAgent: updatedByRoleName,
            });
            const updateUser = await this.commonUserRepository.update({ id }, data);
            if (!updateUser) {
                throw new common_1.NotFoundException();
            }
            const { password, totpSecret, ...safeUser } = updateUser;
            return safeUser;
        }
        catch (error) {
            console.log('/user/:id', error);
            throw error;
        }
    }
    verifyYourself({ userId, userTargetId, }) {
        if (userId === userTargetId) {
            throw user_error_1.CannotUpdateOrDeleteYourselfException;
        }
    }
    async verifyRoleAdmin({ roleNameAgent, roleIdTarget, }) {
        if (roleNameAgent === role_base_constant_1.ROLE_NAME.ADMIN) {
            return true;
        }
        else {
            const adminRoleId = await this.commonRoleRepository.getAdminRoleId();
            if (roleIdTarget === adminRoleId) {
                throw new common_1.ForbiddenException();
            }
            return true;
        }
    }
    async getRoleIdByUserId(userId) {
        const currentUser = await this.commonUserRepository.findUniqueUser({
            id: userId,
        });
        if (!currentUser) {
            throw errors_1.NotFoundRecordException;
        }
        return currentUser.roleId;
    }
    async deleteUser({ id, deletedById, deletedByRoleName, }) {
        try {
            this.verifyYourself({ userId: deletedById, userTargetId: id });
            const userRoleId = await this.getRoleIdByUserId(id);
            await this.verifyRoleAdmin({
                roleIdTarget: userRoleId,
                roleNameAgent: deletedByRoleName,
            });
            await this.userRepository.delete({ id, deletedById });
            return { message: 'Delete user successfully' };
        }
        catch (error) {
            console.log('/user/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        common_user_repository_1.CommonUserRepository,
        common_role_repository_1.CommonRoleRepository,
        hash_service_1.HashService])
], UserService);
//# sourceMappingURL=user.service.js.map