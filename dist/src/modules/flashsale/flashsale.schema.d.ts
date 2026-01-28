import { z } from 'zod';
export declare const FlashSaleStatusEnum: z.ZodEnum<["DRAFT", "SCHEDULED", "LIVE", "ENDED", "CANCELLED"]>;
export declare const FlashSaleTypeEnum: z.ZodEnum<["SELLER", "PLATFORM"]>;
export declare const FlashSaleSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    image: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "LIVE", "ENDED", "CANCELLED"]>>;
    type: z.ZodOptional<z.ZodEnum<["SELLER", "PLATFORM"]>>;
    startAt: z.ZodDate;
    endAt: z.ZodDate;
    createdById: z.ZodNumber;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    name: string;
    createdById: number;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    status?: "CANCELLED" | "DRAFT" | "SCHEDULED" | "LIVE" | "ENDED" | undefined;
    type?: "SELLER" | "PLATFORM" | undefined;
}, {
    name: string;
    createdById: number;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    status?: "CANCELLED" | "DRAFT" | "SCHEDULED" | "LIVE" | "ENDED" | undefined;
    type?: "SELLER" | "PLATFORM" | undefined;
}>;
export declare const CreateFlashSaleBodySchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<["SELLER", "PLATFORM"]>>;
    description: z.ZodString;
    image: z.ZodString;
    startAt: z.ZodDate;
    endAt: z.ZodDate;
    isDraft: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    isDraft: boolean;
    type?: "SELLER" | "PLATFORM" | undefined;
}, {
    name: string;
    description: string;
    image: string;
    startAt: Date;
    endAt: Date;
    type?: "SELLER" | "PLATFORM" | undefined;
    isDraft?: boolean | undefined;
}>;
export declare const UpdateFlashSaleBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<["SELLER", "PLATFORM"]>>>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    startAt: z.ZodOptional<z.ZodDate>;
    endAt: z.ZodOptional<z.ZodDate>;
    isDraft: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    type?: "SELLER" | "PLATFORM" | undefined;
    description?: string | undefined;
    image?: string | undefined;
    startAt?: Date | undefined;
    endAt?: Date | undefined;
    isDraft?: boolean | undefined;
}, {
    name?: string | undefined;
    type?: "SELLER" | "PLATFORM" | undefined;
    description?: string | undefined;
    image?: string | undefined;
    startAt?: Date | undefined;
    endAt?: Date | undefined;
    isDraft?: boolean | undefined;
}>;
export declare const UpdateFlashSaleStatusBodySchema: z.ZodObject<{
    status: z.ZodEnum<["DRAFT", "SCHEDULED", "CANCELLED"]>;
}, "strip", z.ZodTypeAny, {
    status: "CANCELLED" | "DRAFT" | "SCHEDULED";
}, {
    status: "CANCELLED" | "DRAFT" | "SCHEDULED";
}>;
export declare const FlashSaleListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    type: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    createdById: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    type?: string | undefined;
    status?: string | undefined;
    createdById?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    type?: string | undefined;
    status?: string | undefined;
    createdById?: number | undefined;
}>;
export type FlashSaleListQueryType = z.infer<typeof FlashSaleListQuerySchema>;
export type FlashSaleType = z.infer<typeof FlashSaleSchema>;
export type CreateFlashSaleBodyType = z.infer<typeof CreateFlashSaleBodySchema>;
export type UpdateFlashSaleBodyType = z.infer<typeof UpdateFlashSaleBodySchema>;
export type UpdateFlashSaleStatusBodyType = z.infer<typeof UpdateFlashSaleStatusBodySchema>;
