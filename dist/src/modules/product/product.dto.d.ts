declare const CreateProductBodyDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    name: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    brandId: import("zod").ZodNumber;
    images: import("zod").ZodArray<import("zod").ZodString, "many">;
    variants: import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodObject<{
        value: import("zod").ZodString;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
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
    slugId: import("zod").ZodString;
    categories: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    skus: import("zod").ZodArray<import("zod").ZodObject<{
        attributes: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
        image: import("zod").ZodDefault<import("zod").ZodString>;
        price: import("zod").ZodNumber;
        quantity: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        weightGram: import("zod").ZodOptional<import("zod").ZodNumber>;
        lengthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        widthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        heightCm: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strict", import("zod").ZodTypeAny, {
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
}>>, {
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
export declare class CreateProductBodyDTO extends CreateProductBodyDTO_base {
}
declare const GetParamSlugIdDTO_base: import("nestjs-zod").ZodDto<{
    slugId: string;
}, import("zod").ZodObjectDef<{
    slugId: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    slugId: string;
}>;
export declare class GetParamSlugIdDTO extends GetParamSlugIdDTO_base {
}
declare const UpdateCategoryBodyDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    name: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    brandId: import("zod").ZodNumber;
    images: import("zod").ZodArray<import("zod").ZodString, "many">;
    variants: import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodObject<{
        value: import("zod").ZodString;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
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
    slugId: import("zod").ZodString;
    categories: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    skus: import("zod").ZodArray<import("zod").ZodObject<{
        attributes: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
        image: import("zod").ZodDefault<import("zod").ZodString>;
        price: import("zod").ZodNumber;
        quantity: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        weightGram: import("zod").ZodOptional<import("zod").ZodNumber>;
        lengthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        widthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        heightCm: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strict", import("zod").ZodTypeAny, {
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
}>>, {
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
export declare class UpdateCategoryBodyDTO extends UpdateCategoryBodyDTO_base {
}
declare const UpdateProductBodyDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    name: import("zod").ZodString;
    status: import("zod").ZodNativeEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>;
    description: import("zod").ZodString;
    basePrice: import("zod").ZodNumber;
    brandId: import("zod").ZodNumber;
    images: import("zod").ZodArray<import("zod").ZodString, "many">;
    variants: import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodObject<{
        value: import("zod").ZodString;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
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
    slugId: import("zod").ZodString;
    categories: import("zod").ZodArray<import("zod").ZodNumber, "many">;
    skus: import("zod").ZodArray<import("zod").ZodObject<Pick<{
        skuCode: import("zod").ZodString;
        productId: import("zod").ZodNumber;
        image: import("zod").ZodDefault<import("zod").ZodString>;
        price: import("zod").ZodNumber;
        attributes: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>;
        quantity: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        sold: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        weightGram: import("zod").ZodOptional<import("zod").ZodNumber>;
        lengthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        widthCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        heightCm: import("zod").ZodOptional<import("zod").ZodNumber>;
        createdById: import("zod").ZodNumber;
        updatedById: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        deletedById: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        deletedAt: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        createdAt: import("zod").ZodOptional<import("zod").ZodString>;
        updatedAt: import("zod").ZodOptional<import("zod").ZodString>;
    }, "skuCode" | "image" | "price" | "attributes" | "quantity" | "weightGram" | "lengthCm" | "widthCm" | "heightCm">, "strip", import("zod").ZodTypeAny, {
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
}, "strict", import("zod").ZodTypeAny, {
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
}>>, {
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
export declare class UpdateProductBodyDTO extends UpdateProductBodyDTO_base {
}
declare const GetProductsQueryDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    brandIds: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodNumber, "many">, number[], unknown>>;
    categories: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodNumber, "many">, number[], unknown>>;
    minPrice: import("zod").ZodOptional<import("zod").ZodNumber>;
    maxPrice: import("zod").ZodOptional<import("zod").ZodNumber>;
    createdById: import("zod").ZodOptional<import("zod").ZodNumber>;
    orderBy: import("zod").ZodDefault<import("zod").ZodEnum<["asc", "desc"]>>;
    sortBy: import("zod").ZodDefault<import("zod").ZodEnum<["createdAt", "price", "sale"]>>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class GetProductsQueryDTO extends GetProductsQueryDTO_base {
}
declare const GetAllProductPublicResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    data: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        name: import("zod").ZodString;
        status: import("zod").ZodNativeEnum<{
            DRAFT: "DRAFT";
            PUBLISHED: "PUBLISHED";
            ARCHIVED: "ARCHIVED";
        }>;
        createdById: import("zod").ZodNumber;
        updatedById: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        deletedById: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        deletedAt: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        createdAt: import("zod").ZodOptional<import("zod").ZodString>;
        updatedAt: import("zod").ZodOptional<import("zod").ZodString>;
        description: import("zod").ZodString;
        weightGram: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        lengthCm: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        widthCm: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        heightCm: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodNumber>>;
        basePrice: import("zod").ZodNumber;
        brandId: import("zod").ZodNumber;
        publishedAt: import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>;
        images: import("zod").ZodArray<import("zod").ZodString, "many">;
        variants: import("zod").ZodEffects<import("zod").ZodArray<import("zod").ZodObject<{
            value: import("zod").ZodString;
            options: import("zod").ZodArray<import("zod").ZodString, "many">;
        }, "strip", import("zod").ZodTypeAny, {
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
        totalViews: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        slugId: import("zod").ZodString;
        _count: import("zod").ZodObject<{
            likes: import("zod").ZodNumber;
        }, "strip", import("zod").ZodTypeAny, {
            likes: number;
        }, {
            likes: number;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
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
    totalItem: import("zod").ZodNumber;
    page: import("zod").ZodNumber;
    limit: import("zod").ZodNumber;
    totalPage: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class GetAllProductPublicResDTO extends GetAllProductPublicResDTO_base {
}
export {};
