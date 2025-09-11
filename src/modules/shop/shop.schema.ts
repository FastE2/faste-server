import { BusinessType, PaymentMethod, ShopStatus } from '@prisma/client';
import { z } from 'zod';

const ShopSchema = z.object({
  shopid: z.number(),
  name: z.string().max(200),
  logo: z.string().max(1000).optional().default(''),
  cover: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  description: z.string().default(''),
  followerCount: z.number().nullable().optional(),
  ratingStar: z.number().optional().default(0),
  responseRate: z.number().optional().default(100),
  responseTime: z.number().optional().default(0),
  addressShipId: z.number(),
  businessType: z.nativeEnum(BusinessType),
  taxCode: z.string().length(14),
  status: z.nativeEnum(ShopStatus),
  isActive: z.boolean().default(true),
  itemCount: z.number().nullable().optional().default(0),
  paymentMethods: z.array(z.nativeEnum(PaymentMethod)),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  deletedAt: z.date().nullable().optional(),
  deletedById: z.number().nullable().optional(),
});

export const RegisterShopBodySchema = ShopSchema.pick({
  name: true,
  description: true,
  logo: true,
  addressShipId: true,
  paymentMethods: true,
  taxCode: true,
  businessType: true,
}).extend({
  deliveryTypeIds: z.array(z.number()),
});

export const UpdateShopBodySchema = ShopSchema.pick({
  name: true,
  description: true,
  logo: true,
  addressShipId: true,
  paymentMethods: true,
  taxCode: true,
  businessType: true,
  banner: true,
  cover: true,
}).extend({
  deliveryTypeIds: z.array(z.number()),
});

export const GetShopByIdResSchema = ShopSchema;
export const GetShopResSchema = z.array(ShopSchema);
export const CreateShopResSchema = ShopSchema;
export const UpdateShopResSchema = ShopSchema;
export type UpdateShopBodyType = z.infer<typeof UpdateShopBodySchema>;

// -- Shop
export type ShopType = z.infer<typeof ShopSchema>;
export type RegisterShopBodyType = z.infer<typeof RegisterShopBodySchema>;
