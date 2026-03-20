declare const GetOrderListQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    keyword: string;
    role?: string | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    role: import("zod").ZodOptional<import("zod").ZodString>;
    keyword: import("zod").ZodString;
    status: import("zod").ZodOptional<import("zod").ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>>;
}, "strict", import("zod").ZodTypeAny>, {
    keyword: string;
    page?: number | undefined;
    limit?: number | undefined;
    role?: string | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}>;
export declare class GetOrderListQueryDTO extends GetOrderListQueryDTO_base {
}
declare const CreateOrderBodyDTO_base: import("nestjs-zod").ZodDto<{
    shopId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    addressShipId: number;
    deliveryId: number;
    cartItemIds: number[];
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    shopId: import("zod").ZodNumber;
    paymentMethod: import("zod").ZodNativeEnum<{
        COD: "COD";
        SEPAY: "SEPAY";
        WEB3: "WEB3";
    }>;
    addressShipId: import("zod").ZodNumber;
    deliveryId: import("zod").ZodNumber;
    cartItemIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
}, "strip", import("zod").ZodTypeAny, {
    shopId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    addressShipId: number;
    deliveryId: number;
    cartItemIds: number[];
}, {
    shopId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    addressShipId: number;
    deliveryId: number;
    cartItemIds: number[];
}>>, {
    shopId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
    addressShipId: number;
    deliveryId: number;
    cartItemIds: number[];
}[]>;
export declare class CreateOrderBodyDTO extends CreateOrderBodyDTO_base {
}
declare const UpdateOrderStatusBodyDTO_base: import("nestjs-zod").ZodDto<{
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    status: import("zod").ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>;
    addressShipId: import("zod").ZodNumber;
    shopId: import("zod").ZodNullable<import("zod").ZodNumber>;
    paymentId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "status">, "strip", import("zod").ZodTypeAny>, {
    status: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED";
}>;
export declare class UpdateOrderStatusBodyDTO extends UpdateOrderStatusBodyDTO_base {
}
export {};
