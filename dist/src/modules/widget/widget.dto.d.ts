declare const CreateWidgetBodyDTO_base: import("nestjs-zod").ZodDto<{
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    isVisible: boolean;
    widgetIndex: number;
    name?: string | null | undefined;
    viewConfig?: any;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    templateId: import("zod").ZodNumber;
    refViewId: import("zod").ZodNumber;
    name: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    type: import("zod").ZodNativeEnum<{
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
    isVisible: import("zod").ZodDefault<import("zod").ZodBoolean>;
    widgetIndex: import("zod").ZodNumber;
    viewConfig: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodAny>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, "name" | "type" | "templateId" | "refViewId" | "isVisible" | "widgetIndex" | "viewConfig">, "strict", import("zod").ZodTypeAny>, {
    type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
    templateId: number;
    refViewId: number;
    widgetIndex: number;
    name?: string | null | undefined;
    isVisible?: boolean | undefined;
    viewConfig?: any;
}>;
export declare class CreateWidgetBodyDTO extends CreateWidgetBodyDTO_base {
}
declare const UpdateWidgetBodyDTO_base: import("nestjs-zod").ZodDto<{
    name?: string | null | undefined;
    type?: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL" | undefined;
    templateId?: number | undefined;
    refViewId?: number | undefined;
    isVisible?: boolean | undefined;
    widgetIndex?: number | undefined;
    viewConfig?: any;
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
    type: import("zod").ZodOptional<import("zod").ZodNativeEnum<{
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
    templateId: import("zod").ZodOptional<import("zod").ZodNumber>;
    refViewId: import("zod").ZodOptional<import("zod").ZodNumber>;
    isVisible: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
    widgetIndex: import("zod").ZodOptional<import("zod").ZodNumber>;
    viewConfig: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodAny>>>;
}, "strict", import("zod").ZodTypeAny>, {
    name?: string | null | undefined;
    type?: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL" | undefined;
    templateId?: number | undefined;
    refViewId?: number | undefined;
    isVisible?: boolean | undefined;
    widgetIndex?: number | undefined;
    viewConfig?: any;
}>;
export declare class UpdateWidgetBodyDTO extends UpdateWidgetBodyDTO_base {
}
declare const UpdateManyWidgetsDTO_base: import("nestjs-zod").ZodDto<{
    widgets: {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }[];
}, import("zod").ZodObjectDef<{
    widgets: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        widgetIndex: import("zod").ZodOptional<import("zod").ZodNumber>;
        name: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
        type: import("zod").ZodNativeEnum<{
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
        isVisible: import("zod").ZodOptional<import("zod").ZodBoolean>;
        viewConfig: import("zod").ZodOptional<import("zod").ZodAny>;
    }, "strip", import("zod").ZodTypeAny, {
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
}, "strict", import("zod").ZodTypeAny>, {
    widgets: {
        id: number;
        type: "TITLE" | "BANNER_CAROUSEL" | "BANNER_GRID4" | "CATEGORIES_GRID" | "CATEGORIES_CAROUSEL" | "PRODUCTS_ALL" | "PRODUCTS_RATING" | "PRODUCTS_GRID" | "STORIES_CAROUSEL" | "FLASH_SALE" | "DISCOUNT" | "COLLECTIONS_CAROUSEL" | "COLLECTIONS_VERTICAL";
        widgetIndex?: number | undefined;
        name?: string | null | undefined;
        isVisible?: boolean | undefined;
        viewConfig?: any;
    }[];
}>;
export declare class UpdateManyWidgetsDTO extends UpdateManyWidgetsDTO_base {
}
export {};
