import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { ProductService } from './product.service';
import { CreateProductBodyDTO, GetParamSlugIdDTO, GetProductsQueryDTO, UpdateProductBodyDTO } from './product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getPublicProducts(query: GetProductsQueryDTO): Promise<any>;
    getPublicProductsByShop(query: GetProductsQueryDTO, params: GetParamsDTO): Promise<any>;
    getById(params: GetParamsDTO): Promise<any>;
    getBySlugId(params: GetParamSlugIdDTO): Promise<any>;
    getProducts(query: GetProductsQueryDTO, userId: number, roleName: string): Promise<{
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
    createProduct(body: CreateProductBodyDTO, userId: number, roleName: string): Promise<any>;
    updateUser(body: UpdateProductBodyDTO, params: GetParamsDTO, userId: number, roleName: string): Promise<any>;
    deleteUser(params: GetParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
}
