import { z } from 'zod';
declare const GetParamsProvincesDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    countryCode: string;
}, z.ZodObjectDef<{
    id: z.ZodNumber;
    countryCode: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    id: number;
    countryCode: string;
}>;
export declare class GetParamsProvincesDTO extends GetParamsProvincesDTO_base {
}
declare const QueryProvincesDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
    parentId?: number | undefined;
}, z.ZodObjectDef<{
    parentId: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny>, {
    parentId?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare class QueryProvincesDTO extends QueryProvincesDTO_base {
}
export {};
