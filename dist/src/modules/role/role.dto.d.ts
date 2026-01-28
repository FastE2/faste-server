declare const CreateRoleBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    isActive: boolean;
    description: string;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "name" | "isActive" | "description">, "strip", import("zod").ZodTypeAny>, {
    name: string;
    description: string;
    isActive?: boolean | undefined;
}>;
export declare class CreateRoleBodyDTO extends CreateRoleBodyDTO_base {
}
declare const GetRolesQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strict", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare class GetRolesQueryDTO extends GetRolesQueryDTO_base {
}
declare const GetRoleParamsDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
}>;
export declare class GetRoleParamsDTO extends GetRoleParamsDTO_base {
}
declare const UpdateRoleBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    isActive: boolean;
    description: string;
    permissionIds: number[];
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodString;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
    permissionIds: import("zod").ZodArray<import("zod").ZodNumber, "many">;
}, "strict", import("zod").ZodTypeAny>, {
    name: string;
    description: string;
    permissionIds: number[];
    isActive?: boolean | undefined;
}>;
export declare class UpdateRoleBodyDTO extends UpdateRoleBodyDTO_base {
}
declare const GetRolesResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
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
    isActive: boolean;
    description: string;
}, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    isActive?: boolean | undefined;
}>>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    isActive?: boolean | undefined;
}[]>;
export declare class GetRolesResDTO extends GetRolesResDTO_base {
}
declare const CreateRoleResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
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
    description: string;
    isActive?: boolean | undefined;
}>;
export declare class CreateRoleResDTO extends CreateRoleResDTO_base {
}
declare const GetRoleByIdResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
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
    description: string;
    isActive?: boolean | undefined;
}>;
export declare class GetRoleByIdResDTO extends GetRoleByIdResDTO_base {
}
declare const UpdateRoleResDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    description: string;
    permissions: {
        id: number;
        name: string;
        path: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        module: string;
    }[];
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
    isActive: import("zod").ZodDefault<import("zod").ZodBoolean>;
    description: import("zod").ZodString;
    permissions: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        name: import("zod").ZodString;
        description: import("zod").ZodString;
        path: import("zod").ZodString;
        method: import("zod").ZodNativeEnum<{
            GET: "GET";
            POST: "POST";
            PUT: "PUT";
            PATCH: "PATCH";
            DELETE: "DELETE";
        }>;
        module: import("zod").ZodString;
        isActive: import("zod").ZodBoolean;
        createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
        updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
        deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
        deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
        createdAt: import("zod").ZodDate;
        updatedAt: import("zod").ZodDate;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        name: string;
        path: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        module: string;
    }, {
        id: number;
        name: string;
        path: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        module: string;
    }>, "many">;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
    name: string;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    permissions: {
        id: number;
        name: string;
        path: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
        module: string;
    }[];
    isActive?: boolean | undefined;
}>;
export declare class UpdateRoleResDTO extends UpdateRoleResDTO_base {
}
export {};
