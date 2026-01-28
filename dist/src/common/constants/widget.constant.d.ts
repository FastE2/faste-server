export declare const WIDGET_TYPE: {
    TITLE: string;
    BANNER_CAROUSEL: string;
    BANNER_GRID4: string;
    CATEGORIES_GRID: string;
    CATEGORIES_CAROUSEL: string;
    PRODUCTS_ALL: string;
    PRODUCTS_RATING: string;
    PRODUCTS_GRID: string;
    STORIES_CAROUSEL: string;
    FLASH_SALE: string;
    DISCOUNT: string;
    COLLECTIONS_CAROUSEL: string;
    COLLECTIONS_VERTICAL: string;
};
export type TWidgetType = (typeof WIDGET_TYPE)[keyof typeof WIDGET_TYPE];
