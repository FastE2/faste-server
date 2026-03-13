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
    findById({ id, userId, roleName, }: {
        id: number;
        userId: number;
        roleName: string;
    }): Promise<{
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
