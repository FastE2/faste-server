import { SearchService } from './search.service';
import { CreateProductSearchDTO } from './dtos/create.dto';
import { SearchProductService } from './search-product.service';
export declare class SearchController {
    private readonly searchService;
    private readonly searchProductService;
    constructor(searchService: SearchService, searchProductService: SearchProductService);
    searchProducts(keyword?: string, categoryIdsStr?: string, minPriceStr?: string, maxPriceStr?: string, ratingStr?: string, sortBy?: string, pageStr?: string, limitStr?: string, order?: 'asc' | 'desc', orderBy?: 'popular' | 'new' | 'bestseller'): Promise<{
        total: number;
        page: number;
        limit: number;
        products: ({
            skus: {
                id: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                userId: number | null;
                skuCode: string;
                productId: number;
                image: string;
                price: number;
                attributes: PrismaJson.AttributesType;
                quantity: number;
                sold: number;
                weightGram: number | null;
                lengthCm: number | null;
                widthCm: number | null;
                heightCm: number | null;
                shopId: number;
            }[];
            categories: {
                productId: number;
                categoryId: number;
            }[];
        } & {
            id: number;
            name: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            sold: number;
            weightGram: number | null;
            lengthCm: number | null;
            widthCm: number | null;
            heightCm: number | null;
            shopId: number;
            basePrice: number;
            brandId: number;
            publishedAt: Date | null;
            images: string[];
            variants: PrismaJson.Variants;
            rating: number | null;
            ratingCount: number;
            rating1Count: number;
            rating2Count: number;
            rating3Count: number;
            rating4Count: number;
            rating5Count: number;
            totalViews: number;
            slugId: string;
        })[];
    }>;
    suggest(keyword: string): Promise<any[]>;
    indexProduct(payload: CreateProductSearchDTO): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    update(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    delete(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
}
