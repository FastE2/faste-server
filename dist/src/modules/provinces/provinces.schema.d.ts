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
export type GetParamsProvincesType = z.infer<typeof GetParamsProvincesSchema>;
