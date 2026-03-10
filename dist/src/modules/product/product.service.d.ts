import { CreateProductBodyType, CreateProductInDBBodyType, GetProductsQueryType } from './product.schema';
import { ProductRepository } from './product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: ProductRepository);
    findAllPublic(query: GetProductsQueryType): Promise<any>;
    findAllPublicByShop(query: GetProductsQueryType, id: number): Promise<any>;
    findByIdPublic(id: number): Promise<any>;
    findBySlugIdPublic(slugId: string): Promise<any>;
    findAll({ query, userId, roleName, }: {
        query: GetProductsQueryType;
        userId: number;
        roleName: string;
    }): Promise<{
        data: ({
            categories: {
                productId: number;
                categoryId: number;
            }[];
            brand: {
                name: string;
                createdById: number | null;
                createdAt: Date;
                id: number;
                description: string;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                updatedAt: Date;
                logo: string;
            };
            skus: {
                price: number;
                createdAt: Date;
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
                updatedAt: Date;
                productId: number;
                skuCode: string;
                image: string;
                attributes: PrismaJson.AttributesType;
                quantity: number;
                userId: number | null;
            }[];
            discounts: {
                productId: number;
                discountId: number;
            }[];
        } & {
            name: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            createdAt: Date;
            id: number;
            description: string;
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
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById({ id, userId, roleName, }: {
        id: number;
        userId: number;
        roleName: string;
    }): Promise<{
        categories: ({
            category: {
                name: string;
                createdById: number;
                createdAt: Date;
                id: number;
                description: string;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                updatedAt: Date | null;
                image: string | null;
                parentCategoryId: number | null;
            };
        } & {
            productId: number;
            categoryId: number;
        })[];
        brand: {
            translations: {
                name: string;
                createdById: number;
                createdAt: Date;
                id: number;
                description: string;
                brandId: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                updatedAt: Date;
                languageId: number;
            }[];
        } & {
            name: string;
            createdById: number | null;
            createdAt: Date;
            id: number;
            description: string;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            updatedAt: Date;
            logo: string;
        };
        skus: {
            price: number;
            createdAt: Date;
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
            updatedAt: Date;
            productId: number;
            skuCode: string;
            image: string;
            attributes: PrismaJson.AttributesType;
            quantity: number;
            userId: number | null;
        }[];
        productTranslations: {
            name: string;
            createdById: number;
            createdAt: Date;
            id: number;
            description: string;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            updatedAt: Date;
            productId: number;
            languageId: number;
        }[];
    } & {
        name: string;
        status: import(".prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        id: number;
        description: string;
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
    }>;
    create({ data, createdById, roleName, }: {
        data: CreateProductBodyType;
        createdById: number;
        roleName: string;
    }): Promise<any>;
    update({ id, data, updatedById, roleName, }: {
        id: number;
        data: CreateProductInDBBodyType;
        updatedById: number;
        roleName: string;
    }): Promise<any>;
    delete({ id, deletedById, roleName, }: {
        id: number;
        deletedById: number;
        roleName: string;
    }): Promise<{
        message: string;
    }>;
    validatePrivilege({ userIdRequest, roleNameRequest, createdById, }: {
        userIdRequest: number;
        roleNameRequest: string;
        createdById: number | undefined | null;
    }): boolean;
}
