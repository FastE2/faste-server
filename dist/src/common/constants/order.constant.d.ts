import { OrderStatus } from '@prisma/client';
export declare const ORDER_STATUS: {
    readonly PENDING_CONFIRMATION: "PENDING_CONFIRMATION";
    readonly PROCESSING: "PROCESSING";
    readonly PENDING_PAYMENT: "PENDING_PAYMENT";
    readonly PENDING_PICKUP: "PENDING_PICKUP";
    readonly PENDING_DELIVERY: "PENDING_DELIVERY";
    readonly DELIVERED: "DELIVERED";
    readonly RECEIVED: "RECEIVED";
    readonly RETURNED: "RETURNED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export declare const ALLOWED_STATUS_BY_ROLE: Record<string, readonly OrderStatus[]>;
export declare const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatusType, OrderStatusType[]>;
