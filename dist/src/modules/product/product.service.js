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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const client_1 = require("@prisma/client");
const product_repository_1 = require("./product.repository");
const role_base_constant_1 = require("../../common/constants/role-base.constant");
const generate_skus_helper_1 = require("../../common/helpers/generate-skus.helper");
let ProductService = class ProductService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAllPublic(query) {
        try {
            return await this.productRepository.findAllPublic(query);
        }
        catch (error) {
            console.log('/products/public', error);
            throw error;
        }
    }
    async findAllPublicByShop(query, id) {
        try {
            return await this.productRepository.findAllPublicByShop(query, id);
        }
        catch (error) {
            console.log('/products/public/shop/:id', error);
            throw error;
        }
    }
    async findByIdPublic(id) {
        try {
            const product = await this.productRepository.findOneUniquePublic({ id });
            if (!product) {
                throw errors_1.NotFoundRecordException;
            }
            return product;
        }
        catch (error) {
            console.log('/product/public', error);
            throw error;
        }
    }
    async findBySlugIdPublic(slugId) {
        try {
            const product = await this.productRepository.findOneUniquePublic({
                slugId,
            });
            if (!product) {
                throw errors_1.NotFoundRecordException;
            }
            return product;
        }
        catch (error) {
            console.log('/product/public', error);
            throw error;
        }
    }
    async findAll({ query, userId, roleName, }) {
        try {
            const where = { deletedAt: null };
            if (roleName === role_base_constant_1.ROLE_NAME.SELLER) {
                where.shopId = userId;
            }
            else if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN &&
                roleName !== role_base_constant_1.ROLE_NAME.SELLER) {
                throw new common_1.ForbiddenException();
            }
            return await this.productRepository.findAll({ pagination: query, where });
        }
        catch (error) {
            console.log('/products', error);
            throw error;
        }
    }
    async findById({ id, userId, roleName, }) {
        try {
            const where = { id, deletedAt: null };
            if (roleName === role_base_constant_1.ROLE_NAME.SELLER) {
                where.shopId = userId;
            }
            const product = await this.productRepository.findById(where);
            if (!product) {
                throw errors_1.NotFoundRecordException;
            }
            this.validatePrivilege({
                userIdRequest: userId,
                roleNameRequest: roleName,
                createdById: product.shopId,
            });
            return product;
        }
        catch (error) {
            console.log('/products/:id', error);
            throw error;
        }
    }
    async create({ data, createdById, roleName, }) {
        try {
            if (roleName !== role_base_constant_1.ROLE_NAME.ADMIN && roleName !== role_base_constant_1.ROLE_NAME.SELLER) {
                throw new common_1.ForbiddenException();
            }
            const { skus, ...productData } = data;
            const newSkus = skus.map((sku) => {
                const skuCode = (0, generate_skus_helper_1.buildSkuCode)(sku.attributes);
                return {
                    ...sku,
                    skuCode,
                };
            });
            const product = await this.productRepository.create({
                createdById,
                data: {
                    ...productData,
                    skus: newSkus,
                },
            });
            return product;
        }
        catch (error) {
            console.log('/products', error);
            throw error;
        }
    }
    async update({ id, data, updatedById, roleName, }) {
        const product = await this.productRepository.findById({
            id,
            deletedAt: null,
        });
        if (!product) {
            throw errors_1.NotFoundRecordException;
        }
        this.validatePrivilege({
            userIdRequest: updatedById,
            createdById: product.shopId,
            roleNameRequest: roleName,
        });
        try {
            const newSkus = data.skus.map((sku) => {
                if (!sku.skuCode) {
                    sku.skuCode = (0, generate_skus_helper_1.buildSkuCode)(sku.attributes);
                }
                return {
                    ...sku,
                };
            });
            data.skus = newSkus;
            const updatedCategory = await this.productRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedCategory;
        }
        catch (error) {
            console.log('/products/:id', error);
            throw error;
        }
    }
    async delete({ id, deletedById, roleName, }) {
        const product = await this.productRepository.findById({
            id,
            deletedAt: null,
        });
        if (!product) {
            throw errors_1.NotFoundRecordException;
        }
        this.validatePrivilege({
            userIdRequest: deletedById,
            createdById: product.shopId,
            roleNameRequest: roleName,
        });
        try {
            await this.productRepository.delete({ id, deletedById });
            return { message: 'Delete product successfully' };
        }
        catch (error) {
            console.log('/category/:id', error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
    validatePrivilege({ userIdRequest, roleNameRequest, createdById, }) {
        if (userIdRequest !== createdById && roleNameRequest !== role_base_constant_1.ROLE_NAME.ADMIN) {
            throw new common_1.ForbiddenException();
        }
        return true;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map