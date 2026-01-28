import { z } from 'zod';
export declare const CartItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    quantity: z.ZodNumber;
    skuId: z.ZodNumber;
    userId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    quantity: number;
    skuId: number;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    quantity: number;
    skuId: number;
}>;
export declare const CartItemDetailSchema: z.ZodObject<{
    shop: z.ZodObject<Pick<{
        id: z.ZodNumber;
        email: z.ZodString;
        name: z.ZodString;
        password: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        gender: z.ZodNullable<z.ZodNativeEnum<{
            MALE: string;
            FEMALE: string;
            OTHER: string;
        }>>;
        roleId: z.ZodNumber;
        totpSecret: z.ZodNullable<z.ZodString>;
        dateOfBirth: z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>;
        createdById: z.ZodNullable<z.ZodNumber>;
        updatedById: z.ZodNullable<z.ZodNumber>;
        deletedById: z.ZodNullable<z.ZodNumber>;
        deletedAt: z.ZodNullable<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "id" | "name" | "avatar">, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        avatar: string | null;
    }, {
        id: number;
        name: string;
        avatar: string | null;
    }>;
    cartItems: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        userId: z.ZodNumber;
        quantity: z.ZodNumber;
        skuId: z.ZodNumber;
        sku: z.ZodObject<Omit<{
            createdById: z.ZodNumber;
            updatedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            deletedById: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            deletedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            createdAt: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodString>;
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
            product: z.ZodObject<Omit<{
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
                likes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                productTranslations: z.ZodArray<z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    productId: z.ZodNumber;
                    name: z.ZodString;
                    description: z.ZodString;
                    languageId: z.ZodString;
                    createdById: z.ZodNullable<z.ZodNumber>;
                    updatedById: z.ZodNullable<z.ZodNumber>;
                    deletedById: z.ZodNullable<z.ZodNumber>;
                    deletedAt: z.ZodNullable<z.ZodDate>;
                    createdAt: z.ZodDate;
                    updatedAt: z.ZodDate;
                }, "createdById" | "updatedById" | "deletedById" | "deletedAt" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }, {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }>, "many">;
            }, "createdById" | "updatedById" | "deletedById" | "deletedAt" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
                id: number;
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
                totalViews: number;
                slugId: string;
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                likes?: any[] | undefined;
            }, {
                id: number;
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
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                totalViews?: number | undefined;
                likes?: any[] | undefined;
            }>;
        }, "createdById" | "updatedById" | "deletedById" | "deletedAt" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
            product: {
                id: number;
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
                totalViews: number;
                slugId: string;
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            image: string;
            price: number;
            attributes: Record<string, string>;
            quantity: number;
            sold: number;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        }, {
            product: {
                id: number;
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
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                totalViews?: number | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            price: number;
            attributes: Record<string, string>;
            image?: string | undefined;
            quantity?: number | undefined;
            sold?: number | undefined;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        quantity: number;
        skuId: number;
        sku: {
            product: {
                id: number;
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
                totalViews: number;
                slugId: string;
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            image: string;
            price: number;
            attributes: Record<string, string>;
            quantity: number;
            sold: number;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        };
    }, {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        quantity: number;
        skuId: number;
        sku: {
            product: {
                id: number;
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
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                totalViews?: number | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            price: number;
            attributes: Record<string, string>;
            image?: string | undefined;
            quantity?: number | undefined;
            sold?: number | undefined;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    shop: {
        id: number;
        name: string;
        avatar: string | null;
    };
    cartItems: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        quantity: number;
        skuId: number;
        sku: {
            product: {
                id: number;
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
                totalViews: number;
                slugId: string;
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            image: string;
            price: number;
            attributes: Record<string, string>;
            quantity: number;
            sold: number;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        };
    }[];
}, {
    shop: {
        id: number;
        name: string;
        avatar: string | null;
    };
    cartItems: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        quantity: number;
        skuId: number;
        sku: {
            product: {
                id: number;
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
                productTranslations: {
                    id: number;
                    name: string;
                    description: string;
                    productId: number;
                    languageId: string;
                }[];
                weightGram?: number | null | undefined;
                lengthCm?: number | null | undefined;
                widthCm?: number | null | undefined;
                heightCm?: number | null | undefined;
                publishedAt?: string | null | undefined;
                totalViews?: number | undefined;
                likes?: any[] | undefined;
            };
            skuCode: string;
            productId: number;
            price: number;
            attributes: Record<string, string>;
            image?: string | undefined;
            quantity?: number | undefined;
            sold?: number | undefined;
            weightGram?: number | undefined;
            lengthCm?: number | undefined;
            widthCm?: number | undefined;
            heightCm?: number | undefined;
        };
    }[];
}>;
export declare const AddToCartBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    quantity: z.ZodNumber;
    skuId: z.ZodNumber;
    userId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "quantity" | "skuId">, "strict", z.ZodTypeAny, {
    quantity: number;
    skuId: number;
}, {
    quantity: number;
    skuId: number;
}>;
export declare const UpdateCartItemBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    quantity: z.ZodNumber;
    skuId: z.ZodNumber;
    userId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "quantity" | "skuId">, "strict", z.ZodTypeAny, {
    quantity: number;
    skuId: number;
}, {
    quantity: number;
    skuId: number;
}>;
export declare const DeleteCartBodySchema: z.ZodObject<{
    cartItemIds: z.ZodArray<z.ZodNumber, "many">;
}, "strict", z.ZodTypeAny, {
    cartItemIds: number[];
}, {
    cartItemIds: number[];
}>;
export type CartItemDetailType = z.infer<typeof CartItemDetailSchema>;
export type AddToCartBodyType = z.infer<typeof AddToCartBodySchema>;
export type UpdateCartItemBodyType = z.infer<typeof UpdateCartItemBodySchema>;
