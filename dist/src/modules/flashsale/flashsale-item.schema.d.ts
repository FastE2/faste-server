import { z } from 'zod';
export declare const FlashSaleItemSchema: z.ZodObject<{
    flashSaleId: z.ZodNumber;
    skuId: z.ZodNumber;
    flashPrice: z.ZodNumber;
    stock: z.ZodDefault<z.ZodNumber>;
    sold: z.ZodDefault<z.ZodNumber>;
    createdById: z.ZodNumber;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdById: number;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    sold: number;
    skuId: number;
    flashSaleId: number;
    flashPrice: number;
    stock: number;
}, {
    createdById: number;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    skuId: number;
    flashSaleId: number;
    flashPrice: number;
    stock?: number | undefined;
    sold?: number | undefined;
}>;
export declare const CreateFlashSaleItemBodySchema: z.ZodObject<Pick<{
    flashSaleId: z.ZodNumber;
    skuId: z.ZodNumber;
    flashPrice: z.ZodNumber;
    stock: z.ZodDefault<z.ZodNumber>;
    sold: z.ZodDefault<z.ZodNumber>;
    createdById: z.ZodNumber;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "skuId" | "flashPrice" | "stock">, "strip", z.ZodTypeAny, {
    skuId: number;
    flashPrice: number;
    stock: number;
}, {
    skuId: number;
    flashPrice: number;
    stock?: number | undefined;
}>;
export declare const GetParamsFlashSaleSchema: z.ZodObject<{
    id: z.ZodNumber;
    itemId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    itemId: number;
}, {
    id: number;
    itemId: number;
}>;
export declare const UpdateFlashSaleItemBodySchema: z.ZodObject<{
    skuId: z.ZodOptional<z.ZodNumber>;
    flashPrice: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    skuId?: number | undefined;
    flashPrice?: number | undefined;
    stock?: number | undefined;
}, {
    skuId?: number | undefined;
    flashPrice?: number | undefined;
    stock?: number | undefined;
}>;
export type CreateFlashSaleItemBodyType = z.infer<typeof CreateFlashSaleItemBodySchema>;
export type UpdateFlashSaleItemBodyType = z.infer<typeof UpdateFlashSaleItemBodySchema>;
