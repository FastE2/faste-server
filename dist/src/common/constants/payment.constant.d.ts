export declare const PAYMENT_STATUS: {
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly FAILED: "FAILED";
};
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export declare const PAYMENT_METHOD: {
    readonly COD: "COD";
    readonly SEPAY: "SEPAY";
    readonly WEB3: "WEB3";
};
export declare const PREFIX_PAYMENT_CODE = "DH";
