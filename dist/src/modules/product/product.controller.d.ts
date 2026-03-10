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
            categories: {
                productId: number;
                categoryId: number;
            }[];
            brand: {
                id: number;
                name: string;
                description: string;
                createdById: number | null;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                logo: string;
            };
            skus: {
                id: number;
                updatedById: number | null;
                deletedById: number | null;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                productId: number;
                userId: number | null;
                shopId: number;
                price: number;
                sold: number;
                weightGram: number | null;
                lengthCm: number | null;
                widthCm: number | null;
                heightCm: number | null;
                skuCode: string;
                image: string;
                attributes: PrismaJson.AttributesType;
                quantity: number;
            }[];
            discounts: {
                productId: number;
                discountId: number;
            }[];
        } & {
            id: number;
            name: string;
            description: string;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ProductStatus;
            rating: number | null;
            images: string[];
            shopId: number;
            slugId: string;
            basePrice: number;
            brandId: number;
            publishedAt: Date | null;
            variants: PrismaJson.Variants;
            ratingCount: number;
            rating1Count: number;
            rating2Count: number;
            rating3Count: number;
            rating4Count: number;
            rating5Count: number;
            totalViews: number;
            sold: number;
            weightGram: number | null;
            lengthCm: number | null;
            widthCm: number | null;
            heightCm: number | null;
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
