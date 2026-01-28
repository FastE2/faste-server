import { z } from 'zod';
export declare const SkuSchema: z.ZodObject<{
    attributeName: z.ZodString;
    attributeValue: z.ZodString;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    price: number;
    attributeName: string;
    attributeValue: string;
}, {
    price: number;
    attributeName: string;
    attributeValue: string;
}>;
export declare const CreateProductSearchSchema: z.ZodObject<{
    id: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "atleastone">;
    brandId: z.ZodNumber;
    name: z.ZodString;
    name_suggest: z.ZodString;
    slugId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodString>;
    rating: z.ZodDefault<z.ZodNumber>;
    ratingCount: z.ZodDefault<z.ZodNumber>;
    categories: z.ZodArray<z.ZodNumber, "atleastone">;
    totalViews: z.ZodDefault<z.ZodNumber>;
    viewsToday: z.ZodDefault<z.ZodNumber>;
    salesToday: z.ZodDefault<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>>;
    skus: z.ZodArray<z.ZodObject<{
        attributeName: z.ZodString;
        attributeValue: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        price: number;
        attributeName: string;
        attributeValue: string;
    }, {
        price: number;
        attributeName: string;
        attributeValue: string;
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    brandId: number;
    images: [string, ...string[]];
    rating: number;
    ratingCount: number;
    totalViews: number;
    slugId: string;
    skus: [{
        price: number;
        attributeName: string;
        attributeValue: string;
    }, ...{
        price: number;
        attributeName: string;
        attributeValue: string;
    }[]];
    categories: [number, ...number[]];
    name_suggest: string;
    viewsToday: number;
    salesToday: number;
    description?: string | undefined;
    createdAt?: string | undefined;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
}, {
    id: number;
    name: string;
    brandId: number;
    images: [string, ...string[]];
    slugId: string;
    skus: [{
        price: number;
        attributeName: string;
        attributeValue: string;
    }, ...{
        price: number;
        attributeName: string;
        attributeValue: string;
    }[]];
    categories: [number, ...number[]];
    name_suggest: string;
    description?: string | undefined;
    createdAt?: string | undefined;
    rating?: number | undefined;
    ratingCount?: number | undefined;
    totalViews?: number | undefined;
    viewsToday?: number | undefined;
    salesToday?: number | undefined;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined;
}>;
export type CreateProductSearchType = z.infer<typeof CreateProductSearchSchema>;
