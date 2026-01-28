import { z } from 'zod';
export declare const GetPermissionParamsSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const CreatePermissionBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    path: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    isActive: z.ZodBoolean;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "name" | "path" | "method" | "module">, "strict", z.ZodTypeAny, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}>;
export declare const UpdatePermissionBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    path: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    isActive: z.ZodBoolean;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "name" | "path" | "method" | "module">, "strict", z.ZodTypeAny, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}, {
    name: string;
    path: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    module: string;
}>;
export declare const GetPermissionsResSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    path: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    isActive: z.ZodBoolean;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
export declare const CreatePermissionResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    path: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    isActive: z.ZodBoolean;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const GetPermissionByIdResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
    path: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    isActive: z.ZodBoolean;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const UpdatePermissionResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    path: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    isActive: z.ZodBoolean;
    description: z.ZodString;
    method: z.ZodNativeEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        PATCH: "PATCH";
        DELETE: "DELETE";
    }>;
    module: z.ZodString;
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        description: string | null;
    }, {
        id: number;
        name: string;
        description: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
    roles: {
        id: number;
        name: string;
        description: string | null;
    }[];
}>;
export type CreatePermissionBodyType = z.infer<typeof CreatePermissionBodySchema>;
export type UpdatePermissionBodyType = z.infer<typeof UpdatePermissionBodySchema>;
export type GetPermissionParamsType = z.infer<typeof GetPermissionParamsSchema>;
