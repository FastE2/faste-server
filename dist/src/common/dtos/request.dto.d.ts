declare const EmptyBodyDTO_base: import("nestjs-zod").ZodDto<{}, import("zod").ZodObjectDef<{}, "strict", import("zod").ZodTypeAny>, {}>;
export declare class EmptyBodyDTO extends EmptyBodyDTO_base {
}
declare const PaginationQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strict", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare class PaginationQueryDTO extends PaginationQueryDTO_base {
}
declare const DeleteBodyDTO_base: import("nestjs-zod").ZodDto<{
    isHard?: boolean | undefined;
}, import("zod").ZodObjectDef<{
    isHard: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strict", import("zod").ZodTypeAny>, {
    isHard?: boolean | undefined;
}>;
export declare class DeleteBodyDTO extends DeleteBodyDTO_base {
}
declare const GetParamsDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
}>;
export declare class GetParamsDTO extends GetParamsDTO_base {
}
export {};
