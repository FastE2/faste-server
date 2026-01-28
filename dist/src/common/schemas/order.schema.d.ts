import { z } from 'zod';
export declare const OrderStatusSchema: z.ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
export declare const OrderSchema: z.ZodObject<{
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
export declare const ProductSKUSnapshotSchema: z.ZodObject<{
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
}>;
export declare const OrderIncludeProductSKUSnapshotSchema: z.ZodObject<{
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
export type OrderType = z.infer<typeof OrderSchema>;
export type OrderIncludeProductSKUSnapshotType = z.infer<typeof OrderIncludeProductSKUSnapshotSchema>;
