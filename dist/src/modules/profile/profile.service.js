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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
const errors_1 = require("../../common/errors");
const profile_error_1 = require("./profile.error");
const hash_service_1 = require("../../common/libs/crypto/hash.service");
let ProfileService = class ProfileService {
    commonUserRepository;
    hashService;
    constructor(commonUserRepository, hashService) {
        this.commonUserRepository = commonUserRepository;
        this.hashService = hashService;
    }
    async getProfile(id) {
        try {
            const user = await this.commonUserRepository.findUniqueUserProfile({ id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const { totpSecret, ...safeUser } = user;
            return {
                ...safeUser,
                isTwoFactorEnabled: !!totpSecret,
            };
        }
        catch (error) {
            console.log('/profile', error);
            throw error;
        }
    }
    async updateProfile({ id, data }) {
        try {
            const updateUser = await this.commonUserRepository.update({ id }, {
                ...data,
                updatedById: id,
            });
            if (!updateUser) {
                throw new common_1.NotFoundException();
            }
            const { password, totpSecret, ...safeUser } = updateUser;
            return {
                ...safeUser,
                isTwoFactorEnabled: !!totpSecret,
            };
        }
        catch (error) {
            console.log('/profile', error);
            throw error;
        }
    }
    async changePassword({ id, data, }) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({ id });
            if (!user) {
                throw errors_1.NotFoundRecordException;
            }
            const isMatchPassword = await this.hashService.compare({
                hashed: user.password,
                plainText: data.oldPassword,
            });
            if (!isMatchPassword) {
                throw profile_error_1.IncorrectPasswordException;
            }
            const hashPassword = await this.hashService.hash(data.newPassword);
            const updateUser = await this.commonUserRepository.update({ id }, {
                password: hashPassword,
                updatedById: id,
            });
            if (!updateUser) {
                throw new common_1.NotFoundException();
            }
            return { message: 'Change password successfully' };
        }
        catch (error) {
            console.log('/profile/change-password', error);
            throw error;
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_user_repository_1.CommonUserRepository,
        hash_service_1.HashService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map