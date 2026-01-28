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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let SearchService = class SearchService {
    elasticsearchService;
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
    }
    async search(params) {
        const { keyword, categoryIds, minPrice, maxPrice, rating, size = 20, from = 0, sortBy = 'newest', order = 'asc', orderBy = 'new', } = params;
        console.log('PARAMS', params);
        const query = { bool: { must: [], filter: [] } };
        if (keyword) {
            query.bool.should = [
                { prefix: { name: { value: keyword.toLowerCase(), boost: 3 } } },
                { match_phrase_prefix: { name: { query: keyword, boost: 2 } } },
                {
                    multi_match: {
                        query: keyword,
                        fields: ['name', 'description', 'skus.attributeValue'],
                        type: 'best_fields',
                        operator: 'and',
                        fuzziness: 'AUTO',
                    },
                },
            ];
            query.bool.minimum_should_match = 1;
        }
        if (categoryIds?.length) {
            query.bool.filter.push({ terms: { categoryId: categoryIds } });
        }
        if (minPrice != null || maxPrice != null) {
            query.bool.filter.push({
                nested: {
                    path: 'skus',
                    query: {
                        range: {
                            'skus.price': {
                                gte: minPrice ?? 0,
                                lte: maxPrice ?? Number.MAX_SAFE_INTEGER,
                            },
                        },
                    },
                },
            });
        }
        if (rating != null) {
            query.bool.filter.push({
                range: { averageRating: { gte: rating } },
            });
        }
        const sortMap = {
            newest: [{ createdAt: 'desc' }],
            price: [{ 'skus.0.price': order }],
            rating: [{ averageRating: 'desc' }],
            views_today: [{ viewsToday: 'desc' }],
            sales_today: [{ salesToday: 'desc' }],
        };
        let sort;
        switch (orderBy) {
            case 'new':
                sort = sortMap.newest;
                break;
            case 'popular':
                sort = sortMap.views_today;
                break;
            case 'bestseller':
                sort = sortMap.sales_today;
                break;
            default:
                sort = sortMap[sortBy] ?? sortMap.newest;
                break;
        }
        const body = {
            query,
            sort,
            size: Number(size),
            from,
        };
        const res = await this.elasticsearchService.search({
            index: 'products',
            body: body,
        });
        return {
            items: res.hits.hits.map((h) => h._source),
            total: res.hits.total,
            page: Math.floor(from / size) + 1,
            limit: size,
        };
    }
    async indexDocument(index, id, document) {
        return this.elasticsearchService.create({
            index: index,
            id: id,
            body: document,
        });
    }
    async bulkIndexDocuments(index, documents) {
        if (!documents.length)
            return { indexed: 0 };
        const body = documents.flatMap((doc) => [
            { index: { _index: index, _id: doc.id } },
            doc.data,
        ]);
        const res = await this.elasticsearchService.bulk({
            index,
            refresh: true,
            body,
        });
        return res;
    }
    async updateDocument(index, id, data) {
        return this.elasticsearchService.update({
            index,
            id,
            doc: data,
            refresh: true,
        });
    }
    async deleteDocument(index, id) {
        return this.elasticsearchService.delete({
            index,
            id,
            refresh: true,
        });
    }
    async suggest(keyword) {
        const fuzziness = keyword.length <= 3 ? 0 : keyword.length <= 5 ? 1 : 1;
        const res = await this.elasticsearchService.search({
            index: 'product_suggest',
            size: 0,
            suggest: {
                keyword_prefix: {
                    prefix: keyword.toLowerCase(),
                    completion: {
                        field: 'suggest',
                        size: 8,
                        skip_duplicates: true,
                    },
                },
                keyword_fuzzy: {
                    text: keyword.toLowerCase(),
                    completion: {
                        field: 'suggest',
                        fuzzy: {
                            fuzziness: fuzziness,
                        },
                        size: 8,
                        skip_duplicates: true,
                    },
                },
            },
        });
        const prefixOptions = res.suggest?.keyword_prefix?.[0]?.options ?? [];
        const fuzzyOptions = res.suggest?.keyword_fuzzy?.[0]?.options ?? [];
        const finalOptions = prefixOptions.length > 0 ? prefixOptions : fuzzyOptions;
        if (!Array.isArray(finalOptions))
            return [];
        const result = finalOptions.map((opt) => ({
            keyword: opt.text ?? '',
            keyword_raw: opt._source.keyword_raw,
            score: opt._source?.score ?? opt._score ?? 0,
            popularity: opt._source?.popularity ?? 0,
        }));
        return result;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], SearchService);
//# sourceMappingURL=search.service.js.map