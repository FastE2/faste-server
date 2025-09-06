import { OrderStatus } from '@prisma/client';

export const ORDER_STATUS = {
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PENDING_PICKUP: 'PENDING_PICKUP',
  PENDING_DELIVERY: 'PENDING_DELIVERY',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ALLOWED_STATUS_BY_ROLE: Record<string, readonly OrderStatus[]> = {
  ADMIN: [
    ORDER_STATUS.PENDING_PAYMENT,
    ORDER_STATUS.PENDING_PICKUP,
    ORDER_STATUS.PENDING_DELIVERY,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RETURNED,
    ORDER_STATUS.CANCELLED,
  ],
  CLIENT: [ORDER_STATUS.CANCELLED, ORDER_STATUS.DELIVERED],
  SELLER: [
    ORDER_STATUS.PENDING_PICKUP,
    ORDER_STATUS.PENDING_DELIVERY,
    ORDER_STATUS.CANCELLED,
  ],
} as const;

export const ALLOWED_STATUS_TRANSITIONS: Record<
  OrderStatusType,
  OrderStatusType[]
> = {
  // Đơn hàng đang chờ thanh toán có thể chuyển sang trạng thái chờ lấy hàng hoặc bị hủy
  [ORDER_STATUS.PENDING_PAYMENT]: [
    ORDER_STATUS.PENDING_PICKUP,
    ORDER_STATUS.CANCELLED,
  ],

  // Đơn hàng đã thanh toán và chờ người bán đóng gói/lấy hàng.
  // Có thể chuyển sang trạng thái chờ giao hàng (khi shipper nhận) hoặc bị hủy.
  [ORDER_STATUS.PENDING_PICKUP]: [
    ORDER_STATUS.PENDING_DELIVERY,
    ORDER_STATUS.CANCELLED,
  ],

  // Đơn hàng đã được bàn giao cho đơn vị vận chuyển, đang trên đường giao.
  // Có thể chuyển sang trạng thái đã giao hoặc hoàn trả.
  [ORDER_STATUS.PENDING_DELIVERY]: [
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RETURNED,
  ],

  // Đơn hàng đã giao thành công. Không thể chuyển sang trạng thái khác.
  [ORDER_STATUS.DELIVERED]: [],

  // Đơn hàng bị hủy. Không thể chuyển sang trạng thái khác.
  [ORDER_STATUS.CANCELLED]: [],

  // Đơn hàng bị hoàn trả. Không thể chuyển sang trạng thái khác.
  [ORDER_STATUS.RETURNED]: [],
};
