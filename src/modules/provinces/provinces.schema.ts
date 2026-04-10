import { z } from 'zod';

export const GetParamsProvincesSchema = z.object({
  id: z.coerce.number(),
  countryCode: z.coerce.string(),
});

export const QueryProvincesSchema = z.object({
  parentId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export type QueryProvincesType = z.infer<typeof QueryProvincesSchema>;
export type GetParamsProvincesType = z.infer<typeof GetParamsProvincesSchema>;
