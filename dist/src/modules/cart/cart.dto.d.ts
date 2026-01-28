declare const CartItemResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    quantity: number;
    skuId: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    quantity: import("zod").ZodNumber;
    skuId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    quantity: number;
    skuId: number;
}>;
export declare class CartItemResDTO extends CartItemResDTO_base {
}
declare const AddToCartBodyDTO_base: import("nestjs-zod").ZodDto<{
    quantity: number;
    skuId: number;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    quantity: import("zod").ZodNumber;
    skuId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "quantity" | "skuId">, "strict", import("zod").ZodTypeAny>, {
    quantity: number;
    skuId: number;
}>;
export declare class AddToCartBodyDTO extends AddToCartBodyDTO_base {
}
declare const UpdateCartItemBodyDTO_base: import("nestjs-zod").ZodDto<{
    quantity: number;
    skuId: number;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    quantity: import("zod").ZodNumber;
    skuId: import("zod").ZodNumber;
    userId: import("zod").ZodNumber;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "quantity" | "skuId">, "strict", import("zod").ZodTypeAny>, {
    quantity: number;
    skuId: number;
}>;
export declare class UpdateCartItemBodyDTO extends UpdateCartItemBodyDTO_base {
}
export {};
