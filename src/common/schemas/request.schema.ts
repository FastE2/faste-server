import { boolean, z } from 'zod';

export const EmptyBodySchema = z.object({}).strict();

export const PaginationQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1), // Phải thêm coerce để chuyển từ string sang number
    limit: z.coerce.number().int().positive().default(10), // Phải thêm coerce để chuyển từ string sang number
  })
  .strict();

export const GetParamsSchema = z.object({
  id: z.coerce.number(),
});

export const DeleteBodySchema = z
  .object({
    isHard: z.boolean().optional(),
  })
  .strict();

export type EmptyBodyType = z.infer<typeof EmptyBodySchema>;
export type DeleteBodyType = z.infer<typeof DeleteBodySchema>;
export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>;
export type GetParamsType = z.infer<typeof GetParamsSchema>;
