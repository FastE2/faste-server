import { z } from 'zod';

export const DeliveryTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  code: z.string().min(1).max(100),
  description: z.string().default(''),
  estimatedTime: z.string().min(1).max(500).optional().nullable(),
  countryCode: z.string().min(1).max(100),
  basePrice: z.number().min(0),
  pricePerKg: z.number().min(0),
  isActive: z.boolean().default(true),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateDeliveryTypeBodySchema = DeliveryTypeSchema.pick({
  name: true,
  code: true,
  description: true,
  basePrice: true,
  estimatedTime: true,
  countryCode: true,
  pricePerKg: true,
  isActive: true,
}).strict();

export const UpdateDeliveryTypeBodySchema = CreateDeliveryTypeBodySchema;

export const GetDeliveryTypeByIdResSchema = DeliveryTypeSchema;
export const GetDeliveryTypeResSchema = z.array(DeliveryTypeSchema);
export const CreateDeliveryTypeResSchema = DeliveryTypeSchema;
export const UpdateDeliveryTypeResSchema = DeliveryTypeSchema;

export type DeliveryTypeType = z.infer<typeof DeliveryTypeSchema>;
export type CreateDeliveryTypeBodyType = z.infer<
  typeof CreateDeliveryTypeBodySchema
>;
export type UpdateDeliveryTypeBodyType = z.infer<
  typeof UpdateDeliveryTypeBodySchema
>;
