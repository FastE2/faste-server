import { z } from 'zod';

export const BrandSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  description: z.string().default(''),
  logo: z.string().max(300),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateBrandBodySchema = BrandSchema.pick({
  name: true,
  description: true,
  logo: true,
}).strict();

export const UpdateBrandBodySchema = CreateBrandBodySchema;

export const GetBrandByIdResSchema = BrandSchema;
export const GetBrandResSchema = z.array(BrandSchema);
export const CreateBrandResSchema = BrandSchema;
export const UpdateBrandResSchema = BrandSchema;

export type BrandType = z.infer<typeof BrandSchema>;
export type CreateBrandBodyType = z.infer<typeof CreateBrandBodySchema>;
export type UpdateBrandBodyType = z.infer<typeof UpdateBrandBodySchema>;
