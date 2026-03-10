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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const search_service_1 = require("./search.service");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const create_dto_1 = require("./dtos/create.dto");
const search_product_service_1 = require("./search-product.service");
let SearchController = class SearchController {
    searchService;
    searchProductService;
    constructor(searchService, searchProductService) {
        this.searchService = searchService;
        this.searchProductService = searchProductService;
    }
    searchProducts(keyword, categoryIdsStr, minPriceStr, maxPriceStr, ratingStr, sortBy = 'newest', pageStr, limitStr, order = 'asc', orderBy = 'new') {
        const page = Number(pageStr) || 1;
        const limit = Number(limitStr) || 20;
        const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
        const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;
        const categoryIds = categoryIdsStr
            ? categoryIdsStr.split(',').map((id) => Number(id))
            : undefined;
        const rating = ratingStr ? Number(ratingStr) : undefined;
        if (rating != null && (rating < 0 || rating > 5)) {
            throw new common_1.BadRequestException('Rating must be greater than 0 and less than 5');
        }
        return this.searchProductService.search({
            keyword,
            categoryIds,
            minPrice,
            maxPrice,
            rating,
            page,
            limit,
            sortBy,
            order,
            orderBy,
        });
    }
    async suggest(keyword) {
        if (!keyword)
            return [];
        return await this.searchProductService.suggest(keyword);
    }
    async indexProduct(payload) {
        const { id, ...rest } = payload;
        return this.searchService.indexDocument('products', String(id), rest);
    }
    async update(payload) {
        const { id, ...rest } = payload;
        return this.searchService.updateDocument('products', String(id), rest);
    }
    async delete(payload) {
        const { id } = payload;
        return this.searchService.deleteDocument('products', String(id));
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Query)('categoryIds')),
    __param(2, (0, common_1.Query)('minPrice')),
    __param(3, (0, common_1.Query)('maxPrice')),
    __param(4, (0, common_1.Query)('rating')),
    __param(5, (0, common_1.Query)('sortBy')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __param(8, (0, common_1.Query)('order')),
    __param(9, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object, String, String, String, String]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Get)('suggest'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "suggest", null);
__decorate([
    (0, microservices_1.EventPattern)('product.created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateProductSearchDTO]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "indexProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)('product.updated'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('product.deleted'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "delete", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService, search_product_service_1.SearchProductService])
], SearchController);
//# sourceMappingURL=search.controller.js.map