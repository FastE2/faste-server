import { z } from 'zod';

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(200),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateLanguageBodySchema = LanguageSchema.pick({
  name: true,
});

export const UpdateLanguageBodySchema = CreateLanguageBodySchema;

export type CreateLanguageBodyType = z.infer<typeof CreateLanguageBodySchema>;
export type UpdateLanguageBodyType = z.infer<typeof UpdateLanguageBodySchema>;
export type LanguageType = z.infer<typeof LanguageSchema>;
