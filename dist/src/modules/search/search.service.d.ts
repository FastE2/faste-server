import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateProductSearchType } from './search.schema';
interface SearchProductsParams {
    keyword?: string;
    categoryIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    size?: number;
    from?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    orderBy?: 'popular' | 'new' | 'bestseller';
}
export declare class SearchService {
    private readonly elasticsearchService;
    constructor(elasticsearchService: ElasticsearchService);
    search(params: SearchProductsParams): Promise<{
        items: unknown[];
        total: number | import("@elastic/elasticsearch/lib/api/types").SearchTotalHits | undefined;
        page: number;
        limit: number;
    }>;
    indexDocument<T>(index: string, id: string, document: Omit<CreateProductSearchType, 'id'>): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    bulkIndexDocuments(index: string, documents: {
        id: string;
        data: Omit<CreateProductSearchType, 'id'>;
    }[]): Promise<import("@elastic/elasticsearch/lib/api/types").BulkResponse | {
        indexed: number;
    }>;
    updateDocument(index: string, id: string, data: Partial<Omit<CreateProductSearchType, 'id'>>): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    deleteDocument(index: string, id: string): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    suggest(keyword: string): Promise<{
        keyword: string;
        score: number;
        popularity: number;
    }[]>;
}
export {};
