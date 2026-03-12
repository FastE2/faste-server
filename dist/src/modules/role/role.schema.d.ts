import { z } from 'zod';
export declare const GetRolesQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    role: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    role?: string | undefined;
    status?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    role?: string | undefined;
    status?: string | undefined;
}>;
export declare const GetRoleParamsSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const CreateRoleBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    name: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "name" | "isActive" | "description">, "strip", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    description: string;
}, {
    name: string;
    description: string;
    isActive?: boolean | undefined;
}>;
export declare const UpdateRoleBodySchema: z.ZodObject<{
    name: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    permissionIds: z.ZodArray<z.ZodNumber, "many">;
}, "strict", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    description: string;
    permissionIds: number[];
}, {
    name: string;
    description: string;
    permissionIds: number[];
    isActive?: boolean | undefined;
}>;
export declare const GetRolesResSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}>, "many">;
export declare const CreateRoleResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const GetRoleByIdResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const UpdateRoleResSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    isActive: z.ZodDefault<z.ZodBoolean>;
    description: z.ZodString;
    permissions: z.ZodArray<z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
export type CreateRoleBodyType = z.infer<typeof CreateRoleBodySchema>;
export type UpdateRoleBodyType = z.infer<typeof UpdateRoleBodySchema>;
export type GetRolesQueryType = z.infer<typeof GetRolesQuerySchema>;
export type GetRoleParamsType = z.infer<typeof GetRoleParamsSchema>;
