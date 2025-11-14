import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(500),
  description: z.string().default(''),
  image: z.string().nullable(),
  parentCategoryId: z.number().nullable(),

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const CreateCategoryBodySchema = CategorySchema.pick({
  name: true,
  description: true,
  parentCategoryId: true,
}).strict();

export const UpdateCategoryBodySchema = CreateCategoryBodySchema;

export const GetCategoryByIdResSchema = CategorySchema;
export const GetCategoryResSchema = z.array(CategorySchema);
export const CreateCategoryResSchema = CategorySchema;
export const UpdateCategoryResSchema = CategorySchema;

export type CategoryType = z.infer<typeof CategorySchema>;
export type CreateCategoryBodyType = z.infer<typeof CreateCategoryBodySchema>;
export type UpdateCategoryBodyType = z.infer<typeof UpdateCategoryBodySchema>;
