declare const UpdateFlashSaleStatusBodyDTO_base: import("nestjs-zod").ZodDto<{
    status: "CANCELLED" | "DRAFT" | "SCHEDULED";
}, import("zod").ZodObjectDef<{
    status: import("zod").ZodEnum<["DRAFT", "SCHEDULED", "CANCELLED"]>;
}, "strip", import("zod").ZodTypeAny>, {
    status: "CANCELLED" | "DRAFT" | "SCHEDULED";
}>;
export declare class UpdateFlashSaleStatusBodyDTO extends UpdateFlashSaleStatusBodyDTO_base {
}
declare const FlashSaleListQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    type?: string | undefined;
    status?: string | undefined;
    createdById?: number | undefined;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    type: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodString>;
    createdById: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strict", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
    type?: string | undefined;
    status?: string | undefined;
    createdById?: number | undefined;
}>;
export declare class FlashSaleListQueryDTO extends FlashSaleListQueryDTO_base {
}
declare const GetParamsFlashSaleDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    itemId: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    itemId: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    itemId: number;
}>;
export declare class GetParamsFlashSaleDTO extends GetParamsFlashSaleDTO_base {
}
declare const FlashSaleListSellerQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    status?: string | undefined;
}, import("zod").ZodObjectDef<Omit<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    type: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodString>;
    createdById: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "type" | "createdById">, "strict", import("zod").ZodTypeAny>, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare class FlashSaleListSellerQueryDTO extends FlashSaleListSellerQueryDTO_base {
}
declare const CreateFlashSaleBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    isDraft: boolean;
}, import("zod").ZodObjectDef<Omit<{
    name: import("zod").ZodString;
    type: import("zod").ZodOptional<import("zod").ZodEnum<["SELLER", "PLATFORM"]>>;
    description: import("zod").ZodString;
    image: import("zod").ZodString;
    startAt: import("zod").ZodDate;
    endAt: import("zod").ZodDate;
    isDraft: import("zod").ZodDefault<import("zod").ZodBoolean>;
}, "type">, "strip", import("zod").ZodTypeAny>, {
    name: string;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    isDraft?: boolean | undefined;
}>;
export declare class CreateFlashSaleBodyDTO extends CreateFlashSaleBodyDTO_base {
}
declare const CreateFlashSaleItemBodyDTO_base: import("nestjs-zod").ZodDto<{
    skuId: number;
    flashPrice: number;
    stock: number;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<Pick<{
    flashSaleId: import("zod").ZodNumber;
    skuId: import("zod").ZodNumber;
    flashPrice: import("zod").ZodNumber;
    stock: import("zod").ZodDefault<import("zod").ZodNumber>;
    sold: import("zod").ZodDefault<import("zod").ZodNumber>;
    createdById: import("zod").ZodNumber;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "skuId" | "flashPrice" | "stock">, "strip", import("zod").ZodTypeAny, {
    skuId: number;
    flashPrice: number;
    stock: number;
}, {
    skuId: number;
    flashPrice: number;
    stock?: number | undefined;
}>>, {
    skuId: number;
    flashPrice: number;
    stock?: number | undefined;
}[]>;
export declare class CreateFlashSaleItemBodyDTO extends CreateFlashSaleItemBodyDTO_base {
}
declare const UpdateFlashSaleItemBodyDTO_base: import("nestjs-zod").ZodDto<{
    skuId?: number | undefined;
    flashPrice?: number | undefined;
    stock?: number | undefined;
}, import("zod").ZodObjectDef<{
    skuId: import("zod").ZodOptional<import("zod").ZodNumber>;
    flashPrice: import("zod").ZodOptional<import("zod").ZodNumber>;
    stock: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
}, "strip", import("zod").ZodTypeAny>, {
    skuId?: number | undefined;
    flashPrice?: number | undefined;
    stock?: number | undefined;
}>;
export declare class UpdateFlashSaleItemBodyDTO extends UpdateFlashSaleItemBodyDTO_base {
}
export {};
