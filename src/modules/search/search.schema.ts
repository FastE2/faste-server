import { z } from 'zod';

export const SkuSchema = z.object({
  attributeName: z.string().min(1),
  attributeValue: z.string().min(1),
  price: z.number().nonnegative(),
});

export const CreateProductSearchSchema = z.object({
  id: z.number().int(),
  images: z.array(z.string().url()).nonempty(),
  brandId: z.number().int(),
  name: z.string().min(1),
  name_suggest: z.string().min(1),
  slugId: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.string().optional(), // ISO date string
  rating: z.number().min(0).default(0),
  ratingCount: z.number().min(0).default(0),
  categories: z.array(z.number().int()).nonempty(),
  totalViews: z.number().min(0).default(0),
  viewsToday: z.number().min(0).default(0),
  salesToday: z.number().min(0).default(0),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  skus: z.array(SkuSchema).nonempty(),
});

export type CreateProductSearchType = z.infer<typeof CreateProductSearchSchema>;
