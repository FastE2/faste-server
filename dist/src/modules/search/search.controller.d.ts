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
            categories: {
                productId: number;
                categoryId: number;
            }[];
            skus: {
                id: number;
                createdAt: Date;
                price: number;
                sold: number;
                weightGram: number | null;
                lengthCm: number | null;
                widthCm: number | null;
                heightCm: number | null;
                shopId: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                updatedAt: Date;
                productId: number;
                skuCode: string;
                image: string;
                attributes: PrismaJson.AttributesType;
                quantity: number;
                userId: number | null;
            }[];
        } & {
            id: number;
            status: import(".prisma/client").$Enums.ProductStatus;
            images: string[];
            brandId: number;
            name: string;
            slugId: string;
            description: string;
            createdAt: Date;
            rating: number | null;
            ratingCount: number;
            totalViews: number;
            basePrice: number;
            publishedAt: Date | null;
            variants: PrismaJson.Variants;
            rating1Count: number;
            rating2Count: number;
            rating3Count: number;
            rating4Count: number;
            rating5Count: number;
            sold: number;
            weightGram: number | null;
            lengthCm: number | null;
            widthCm: number | null;
            heightCm: number | null;
            shopId: number;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            updatedAt: Date;
        })[];
    }>;
    suggest(keyword: string): Promise<any[]>;
    indexProduct(payload: CreateProductSearchDTO): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
    update(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").UpdateResponse<unknown>>;
    delete(payload: any): Promise<import("@elastic/elasticsearch/lib/api/types").WriteResponseBase>;
}
