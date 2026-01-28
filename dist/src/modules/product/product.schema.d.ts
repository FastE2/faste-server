import { z } from 'zod';
export declare const VariantSchema: z.ZodObject<{
    value: z.ZodString;
    options: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    value: string;
    options: string[];
}, {
    value: string;
    options: string[];
}>;
export declare const VariantsSchema: z.ZodEffects<z.ZodArray<z.ZodObject<{
    value: z.ZodString;
    options: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    value: string;
    options: string[];
}, {
    value: string;
    options: string[];
}>, "many">, {
    value: string;
    options: string[];
}[], {
    value: string;
    options: string[];
}[]>;
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    publishedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    totalViews: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    slugId: z.ZodString;
    createdById: z.ZodNumber;
    updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    likes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    weightGram: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    lengthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    widthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    heightCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    createdById: number;
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    totalViews: number;
    slugId: string;
    publishedAt?: string | null | undefined;
    updatedById?: number | null | undefined;
    deletedById?: number | null | undefined;
    deletedAt?: string | null | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    likes?: any[] | undefined;
    weightGram?: number | null | undefined;
    lengthCm?: number | null | undefined;
    widthCm?: number | null | undefined;
    heightCm?: number | null | undefined;
}, {
    id: number;
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    createdById: number;
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    publishedAt?: string | null | undefined;
    totalViews?: number | undefined;
    updatedById?: number | null | undefined;
    deletedById?: number | null | undefined;
    deletedAt?: string | null | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    likes?: any[] | undefined;
    weightGram?: number | null | undefined;
    lengthCm?: number | null | undefined;
    widthCm?: number | null | undefined;
    heightCm?: number | null | undefined;
}>;
export declare const GetAllProductPublicResSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        status: z.ZodNativeEnum<{
            DRAFT: "DRAFT";
            PUBLISHED: "PUBLISHED";
            ARCHIVED: "ARCHIVED";
        }>;
        createdById: z.ZodNumber;
        updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        weightGram: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        lengthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        widthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        heightCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        basePrice: z.ZodNumber;
        brandId: z.ZodNumber;
        publishedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        images: z.ZodArray<z.ZodString, "many">;
        variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
            value: z.ZodString;
            options: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            value: string;
            options: string[];
        }, {
            value: string;
            options: string[];
        }>, "many">, {
            value: string;
            options: string[];
        }[], {
            value: string;
            options: string[];
        }[]>;
        totalViews: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        slugId: z.ZodString;
        _count: z.ZodObject<{
            likes: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            likes: number;
        }, {
            likes: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        createdById: number;
        _count: {
            likes: number;
        };
        description: string;
        basePrice: number;
        brandId: number;
        images: string[];
        variants: {
            value: string;
            options: string[];
        }[];
        totalViews: number;
        slugId: string;
        updatedById?: number | null | undefined;
        deletedById?: number | null | undefined;
        deletedAt?: string | null | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        weightGram?: number | null | undefined;
        lengthCm?: number | null | undefined;
        widthCm?: number | null | undefined;
        heightCm?: number | null | undefined;
        publishedAt?: string | null | undefined;
    }, {
        id: number;
        name: string;
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        createdById: number;
        _count: {
            likes: number;
        };
        description: string;
        basePrice: number;
        brandId: number;
        images: string[];
        variants: {
            value: string;
            options: string[];
        }[];
        slugId: string;
        updatedById?: number | null | undefined;
        deletedById?: number | null | undefined;
        deletedAt?: string | null | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        weightGram?: number | null | undefined;
        lengthCm?: number | null | undefined;
        widthCm?: number | null | undefined;
        heightCm?: number | null | undefined;
        publishedAt?: string | null | undefined;
        totalViews?: number | undefined;
    }>;
    totalItem: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    data: {
        id: number;
        name: string;
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        createdById: number;
        _count: {
            likes: number;
        };
        description: string;
        basePrice: number;
        brandId: number;
        images: string[];
        variants: {
            value: string;
            options: string[];
        }[];
        totalViews: number;
        slugId: string;
        updatedById?: number | null | undefined;
        deletedById?: number | null | undefined;
        deletedAt?: string | null | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        weightGram?: number | null | undefined;
        lengthCm?: number | null | undefined;
        widthCm?: number | null | undefined;
        heightCm?: number | null | undefined;
        publishedAt?: string | null | undefined;
    };
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
}, {
    data: {
        id: number;
        name: string;
        status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
        createdById: number;
        _count: {
            likes: number;
        };
        description: string;
        basePrice: number;
        brandId: number;
        images: string[];
        variants: {
            value: string;
            options: string[];
        }[];
        slugId: string;
        updatedById?: number | null | undefined;
        deletedById?: number | null | undefined;
        deletedAt?: string | null | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
        weightGram?: number | null | undefined;
        lengthCm?: number | null | undefined;
        widthCm?: number | null | undefined;
        heightCm?: number | null | undefined;
        publishedAt?: string | null | undefined;
        totalViews?: number | undefined;
    };
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
}>;
export declare const GetParamSlugIdSchema: z.ZodObject<{
    slugId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    slugId: string;
}, {
    slugId: string;
}>;
export declare const CreateProductSchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    publishedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    totalViews: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    slugId: z.ZodString;
    createdById: z.ZodNumber;
    updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    likes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    weightGram: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    lengthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    widthCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    heightCm: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "name" | "status" | "description" | "basePrice" | "brandId" | "publishedAt" | "images" | "variants" | "slugId">, "strip", z.ZodTypeAny, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    publishedAt?: string | null | undefined;
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    publishedAt?: string | null | undefined;
}>;
export declare const CategorySchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    parentCategoryId: z.ZodNullable<z.ZodNumber>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    parentCategoryId: number | null;
}, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare const CreateProductBodySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    slugId: z.ZodString;
    categories: z.ZodArray<z.ZodNumber, "many">;
    skus: z.ZodArray<z.ZodObject<{
        attributes: z.ZodRecord<z.ZodString, z.ZodString>;
        image: z.ZodDefault<z.ZodString>;
        price: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        weightGram: z.ZodOptional<z.ZodNumber>;
        lengthCm: z.ZodOptional<z.ZodNumber>;
        widthCm: z.ZodOptional<z.ZodNumber>;
        heightCm: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }, {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>;
export declare const CreateProductInDBBodySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    slugId: z.ZodString;
    categories: z.ZodArray<z.ZodNumber, "many">;
    skus: z.ZodArray<z.ZodObject<Pick<{
        skuCode: z.ZodString;
        productId: z.ZodNumber;
        image: z.ZodDefault<z.ZodString>;
        price: z.ZodNumber;
        attributes: z.ZodRecord<z.ZodString, z.ZodString>;
        quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        sold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        weightGram: z.ZodOptional<z.ZodNumber>;
        lengthCm: z.ZodOptional<z.ZodNumber>;
        widthCm: z.ZodOptional<z.ZodNumber>;
        heightCm: z.ZodOptional<z.ZodNumber>;
        createdById: z.ZodNumber;
        updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "skuCode" | "image" | "price" | "attributes" | "quantity" | "weightGram" | "lengthCm" | "widthCm" | "heightCm">, "strip", z.ZodTypeAny, {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }, {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>;
export declare const GetProductsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    brandIds: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], unknown>>;
    categories: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodNumber, "many">, number[], unknown>>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    createdById: z.ZodOptional<z.ZodNumber>;
    orderBy: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "price", "sale"]>>;
}, "strip", z.ZodTypeAny, {
    orderBy: "asc" | "desc";
    page: number;
    limit: number;
    sortBy: "createdAt" | "price" | "sale";
    name?: string | undefined;
    brandIds?: number[] | undefined;
    categories?: number[] | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    createdById?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    name?: string | undefined;
    brandIds?: unknown;
    categories?: unknown;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    createdById?: number | undefined;
    orderBy?: "asc" | "desc" | undefined;
    sortBy?: "createdAt" | "price" | "sale" | undefined;
}>;
export declare const UpdateProductBodySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    slugId: z.ZodString;
    categories: z.ZodArray<z.ZodNumber, "many">;
    skus: z.ZodArray<z.ZodObject<Pick<{
        skuCode: z.ZodString;
        productId: z.ZodNumber;
        image: z.ZodDefault<z.ZodString>;
        price: z.ZodNumber;
        attributes: z.ZodRecord<z.ZodString, z.ZodString>;
        quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        sold: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        weightGram: z.ZodOptional<z.ZodNumber>;
        lengthCm: z.ZodOptional<z.ZodNumber>;
        widthCm: z.ZodOptional<z.ZodNumber>;
        heightCm: z.ZodOptional<z.ZodNumber>;
        createdById: z.ZodNumber;
        updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "skuCode" | "image" | "price" | "attributes" | "quantity" | "weightGram" | "lengthCm" | "widthCm" | "heightCm">, "strip", z.ZodTypeAny, {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }, {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        skuCode: string;
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>;
export type GetProductsQueryType = z.infer<typeof GetProductsQuerySchema>;
export type UpdateProductBodyType = z.infer<typeof UpdateProductBodySchema>;
export type CreateProductBodyType = z.infer<typeof CreateProductBodySchema>;
export declare const UpdateCategoryBodySchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    status: z.ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: z.ZodString;
    basePrice: z.ZodNumber;
    brandId: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    variants: z.ZodEffects<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        value: string;
        options: string[];
    }, {
        value: string;
        options: string[];
    }>, "many">, {
        value: string;
        options: string[];
    }[], {
        value: string;
        options: string[];
    }[]>;
    slugId: z.ZodString;
    categories: z.ZodArray<z.ZodNumber, "many">;
    skus: z.ZodArray<z.ZodObject<{
        attributes: z.ZodRecord<z.ZodString, z.ZodString>;
        image: z.ZodDefault<z.ZodString>;
        price: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        weightGram: z.ZodOptional<z.ZodNumber>;
        lengthCm: z.ZodOptional<z.ZodNumber>;
        widthCm: z.ZodOptional<z.ZodNumber>;
        heightCm: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }, {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        image: string;
        price: number;
        attributes: Record<string, string>;
        quantity: number;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}, {
    name: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    description: string;
    basePrice: number;
    brandId: number;
    images: string[];
    variants: {
        value: string;
        options: string[];
    }[];
    slugId: string;
    skus: {
        price: number;
        attributes: Record<string, string>;
        image?: string | undefined;
        quantity?: number | undefined;
        weightGram?: number | undefined;
        lengthCm?: number | undefined;
        widthCm?: number | undefined;
        heightCm?: number | undefined;
    }[];
    categories: number[];
}>;
export type CreateProductInDBBodyType = z.infer<typeof CreateProductInDBBodySchema>;
export type VariantsType = z.infer<typeof VariantsSchema>;
