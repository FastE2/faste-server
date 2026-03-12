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
    createProduct(body: CreateProductBodyDTO, userId: number, roleName: string): Promise<any>;
    updateUser(body: UpdateProductBodyDTO, params: GetParamsDTO, userId: number, roleName: string): Promise<any>;
    deleteUser(params: GetParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
}
