import { z } from 'zod';

export const DateRangeEnum = z.enum([
  'today',
  'last7days',
  'last30days',
  'thisMonth',
]);

export const ReportQuerySchema = z
  .object({
    dateRange: DateRangeEnum.optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .refine((data) => data.dateRange || (data.from && data.to), {
    message: 'Either dateRange or both from/to must be provided',
  });

export const TopItemsQuerySchema = z.object({
  dateRange: DateRangeEnum.optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  limit: z.coerce.number().int().positive().default(10),
});

export const SellerOverviewResSchema = z.object({
  totalRevenue: z.number(),
  totalOrders: z.number(),
  totalProductsSold: z.number(),
  totalReturns: z.number(),
});

export const AdminOverviewResSchema = SellerOverviewResSchema.extend({
  totalCustomers: z.number(),
  totalSellers: z.number(),
});

export const SalesTrendItemSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  orders: z.number(),
});

export const SalesTrendResSchema = z.object({
  data: z.array(SalesTrendItemSchema),
});

export const TopProductItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  image: z.string(),
  totalSold: z.number(),
  totalRevenue: z.number(),
});

export const TopProductsResSchema = z.object({
  data: z.array(TopProductItemSchema),
});

export const TopSellerItemSchema = z.object({
  shopId: z.number(),
  shopName: z.string(),
  logo: z.string().nullable(),
  totalRevenue: z.number(),
  totalOrders: z.number(),
});

export const TopSellersResSchema = z.object({
  data: z.array(TopSellerItemSchema),
});

export type ReportQueryType = z.infer<typeof ReportQuerySchema>;
export type TopItemsQueryType = z.infer<typeof TopItemsQuerySchema>;
