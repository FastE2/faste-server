export const FLASH_SALE_STATUS = {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  LIVE: 'LIVE',
  ENDED: 'ENDED',
  CANCELLED: 'CANCELLED',
} as const;

export const FLASH_SALE_TYPE = {
  SELLER: 'SELLER',
  PLATFORM: 'PLATFORM',
} as const;

export type FlashSaleStatus =
  (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];

export type UpdatableFlashSaleStatus = Extract<
  FlashSaleStatus,
  'DRAFT' | 'SCHEDULED' | 'CANCELLED'
>;

export type FlashSaleType =
  (typeof FLASH_SALE_TYPE)[keyof typeof FLASH_SALE_TYPE];
