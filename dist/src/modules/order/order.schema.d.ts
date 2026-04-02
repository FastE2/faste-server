import { z } from 'zod';
export declare const CreateOrderBodySchema: z.ZodArray<z.ZodObject<{
    shopId: z.ZodNumber;
    paymentMethod: z.ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>;
    addressShipId: z.ZodNumber;
    deliveryId: z.ZodNumber;
    cartItemIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    shopId: number;
    addressShipId: number;
    deliveryId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    cartItemIds: number[];
}, {
    shopId: number;
    addressShipId: number;
    deliveryId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    cartItemIds: number[];
}>, "many">;
export declare const UpdateOrderBodySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>>;
    addressShipId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
    addressShipId?: number | undefined;
}, {
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
    addressShipId?: number | undefined;
}>;
export declare const GetOrderListResSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodNumber;
        status: z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
        createdById: z.ZodNullable<z.ZodNumber>;
        updatedById: z.ZodNullable<z.ZodNumber>;
        deletedById: z.ZodNullable<z.ZodNumber>;
        deletedAt: z.ZodNullable<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        userId: z.ZodNumber;
        shopId: z.ZodNullable<z.ZodNumber>;
        addressShipId: z.ZodNumber;
        paymentId: z.ZodNullable<z.ZodNumber>;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            productId: z.ZodNullable<z.ZodNumber>;
            productName: z.ZodString;
            productTranslations: z.ZodArray<z.ZodObject<{
                id: z.ZodNumber;
                name: z.ZodString;
                description: z.ZodString;
                languageId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }, {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }>, "many">;
            skuPrice: z.ZodNumber;
            image: z.ZodString;
            skuAttributes: z.ZodRecord<z.ZodString, z.ZodString>;
            skuId: z.ZodNullable<z.ZodNumber>;
            orderId: z.ZodNullable<z.ZodNumber>;
            quantity: z.ZodNumber;
            createdAt: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }, {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }>, "many">;
    }, "createdById" | "updatedById" | "deletedById" | "deletedAt" | "addressShipId">, "strip", z.ZodTypeAny, {
        id: number;
        status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shopId: number | null;
        paymentId: number | null;
        items: {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }[];
    }, {
        id: number;
        status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shopId: number | null;
        paymentId: number | null;
        items: {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }[];
    }>, "many">;
    totalItems: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        id: number;
        status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shopId: number | null;
        paymentId: number | null;
        items: {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }[];
    }[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}, {
    data: {
        id: number;
        status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        shopId: number | null;
        paymentId: number | null;
        items: {
            id: number;
            createdAt: Date;
            productId: number | null;
            image: string;
            quantity: number;
            productTranslations: {
                id: number;
                name: string;
                description: string;
                languageId: string;
            }[];
            skuId: number | null;
            productName: string;
            skuPrice: number;
            skuAttributes: Record<string, string>;
            orderId: number | null;
        }[];
    }[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}>;
export declare const GetOrderListQuerySchema: z.ZodObject<{
    role: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    keyword: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    role?: string | undefined;
    keyword?: string | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}, {
    role?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    keyword?: string | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}>;
export declare const GetOrderDetailResSchema: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    userId: z.ZodNumber;
    shopId: z.ZodNullable<z.ZodNumber>;
    addressShipId: z.ZodNumber;
    paymentId: z.ZodNullable<z.ZodNumber>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        productId: z.ZodNullable<z.ZodNumber>;
        productName: z.ZodString;
        productTranslations: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            description: z.ZodString;
            languageId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }, {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }>, "many">;
        skuPrice: z.ZodNumber;
        image: z.ZodString;
        skuAttributes: z.ZodRecord<z.ZodString, z.ZodString>;
        skuId: z.ZodNullable<z.ZodNumber>;
        orderId: z.ZodNullable<z.ZodNumber>;
        quantity: z.ZodNumber;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: Date;
        productId: number | null;
        image: string;
        quantity: number;
        productTranslations: {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }[];
        skuId: number | null;
        productName: string;
        skuPrice: number;
        skuAttributes: Record<string, string>;
        orderId: number | null;
    }, {
        id: number;
        createdAt: Date;
        productId: number | null;
        image: string;
        quantity: number;
        productTranslations: {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }[];
        skuId: number | null;
        productName: string;
        skuPrice: number;
        skuAttributes: Record<string, string>;
        orderId: number | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    shopId: number | null;
    addressShipId: number;
    paymentId: number | null;
    items: {
        id: number;
        createdAt: Date;
        productId: number | null;
        image: string;
        quantity: number;
        productTranslations: {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }[];
        skuId: number | null;
        productName: string;
        skuPrice: number;
        skuAttributes: Record<string, string>;
        orderId: number | null;
    }[];
}, {
    id: number;
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    shopId: number | null;
    addressShipId: number;
    paymentId: number | null;
    items: {
        id: number;
        createdAt: Date;
        productId: number | null;
        image: string;
        quantity: number;
        productTranslations: {
            id: number;
            name: string;
            description: string;
            languageId: string;
        }[];
        skuId: number | null;
        productName: string;
        skuPrice: number;
        skuAttributes: Record<string, string>;
        orderId: number | null;
    }[];
}>;
export declare const UpdateOrderStatusBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    status: z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
    addressShipId: z.ZodNumber;
    shopId: z.ZodNullable<z.ZodNumber>;
    paymentId: z.ZodNullable<z.ZodNumber>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "status">, "strip", z.ZodTypeAny, {
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
}, {
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
}>;
export declare const CancelOrderResSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    status: z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
    addressShipId: z.ZodNumber;
    shopId: z.ZodNullable<z.ZodNumber>;
    paymentId: z.ZodNullable<z.ZodNumber>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    shopId: number | null;
    addressShipId: number;
    paymentId: number | null;
}, {
    id: number;
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    shopId: number | null;
    addressShipId: number;
    paymentId: number | null;
}>;
export type GetOrderListResType = z.infer<typeof GetOrderListResSchema>;
export type GetOrderListQueryType = z.infer<typeof GetOrderListQuerySchema>;
export type GetOrderDetailResType = z.infer<typeof GetOrderDetailResSchema>;
export type CreateOrderBodyType = z.infer<typeof CreateOrderBodySchema>;
export type CancelOrderResType = z.infer<typeof CancelOrderResSchema>;
export type UpdateOrderStatusBodyType = z.infer<typeof UpdateOrderStatusBodySchema>;
export type UpdateOrderBodyType = z.infer<typeof UpdateOrderBodySchema>;
