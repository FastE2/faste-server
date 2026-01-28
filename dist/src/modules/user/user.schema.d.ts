import { z } from 'zod';
export declare const GetUserSchemaOmitPwTs: z.ZodObject<Omit<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: z.ZodNumber;
    totpSecret: z.ZodNullable<z.ZodString>;
    dateOfBirth: z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "password" | "totpSecret">, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    avatar: string | null;
    gender: string | null;
    roleId: number;
    dateOfBirth: Date | null;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    avatar: string | null;
    gender: string | null;
    roleId: number;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: unknown;
}>;
export declare const GetUsersInclueRoleSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: z.ZodNumber;
    dateOfBirth: z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    role: z.ZodObject<Pick<{
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
    }, "id" | "name">, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    role: {
        id: number;
        name: string;
    };
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    avatar: string | null;
    gender: string | null;
    roleId: number;
    dateOfBirth: Date | null;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    role: {
        id: number;
        name: string;
    };
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    avatar: string | null;
    gender: string | null;
    roleId: number;
    createdById: number | null;
    updatedById: number | null;
    deletedById: number | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth?: unknown;
}>;
export declare const GetUserParamsSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const GetUsersResSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        email: z.ZodString;
        name: z.ZodString;
        phoneNumber: z.ZodString;
        avatar: z.ZodNullable<z.ZodString>;
        gender: z.ZodNullable<z.ZodNativeEnum<{
            MALE: string;
            FEMALE: string;
            OTHER: string;
        }>>;
        roleId: z.ZodNumber;
        dateOfBirth: z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>;
        createdById: z.ZodNullable<z.ZodNumber>;
        updatedById: z.ZodNullable<z.ZodNumber>;
        deletedById: z.ZodNullable<z.ZodNumber>;
        deletedAt: z.ZodNullable<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        role: z.ZodObject<Pick<{
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
        }, "id" | "name">, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        role: {
            id: number;
            name: string;
        };
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, {
        role: {
            id: number;
            name: string;
        };
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth?: unknown;
    }>, "many">;
    totalItem: z.ZodNumber;
    page: z.ZodNumber;
    limmit: z.ZodNumber;
    totalPage: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    data: {
        role: {
            id: number;
            name: string;
        };
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    page: number;
    totalItem: number;
    limmit: number;
    totalPage: number;
}, {
    data: {
        role: {
            id: number;
            name: string;
        };
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth?: unknown;
    }[];
    page: number;
    totalItem: number;
    limmit: number;
    totalPage: number;
}>;
export declare const CreateUserBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    avatar: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: z.ZodNumber;
    totpSecret: z.ZodNullable<z.ZodString>;
    dateOfBirth: z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>;
    createdById: z.ZodNullable<z.ZodNumber>;
    updatedById: z.ZodNullable<z.ZodNumber>;
    deletedById: z.ZodNullable<z.ZodNumber>;
    deletedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "email" | "name" | "password" | "phoneNumber" | "avatar" | "roleId">, "strict", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    avatar: string | null;
    roleId: number;
}, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    avatar: string | null;
    roleId: number;
}>;
export declare const UpdateUserBodySchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleId: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    roleId?: number | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    roleId?: number | undefined;
}>;
export type GetUsersInclueRoleType = z.infer<typeof GetUsersInclueRoleSchema>;
export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUserByIdParamsType = z.infer<typeof GetUserParamsSchema>;
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>;
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>;
