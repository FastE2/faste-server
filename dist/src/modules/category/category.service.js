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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/errors");
const client_1 = require("@prisma/client");
const category_repository_1 = require("./category.repository");
let CategoryService = class CategoryService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategorys(query) {
        try {
            return await this.categoryRepository.list(query);
        }
        catch (error) {
            console.log('/category', error);
            throw error;
        }
    }
    async getCategoryById(id) {
        try {
            const category = await this.categoryRepository.findById(id);
            if (!category) {
                throw errors_1.NotFoundRecordException;
            }
            return category;
        }
        catch (error) {
            console.log('/category/:id', error);
            throw error;
        }
    }
    async createCategory({ data, createdById, }) {
        try {
            const category = await this.categoryRepository.create({
                createdById,
                data,
            });
            return category;
        }
        catch (error) {
            console.log('/category', error);
            throw error;
        }
    }
    async updateRole({ id, data, updatedById, }) {
        try {
            const updatedCategory = await this.categoryRepository.update({
                id,
                updatedById,
                data,
            });
            return updatedCategory;
        }
        catch (error) {
            console.log('/category/:id', error);
            throw error;
        }
    }
    async deleteCategory({ id, deletedById, }) {
        try {
            await this.categoryRepository.delete({ id, deletedById });
            return { message: 'Delete category successfully' };
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
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map