declare const CreateLanguageBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name">, "strip", import("zod").ZodTypeAny>, {
    name: string;
}>;
export declare class CreateLanguageBodyDTO extends CreateLanguageBodyDTO_base {
}
declare const UpdateLanguageBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name">, "strip", import("zod").ZodTypeAny>, {
    name: string;
}>;
export declare class UpdateLanguageBodyDTO extends UpdateLanguageBodyDTO_base {
}
export {};
