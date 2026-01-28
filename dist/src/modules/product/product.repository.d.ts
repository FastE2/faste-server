import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductInDBBodyType, GetProductsQueryType, UpdateProductBodyType } from './product.schema';
import { Prisma } from '@prisma/client';
export declare class ProductRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAllPublic(query: GetProductsQueryType): Promise<any>;
    findAllPublicByShop(query: GetProductsQueryType, id: number): Promise<any>;
    findOneUniquePublic(uniqueValue: {
        id: number;
    } | {
        slugId: string;
    }): Promise<any>;
    findAll({ pagination, where, }: {
        pagination: PaginationQueryType;
        where: Prisma.ProductWhereInput;
    }): Promise<{
        data: ({
            brand: {
                id: number;
                name: string;
                createdById: number | null;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                logo: string;
            };
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
            discounts: {
                productId: number;
                discountId: number;
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
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(where: Prisma.ProductWhereInput): Promise<({
        brand: {
            translations: {
                id: number;
                name: string;
                createdById: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                brandId: number;
                languageId: number;
            }[];
        } & {
            id: number;
            name: string;
            createdById: number | null;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            logo: string;
        };
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
        categories: ({
            category: {
                id: number;
                name: string;
                createdById: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                image: string | null;
                parentCategoryId: number | null;
            };
        } & {
            productId: number;
            categoryId: number;
        })[];
        productTranslations: {
            id: number;
            name: string;
            createdById: number;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            productId: number;
            languageId: number;
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
    }) | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreateProductInDBBodyType;
    }): Promise<any>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateProductBodyType;
    }): Promise<any>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
