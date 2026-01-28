declare const GetParamsProvincesDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    countryCode: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    countryCode: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    countryCode: string;
}>;
export declare class GetParamsProvincesDTO extends GetParamsProvincesDTO_base {
}
export {};
