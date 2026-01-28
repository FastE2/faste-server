import { SearchService } from './search.service';
import { CreateProductSearchDTO } from './dtos/create.dto';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchProducts(keyword?: string, categoryIdsStr?: string, minPriceStr?: string, maxPriceStr?: string, ratingStr?: string, sortBy?: string, pageStr?: string, limitStr?: string, order?: 'asc' | 'desc', orderBy?: 'popular' | 'new' | 'bestseller'): Promise<{
        items: unknown[];
        total: number | import("@elastic/elasticsearch/lib/api/types").SearchTotalHits | undefined;
        page: number;
        limit: number;
    }>;
    suggest(keyword: string): Promise<{
        keyword: string;
        score: number;
        popularity: number;
    }[]>;
    indexProduct(payload: CreateProductSearchDTO): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    update(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    delete(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
}
