import { z } from 'zod';
export declare const EmptyBodySchema: z.ZodObject<{}, "strict", z.ZodTypeAny, {}, {}>;
export declare const PaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    role: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    role?: string | undefined;
    status?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    role?: string | undefined;
    status?: string | undefined;
}>;
export declare const GetParamsSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const DeleteBodySchema: z.ZodObject<{
    isHard: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    isHard?: boolean | undefined;
}, {
    isHard?: boolean | undefined;
}>;
export type EmptyBodyType = z.infer<typeof EmptyBodySchema>;
export type DeleteBodyType = z.infer<typeof DeleteBodySchema>;
export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>;
export type GetParamsType = z.infer<typeof GetParamsSchema>;
