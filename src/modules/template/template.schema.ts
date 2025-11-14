import { z } from 'zod';

export const TemplateSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(200),
  categoriesView: z.array(z.number()).max(8),
  WidgetIds: z.array(z.number()).max(10),
  sellerId: z.number(),
  theme: z.string().min(1).max(100).nullable(),
  isActive: z.boolean().default(false),
  createdAt: z.date(),
});

export const CreateTemplateBodySchema = TemplateSchema.pick({
  name: true,
  WidgetIds: true,
  categoriesView: true,
  isActive: true,
  theme: true,
}).strict();

export const UpdateTemplateBodySchema = CreateTemplateBodySchema;

export type CreateTemplateBodyType = z.infer<typeof CreateTemplateBodySchema>;
export type UpdateTemplateBodyType = z.infer<typeof UpdateTemplateBodySchema>;
