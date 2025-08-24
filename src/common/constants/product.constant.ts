export const PRODUCT_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export const OrderBy = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const SortBy = {
  Price: 'price',
  CreatedAt: 'createdAt',
  Sale: 'sale',
} as const;

export const PREFIX_PAYMENT_CODE = 'DH';

export type OrderByType = (typeof OrderBy)[keyof typeof OrderBy];
export type SortByType = (typeof SortBy)[keyof typeof SortBy];
