import { PrismaService } from 'src/prisma/prisma.service';
import { CancelOrderResType, CreateOrderBodyType, GetOrderListQueryType, UpdateOrderBodyType } from './order.schema';
import { OrderProducer } from './order.producer';
type WhereUniqueOrderType = {
    id: number;
} | {
    id: number;
    userId: number;
} | {
    id: number;
    shopId: number;
};
type WhereListOrderType = {
    userId: number;
} | {
    shopId: number;
};
export declare class OrderRepository {
    private readonly prismaService;
    private readonly orderProducer;
    constructor(prismaService: PrismaService, orderProducer: OrderProducer);
    list({ _where, query, }: {
        _where: WhereListOrderType;
        query: GetOrderListQueryType;
    }): Promise<any>;
    findUniqueOrder(where: WhereUniqueOrderType): Promise<{
        items: {
            createdAt: Date;
            id: number;
            orderId: number | null;
            productName: string;
            skuPrice: number;
            image: string;
            skuAttributes: PrismaJson.AttributesType;
            skuId: number | null;
            quantity: number;
            productId: number | null;
            productTranslations: PrismaJson.ProductTranslations;
        }[];
    } & {
        status: import(".prisma/client").$Enums.OrderStatus;
        addressShipId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        deletedById: number | null;
        id: number;
        userId: number;
        shopId: number;
        paymentId: number | null;
        deliveryId: number;
        voucherId: number | null;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        createdById: number;
        updatedById: number | null;
        isReviewed: boolean;
    }>;
    findUniqueClientById({ userId, orderId, }: {
        userId: number;
        orderId: number;
    }): Promise<any>;
    findUniqueShopById({ userId, orderId, }: {
        userId: number;
        orderId: number;
    }): Promise<any>;
    create({ userId, body, }: {
        userId: number;
        body: CreateOrderBodyType;
    }): Promise<{
        transaction: any;
        orders: any;
    }>;
    cancel(userId: number, orderId: number): Promise<CancelOrderResType>;
    update({ id, updatedById, body, }: {
        id: number;
        updatedById: number;
        body: UpdateOrderBodyType;
    }): Promise<any>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
export {};
