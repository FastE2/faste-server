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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const shop_repository_1 = require("./shop.repository");
const prisma_1 = require("../../common/errors/prisma");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
const shop_error_1 = require("./shop.error");
const common_role_repository_1 = require("../../common/repositories/common-role.repository");
let ShopService = class ShopService {
    shopRepository;
    commonUserRepository;
    commonRoleRepository;
    constructor(shopRepository, commonUserRepository, commonRoleRepository) {
        this.shopRepository = shopRepository;
        this.commonUserRepository = commonUserRepository;
        this.commonRoleRepository = commonRoleRepository;
    }
    async getAllShops(query) {
        try {
            return await this.shopRepository.findAll(query);
        }
        catch (error) {
            console.log('/shop', error);
            throw error;
        }
    }
    async getAllShopsIsPublic(query) {
        try {
            return await this.shopRepository.findAll(query, true);
        }
        catch (error) {
            console.log('/shop/public', error);
            throw error;
        }
    }
    async registerShop(userId, body) {
        try {
            const existedUser = await this.commonUserRepository.findUniqueUser({
                id: userId,
            });
            if (!existedUser) {
                throw errors_1.NotFoundUserException;
            }
            const shop = await this.shopRepository.findOne({ shopid: userId });
            if (shop) {
                throw shop_error_1.ExistedShopException;
            }
            return this.shopRepository.create({ userId, data: body });
        }
        catch (error) {
            console.log('shop/register', error);
            throw error;
        }
    }
    async getShopById(id) {
        try {
            const shop = await this.shopRepository.findOne({ shopid: id });
            if (!shop) {
                throw errors_1.NotFoundRecordException;
            }
            return shop;
        }
        catch (error) {
            console.log('/shop/:id', error);
            throw error;
        }
    }
    async getShopBySlug(slug) {
        try {
            const shop = await this.shopRepository.findOne({ slug }, { isActive: true });
            if (!shop) {
                throw errors_1.NotFoundRecordException;
            }
            return shop;
        }
        catch (error) {
            console.log('/shop/:slug', error);
            throw error;
        }
    }
    async updateShop({ id, data, updatedById, }) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({
                id: updatedById,
            });
            const roleAdminId = await this.commonRoleRepository.getAdminRoleId();
            const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
            if ((id !== updatedById || user?.roleId !== roleSellerId) &&
                user?.roleId !== roleAdminId) {
                throw new common_1.ForbiddenException();
            }
            const updatedShop = await this.shopRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedShop;
        }
        catch (error) {
            console.log('/shop/:id', error);
            throw error;
        }
    }
    async deleteShop({ id, deletedById }) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({
                id: deletedById,
            });
            const roleAdminId = await this.commonRoleRepository.getAdminRoleId();
            const roleSellerId = await this.commonRoleRepository.getSellerRoleId();
            if ((id !== deletedById || user?.roleId !== roleSellerId) &&
                user?.roleId !== roleAdminId) {
                throw new common_1.ForbiddenException();
            }
            await this.shopRepository.delete({ id, deletedById });
            return { message: 'Delete shop successfully' };
        }
        catch (error) {
            console.log('/shop/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shop_repository_1.ShopRepository,
        common_user_repository_1.CommonUserRepository,
        common_role_repository_1.CommonRoleRepository])
], ShopService);
//# sourceMappingURL=shop.service.js.map