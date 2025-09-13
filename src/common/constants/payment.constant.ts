export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_METHOD = {
  COD: 'COD',
  SEPAY: 'SEPAY',
  WEB3: 'WEB3',
} as const;

export const PREFIX_PAYMENT_CODE = 'DH';
