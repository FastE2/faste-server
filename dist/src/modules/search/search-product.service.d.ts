import { PrismaService } from 'src/prisma/prisma.service';
export interface SearchProductsParams {
    keyword?: string;
    categoryIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    orderBy?: 'popular' | 'new' | 'bestseller';
}
interface suggestKeywordType {
    keyword: string;
}
export declare class SearchProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(params: SearchProductsParams): Promise<{
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
    suggest(keyword: string): Promise<suggestKeywordType[]>;
}
export {};
