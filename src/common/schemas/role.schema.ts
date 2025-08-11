import z from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(300),
  isActive: z.boolean().default(true),
  description: z.string(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RoleType = z.infer<typeof RoleSchema>;
