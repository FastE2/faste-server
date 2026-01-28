declare const CreateCategoryBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    parentCategoryId: number | null;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "name" | "description" | "parentCategoryId">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare class CreateCategoryBodyDTO extends CreateCategoryBodyDTO_base {
}
declare const UpdateCategoryBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    parentCategoryId: number | null;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "name" | "description" | "parentCategoryId">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare class UpdateCategoryBodyDTO extends UpdateCategoryBodyDTO_base {
}
declare const GetCategoryResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    image: string | null;
    parentCategoryId: number | null;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    image: string | null;
    parentCategoryId: number | null;
}, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    image: string | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}>>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    image: string | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}[]>;
export declare class GetCategoryResDTO extends GetCategoryResDTO_base {
}
declare const GetCategoryByIdResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    image: string | null;
    parentCategoryId: number | null;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    image: string | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare class GetCategoryByIdResDTO extends GetCategoryByIdResDTO_base {
}
declare const CreateCategoryResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    image: string | null;
    parentCategoryId: number | null;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    image: string | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare class CreateCategoryResDTO extends CreateCategoryResDTO_base {
}
declare const UpdateCategoryResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    description: string;
    image: string | null;
    parentCategoryId: number | null;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    image: import("zod").ZodNullable<import("zod").ZodString>;
    parentCategoryId: import("zod").ZodNullable<import("zod").ZodNumber>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodNullable<import("zod").ZodDate>;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date | null;
    image: string | null;
    parentCategoryId: number | null;
    description?: string | undefined;
}>;
export declare class UpdateCategoryResDTO extends UpdateCategoryResDTO_base {
}
export {};
