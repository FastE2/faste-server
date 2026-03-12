declare const GetOrderListQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    role?: string | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}, import("zod").ZodObjectDef<{
    role: import("zod").ZodOptional<import("zod").ZodString>;
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    status: import("zod").ZodOptional<import("zod").ZodEnum<["PENDING_CONFIRMATION", "PROCESSING", "PENDING_PAYMENT", "PENDING_PICKUP", "PENDING_DELIVERY", "DELIVERED", "RECEIVED", "RETURNED", "CANCELLED"]>>;
}, "strict", import("zod").ZodTypeAny>, {
    role?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    status?: "PENDING_CONFIRMATION" | "PROCESSING" | "PENDING_PAYMENT" | "PENDING_PICKUP" | "PENDING_DELIVERY" | "DELIVERED" | "RECEIVED" | "RETURNED" | "CANCELLED" | undefined;
}>;
export declare class GetOrderListQueryDTO extends GetOrderListQueryDTO_base {
}
declare const CreateOrderBodyDTO_base: import("nestjs-zod").ZodDto<{
    shopId: number;
    addressShipId: number;
    deliveryId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
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
}>>, {
    shopId: number;
    addressShipId: number;
    deliveryId: number;
    paymentMethod: "COD" | "SEPAY" | "WEB3";
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
