declare const CreateBrandBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    logo: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name" | "description" | "logo">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    logo: string;
    description?: string | undefined;
}>;
export declare class CreateBrandBodyDTO extends CreateBrandBodyDTO_base {
}
declare const UpdateBrandBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    description: string;
    logo: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name" | "description" | "logo">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    logo: string;
    description?: string | undefined;
}>;
export declare class UpdateBrandBodyDTO extends UpdateBrandBodyDTO_base {
}
declare const GetBrandResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    logo: string;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    logo: string;
}, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    logo: string;
    description?: string | undefined;
}>>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    logo: string;
    description?: string | undefined;
}[]>;
export declare class GetBrandResDTO extends GetBrandResDTO_base {
}
declare const GetBrandByIdResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    logo: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    logo: string;
    description?: string | undefined;
}>;
export declare class GetBrandByIdResDTO extends GetBrandByIdResDTO_base {
}
declare const CreateBrandResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    logo: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    logo: string;
    description?: string | undefined;
}>;
export declare class CreateBrandResDTO extends CreateBrandResDTO_base {
}
declare const UpdateBrandResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    logo: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    description: import("zod").ZodDefault<import("zod").ZodString>;
    logo: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    logo: string;
    description?: string | undefined;
}>;
export declare class UpdateBrandResDTO extends UpdateBrandResDTO_base {
}
export {};
