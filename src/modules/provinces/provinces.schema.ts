import { z } from 'zod';

export const GetParamsProvincesSchema = z.object({
  id: z.coerce.number(),
  countryCode: z.coerce.string(),
});

export type GetParamsProvincesType = z.infer<typeof GetParamsProvincesSchema>;
