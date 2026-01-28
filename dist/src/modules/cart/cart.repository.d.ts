import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartBodyType, UpdateCartItemBodyType } from './cart.schema';
export declare class CartRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list({ userId, languageId, page, limit, }: {
        userId: number;
        languageId: string;
        limit: number;
        page: number;
    }): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    create(userId: number, body: AddToCartBodyType): Promise<any>;
    validateSKU({ skuId, quantity, userId, isCreate, }: {
        skuId: number;
        quantity: number;
        userId: number;
        isCreate: boolean;
    }): Promise<boolean>;
    update({ id, userId, body, }: {
        id: number;
        userId: number;
        body: UpdateCartItemBodyType;
    }): Promise<any>;
    delete({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<any>;
}
