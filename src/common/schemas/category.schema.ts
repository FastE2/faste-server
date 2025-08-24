import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  description: z.string().default(''),
  parentCategoryId: z.number().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
