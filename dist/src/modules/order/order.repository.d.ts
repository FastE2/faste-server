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
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: PrismaJson.ProductTranslations;
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: PrismaJson.AttributesType;
            orderId: number | null;
        }[];
    } & {
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdById: number;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shopId: number;
        addressShipId: number;
        deliveryId: number;
        voucherId: number | null;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        isReviewed: boolean;
        paymentId: number | null;
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
