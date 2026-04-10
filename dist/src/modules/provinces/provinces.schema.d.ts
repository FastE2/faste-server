import { z } from 'zod';
export declare const GetParamsProvincesSchema: z.ZodObject<{
    id: z.ZodNumber;
    countryCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    countryCode: string;
}, {
    id: number;
    countryCode: string;
}>;
export declare const QueryProvincesSchema: z.ZodObject<{
    parentId: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    parentId?: number | undefined;
}, {
    parentId?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type QueryProvincesType = z.infer<typeof QueryProvincesSchema>;
export type GetParamsProvincesType = z.infer<typeof GetParamsProvincesSchema>;
