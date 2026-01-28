import { z } from 'zod';
export declare const WidgetSchema: z.ZodObject<{
    id: z.ZodNumber;
    templateId: z.ZodNumber;
    refViewId: z.ZodNumber;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodNativeEnum<{
        TITLE: "TITLE";
        BANNER_CAROUSEL: "BANNER_CAROUSEL";
        BANNER_GRID4: "BANNER_GRID4";
        CATEGORIES_GRID: "CATEGORIES_GRID";
        CATEGORIES_CAROUSEL: "CATEGORIES_CAROUSEL";
        PRODUCTS_ALL: "PRODUCTS_ALL";
        PRODUCTS_RATING: "PRODUCTS_RATING";
        PRODUCTS_GRID: "PRODUCTS_GRID";
        STORIES_CAROUSEL: "STORIES_CAROUSEL";
        FLASH_SALE: "FLASH_SALE";
        DISCOUNT: "DISCOUNT";
        COLLECTIONS_CAROUSEL: "COLLECTIONS_CAROUSEL";
        COLLECTIONS_VERTICAL: "COLLECTIONS_VERTICAL";
    }>;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    widgetIndex: z.ZodNumber;
    viewConfig: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: number;
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    isVisible: boolean;
    widgetIndex: number;
    name?: string | null | undefined;
    viewConfig?: any;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    id: number;
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    widgetIndex: number;
    name?: string | null | undefined;
    isVisible?: boolean | undefined;
    viewConfig?: any;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const CreateWidgetBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    templateId: z.ZodNumber;
    refViewId: z.ZodNumber;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodNativeEnum<{
        TITLE: "TITLE";
        BANNER_CAROUSEL: "BANNER_CAROUSEL";
        BANNER_GRID4: "BANNER_GRID4";
        CATEGORIES_GRID: "CATEGORIES_GRID";
        CATEGORIES_CAROUSEL: "CATEGORIES_CAROUSEL";
        PRODUCTS_ALL: "PRODUCTS_ALL";
        PRODUCTS_RATING: "PRODUCTS_RATING";
        PRODUCTS_GRID: "PRODUCTS_GRID";
        STORIES_CAROUSEL: "STORIES_CAROUSEL";
        FLASH_SALE: "FLASH_SALE";
        DISCOUNT: "DISCOUNT";
        COLLECTIONS_CAROUSEL: "COLLECTIONS_CAROUSEL";
        COLLECTIONS_VERTICAL: "COLLECTIONS_VERTICAL";
    }>;
    isVisible: z.ZodDefault<z.ZodBoolean>;
    widgetIndex: z.ZodNumber;
    viewConfig: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "name" | "type" | "templateId" | "refViewId" | "isVisible" | "widgetIndex" | "viewConfig">, "strict", z.ZodTypeAny, {
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    isVisible: boolean;
    widgetIndex: number;
    name?: string | null | undefined;
    viewConfig?: any;
}, {
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    widgetIndex: number;
    name?: string | null | undefined;
    isVisible?: boolean | undefined;
    viewConfig?: any;
}>;
export declare const UpdateWidgetBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    type: z.ZodOptional<z.ZodNativeEnum<{
        TITLE: "TITLE";
        BANNER_CAROUSEL: "BANNER_CAROUSEL";
        BANNER_GRID4: "BANNER_GRID4";
        CATEGORIES_GRID: "CATEGORIES_GRID";
        CATEGORIES_CAROUSEL: "CATEGORIES_CAROUSEL";
        PRODUCTS_ALL: "PRODUCTS_ALL";
        PRODUCTS_RATING: "PRODUCTS_RATING";
        PRODUCTS_GRID: "PRODUCTS_GRID";
        STORIES_CAROUSEL: "STORIES_CAROUSEL";
        FLASH_SALE: "FLASH_SALE";
        DISCOUNT: "DISCOUNT";
        COLLECTIONS_CAROUSEL: "COLLECTIONS_CAROUSEL";
        COLLECTIONS_VERTICAL: "COLLECTIONS_VERTICAL";
    }>>;
    templateId: z.ZodOptional<z.ZodNumber>;
    refViewId: z.ZodOptional<z.ZodNumber>;
    isVisible: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    widgetIndex: z.ZodOptional<z.ZodNumber>;
    viewConfig: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodAny>>>;
}, "strict", z.ZodTypeAny, {
    name?: string | null | undefined;
    type?: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL" | undefined;
    templateId?: number | undefined;
    refViewId?: number | undefined;
    isVisible?: boolean | undefined;
    widgetIndex?: number | undefined;
    viewConfig?: any;
}, {
    name?: string | null | undefined;
    type?: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL" | undefined;
    templateId?: number | undefined;
    refViewId?: number | undefined;
    isVisible?: boolean | undefined;
    widgetIndex?: number | undefined;
    viewConfig?: any;
}>;
export declare const UpdateManyWidgetsSchema: z.ZodObject<{
    widgets: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        widgetIndex: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodNativeEnum<{
            TITLE: "TITLE";
            BANNER_CAROUSEL: "BANNER_CAROUSEL";
            BANNER_GRID4: "BANNER_GRID4";
            CATEGORIES_GRID: "CATEGORIES_GRID";
            CATEGORIES_CAROUSEL: "CATEGORIES_CAROUSEL";
            PRODUCTS_ALL: "PRODUCTS_ALL";
            PRODUCTS_RATING: "PRODUCTS_RATING";
            PRODUCTS_GRID: "PRODUCTS_GRID";
            STORIES_CAROUSEL: "STORIES_CAROUSEL";
            FLASH_SALE: "FLASH_SALE";
            DISCOUNT: "DISCOUNT";
            COLLECTIONS_CAROUSEL: "COLLECTIONS_CAROUSEL";
            COLLECTIONS_VERTICAL: "COLLECTIONS_VERTICAL";
        }>;
        isVisible: z.ZodOptional<z.ZodBoolean>;
        viewConfig: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }, {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    widgets: {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }[];
}, {
    widgets: {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }[];
}>;
export type CreateWidgetBodyType = z.infer<typeof CreateWidgetBodySchema>;
export type UpdateWidgetBodyType = z.infer<typeof UpdateWidgetBodySchema>;
export type UpdateManyWidgetsType = z.infer<typeof UpdateManyWidgetsSchema>;
