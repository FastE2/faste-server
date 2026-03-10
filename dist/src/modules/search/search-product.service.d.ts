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
                sold: number;
                weightGram: number | null;
                lengthCm: number | null;
                widthCm: number | null;
                heightCm: number | null;
                shopId: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                skuCode: string;
                productId: number;
                image: string;
                price: number;
                attributes: PrismaJson.AttributesType;
                quantity: number;
                userId: number | null;
            }[];
            categories: {
                productId: number;
                categoryId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string;
            basePrice: number;
            brandId: number;
            status: import(".prisma/client").$Enums.ProductStatus;
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
            sold: number;
            weightGram: number | null;
            lengthCm: number | null;
            widthCm: number | null;
            heightCm: number | null;
            shopId: number;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    suggest(keyword: string): Promise<suggestKeywordType[]>;
}
export {};
