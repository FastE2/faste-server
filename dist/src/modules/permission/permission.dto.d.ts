declare const CreatePermissionBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}, import("zod").ZodObjectDef<Pick<{
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
}, "name" | "path" | "method" | "module">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}>;
export declare class CreatePermissionBodyDTO extends CreatePermissionBodyDTO_base {
}
declare const GetPermissionParamsDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
}, "strip", import("zod").ZodTypeAny>, {
    id: number;
}>;
export declare class GetPermissionParamsDTO extends GetPermissionParamsDTO_base {
}
declare const UpdatePermissionBodyDTO_base: import("nestjs-zod").ZodDto<{
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}, import("zod").ZodObjectDef<Pick<{
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
}, "name" | "path" | "method" | "module">, "strict", import("zod").ZodTypeAny>, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}>;
export declare class UpdatePermissionBodyDTO extends UpdatePermissionBodyDTO_base {
}
declare const GetPermissionsResDTO_base: import("nestjs-zod").ZodDto<{
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
}[], import("zod").ZodArrayDef<import("zod").ZodObject<{
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
}>>, {
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
}[]>;
export declare class GetPermissionsResDTO extends GetPermissionsResDTO_base {
}
declare const CreatePermissionResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
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
}, "strip", import("zod").ZodTypeAny>, {
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
}>;
export declare class CreatePermissionResDTO extends CreatePermissionResDTO_base {
}
declare const GetPermissionByIdResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
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
}, "strip", import("zod").ZodTypeAny>, {
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
}>;
export declare class GetPermissionByIdResDTO extends GetPermissionByIdResDTO_base {
}
declare const UpdatePermissionResDTO_base: import("nestjs-zod").ZodDto<{
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
    roles: {
        id: number;
        name: string;
        description: string | null;
    }[];
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    path: import("zod").ZodString;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
    isActive: import("zod").ZodBoolean;
    description: import("zod").ZodString;
    method: import("zod").ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: import("zod").ZodString;
    roles: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        name: import("zod").ZodString;
        description: import("zod").ZodNullable<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        name: string;
        description: string | null;
    }, {
        id: number;
        name: string;
        description: string | null;
    }>, "many">;
}, "strip", import("zod").ZodTypeAny>, {
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
    roles: {
        id: number;
        name: string;
        description: string | null;
    }[];
}>;
export declare class UpdatePermissionResDTO extends UpdatePermissionResDTO_base {
}
export {};
