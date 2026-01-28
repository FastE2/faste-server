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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const brand_repository_1 = require("./brand.repository");
const prisma_1 = require("../../common/errors/prisma");
let BrandService = class BrandService {
    brandRepository;
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    async getAllBrands(query) {
        try {
            return await this.brandRepository.list(query);
        }
        catch (error) {
            console.log('/brand', error);
            throw error;
        }
    }
    async getBrandById(id) {
        try {
            const brand = await this.brandRepository.findById(id);
            if (!brand) {
                throw errors_1.NotFoundRecordException;
            }
            return brand;
        }
        catch (error) {
            console.log('/brand/:id', error);
            throw error;
        }
    }
    async createBrand({ data, createdById, }) {
        try {
            const brand = await this.brandRepository.create({ createdById, data });
            return brand;
        }
        catch (error) {
            console.log('/brand', error);
            throw error;
        }
    }
    async updateBrand({ id, data, updatedById, }) {
        try {
            const updatedBrand = await this.brandRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedBrand;
        }
        catch (error) {
            console.log('/brand/:id', error);
            throw error;
        }
    }
    async deleteBrand({ id, deletedById }) {
        try {
            await this.brandRepository.delete({ id, deletedById });
            return { message: 'Delete brand successfully' };
        }
        catch (error) {
            console.log('/brand/:id', error);
            if ((0, prisma_1.isPrismaRecordNotFound)(error)) {
                throw errors_1.NotFoundRecordException;
            }
            throw error;
        }
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brand_repository_1.BrandRepository])
], BrandService);
//# sourceMappingURL=brand.service.js.map