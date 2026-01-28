declare const CreateProductSearchDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    images: import("zod").ZodArray<import("zod").ZodString, "atleastone">;
    brandId: import("zod").ZodNumber;
    name: import("zod").ZodString;
    name_suggest: import("zod").ZodString;
    slugId: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    createdAt: import("zod").ZodOptional<import("zod").ZodString>;
    rating: import("zod").ZodDefault<import("zod").ZodNumber>;
    ratingCount: import("zod").ZodDefault<import("zod").ZodNumber>;
    categories: import("zod").ZodArray<import("zod").ZodNumber, "atleastone">;
    totalViews: import("zod").ZodDefault<import("zod").ZodNumber>;
    viewsToday: import("zod").ZodDefault<import("zod").ZodNumber>;
    salesToday: import("zod").ZodDefault<import("zod").ZodNumber>;
    status: import("zod").ZodOptional<import("zod").ZodEnum<["DRAFT", "PUBLISHED", "ARCHIVED"]>>;
    skus: import("zod").ZodArray<import("zod").ZodObject<{
        attributeName: import("zod").ZodString;
        attributeValue: import("zod").ZodString;
        price: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        price: number;
        attributeName: string;
        attributeValue: string;
    }, {
        price: number;
        attributeName: string;
        attributeValue: string;
    }>, "atleastone">;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class CreateProductSearchDTO extends CreateProductSearchDTO_base {
}
export {};
