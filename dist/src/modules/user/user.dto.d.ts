declare const GetUsersQueryDTO_base: import("nestjs-zod").ZodDto<{
    page: number;
    limit: number;
}, import("zod").ZodObjectDef<{
    page: import("zod").ZodDefault<import("zod").ZodNumber>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strict", import("zod").ZodTypeAny>, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare class GetUsersQueryDTO extends GetUsersQueryDTO_base {
}
declare const GetUsersResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    data: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        email: import("zod").ZodString;
        name: import("zod").ZodString;
        phoneNumber: import("zod").ZodString;
        avatar: import("zod").ZodNullable<import("zod").ZodString>;
        gender: import("zod").ZodNullable<import("zod").ZodNativeEnum<{
            MALE: string;
            FEMALE: string;
            OTHER: string;
        }>>;
        roleId: import("zod").ZodNumber;
        dateOfBirth: import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>;
        createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
        updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
        deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
        deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
        createdAt: import("zod").ZodDate;
        updatedAt: import("zod").ZodDate;
        role: import("zod").ZodObject<Pick<{
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
        }, "id" | "name">, "strip", import("zod").ZodTypeAny, {
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
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
    totalItem: import("zod").ZodNumber;
    page: import("zod").ZodNumber;
    limmit: import("zod").ZodNumber;
    totalPage: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny>, {
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
export declare class GetUsersResDTO extends GetUsersResDTO_base {
}
declare const GetUserParamsDTO_base: import("nestjs-zod").ZodDto<{
    id: number;
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
}, "strict", import("zod").ZodTypeAny>, {
    id: number;
}>;
export declare class GetUserParamsDTO extends GetUserParamsDTO_base {
}
declare const GetUserByIdResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    gender: import("zod").ZodNullable<import("zod").ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: import("zod").ZodNumber;
    dateOfBirth: import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
    role: import("zod").ZodObject<Pick<{
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
    }, "id" | "name">, "strip", import("zod").ZodTypeAny, {
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>;
}, "strip", import("zod").ZodTypeAny>, {
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
export declare class GetUserByIdResDTO extends GetUserByIdResDTO_base {
}
declare const UpdateUserBodyDTO_base: import("nestjs-zod").ZodDto<{
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    roleId?: number | undefined;
}, import("zod").ZodObjectDef<{
    email: import("zod").ZodOptional<import("zod").ZodString>;
    name: import("zod").ZodOptional<import("zod").ZodString>;
    password: import("zod").ZodOptional<import("zod").ZodString>;
    phoneNumber: import("zod").ZodOptional<import("zod").ZodString>;
    avatar: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    roleId: import("zod").ZodOptional<import("zod").ZodNumber>;
}, "strict", import("zod").ZodTypeAny>, {
    email?: string | undefined;
    name?: string | undefined;
    password?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    roleId?: number | undefined;
}>;
export declare class UpdateUserBodyDTO extends UpdateUserBodyDTO_base {
}
declare const UpdateUserResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<Omit<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    password: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    gender: import("zod").ZodNullable<import("zod").ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: import("zod").ZodNumber;
    totpSecret: import("zod").ZodNullable<import("zod").ZodString>;
    dateOfBirth: import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "password" | "totpSecret">, "strip", import("zod").ZodTypeAny>, {
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
export declare class UpdateUserResDTO extends UpdateUserResDTO_base {
}
declare const CreateUserBodyDTO_base: import("nestjs-zod").ZodDto<{
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    avatar: string | null;
    roleId: number;
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    password: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    gender: import("zod").ZodNullable<import("zod").ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: import("zod").ZodNumber;
    totpSecret: import("zod").ZodNullable<import("zod").ZodString>;
    dateOfBirth: import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "email" | "name" | "password" | "phoneNumber" | "avatar" | "roleId">, "strict", import("zod").ZodTypeAny>, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    avatar: string | null;
    roleId: number;
}>;
export declare class CreateUserBodyDTO extends CreateUserBodyDTO_base {
}
declare const CreateUserResDTO_base: import("nestjs-zod").ZodDto<{
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
}, import("zod").ZodObjectDef<Omit<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    password: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    avatar: import("zod").ZodNullable<import("zod").ZodString>;
    gender: import("zod").ZodNullable<import("zod").ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>;
    roleId: import("zod").ZodNumber;
    totpSecret: import("zod").ZodNullable<import("zod").ZodString>;
    dateOfBirth: import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>;
    createdById: import("zod").ZodNullable<import("zod").ZodNumber>;
    updatedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedById: import("zod").ZodNullable<import("zod").ZodNumber>;
    deletedAt: import("zod").ZodNullable<import("zod").ZodDate>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, "password" | "totpSecret">, "strip", import("zod").ZodTypeAny>, {
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
export declare class CreateUserResDTO extends CreateUserResDTO_base {
}
export {};
