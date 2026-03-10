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
exports.SearchProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SearchProductService = class SearchProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(params) {
        const { keyword, categoryIds, minPrice, maxPrice, rating, page = 1, limit = 20, sortBy, order = 'desc', orderBy, } = params;
        const where = {};
        if (keyword) {
            where.OR = [
                {
                    name: {
                        contains: keyword,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: keyword,
                        mode: 'insensitive',
                    },
                },
            ];
        }
        if (categoryIds && categoryIds.length > 0) {
            where.categories = {
                some: {
                    categoryId: {
                        in: categoryIds,
                    },
                },
            };
        }
        if (minPrice || maxPrice) {
            where.basePrice = {};
            if (minPrice)
                where.basePrice.gte = minPrice;
            if (maxPrice)
                where.basePrice.lte = maxPrice;
        }
        if (rating) {
            where.rating = {
                gte: rating,
            };
        }
        let orderByQuery = {};
        if (sortBy) {
            orderByQuery[sortBy] = order;
        }
        if (orderBy === 'popular') {
            orderByQuery = { totalViews: 'desc' };
        }
        if (orderBy === 'new') {
            orderByQuery = { createdAt: 'desc' };
        }
        if (orderBy === 'bestseller') {
            orderByQuery = { sold: 'desc' };
        }
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: orderByQuery,
                include: {
                    categories: true,
                    skus: true,
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            products,
        };
    }
    async suggest(keyword) {
        if (!keyword || keyword.trim().length < 2) {
            return [];
        }
        const results = await this.prisma.product.findMany({
            where: {
                name: {
                    contains: keyword,
                    mode: 'insensitive',
                },
            },
            select: {
                name: true,
            },
            take: 10,
        });
        const keywords = new Set();
        results.forEach((p) => {
            keywords.add(p.name);
        });
        return Array.from(keywords).map((k) => ({
            keyword: k,
        }));
    }
};
exports.SearchProductService = SearchProductService;
exports.SearchProductService = SearchProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchProductService);
//# sourceMappingURL=search-product.service.js.map