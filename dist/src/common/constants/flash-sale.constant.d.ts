export declare const FLASH_SALE_STATUS: {
    readonly DRAFT: "DRAFT";
    readonly SCHEDULED: "SCHEDULED";
    readonly LIVE: "LIVE";
    readonly ENDED: "ENDED";
    readonly CANCELLED: "CANCELLED";
};
export declare const FLASH_SALE_TYPE: {
    readonly SELLER: "SELLER";
    readonly PLATFORM: "PLATFORM";
};
export type FlashSaleStatus = (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];
export type UpdatableFlashSaleStatus = Extract<FlashSaleStatus, 'DRAFT' | 'SCHEDULED' | 'CANCELLED'>;
export type FlashSaleType = (typeof FLASH_SALE_TYPE)[keyof typeof FLASH_SALE_TYPE];
