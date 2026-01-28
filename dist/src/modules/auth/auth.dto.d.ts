declare const RegisterBodyDTO_base: import("nestjs-zod").ZodDto<{
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    code: string;
    confirmPassword: string;
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    email: import("zod").ZodString;
    name: import("zod").ZodString;
    password: import("zod").ZodString;
    phoneNumber: import("zod").ZodString;
    confirmPassword: import("zod").ZodString;
    code: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    code: string;
    confirmPassword: string;
}, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    code: string;
    confirmPassword: string;
}>>, {
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    code: string;
    confirmPassword: string;
}>;
export declare class RegisterBodyDTO extends RegisterBodyDTO_base {
}
declare const RegisterResDTO_base: import("nestjs-zod").ZodDto<{
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
export declare class RegisterResDTO extends RegisterResDTO_base {
}
declare const LoginBodyDTO_base: import("nestjs-zod").ZodDto<{
    email: string;
    password: string;
    totpCode?: string | undefined;
}, import("zod").ZodObjectDef<{
    email: import("zod").ZodString;
    password: import("zod").ZodString;
    totpCode: import("zod").ZodOptional<import("zod").ZodString>;
}, "strict", import("zod").ZodTypeAny>, {
    email: string;
    password: string;
    totpCode?: string | undefined;
}>;
export declare class LoginBodyDTO extends LoginBodyDTO_base {
}
declare const LoginResDTO_base: import("nestjs-zod").ZodDto<{
    accessToken: string;
}, import("zod").ZodObjectDef<{
    accessToken: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    accessToken: string;
}>;
export declare class LoginResDTO extends LoginResDTO_base {
}
declare const RefreshTokenResDTO_base: import("nestjs-zod").ZodDto<{
    accessToken: string;
}, import("zod").ZodObjectDef<{
    accessToken: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    accessToken: string;
}>;
export declare class RefreshTokenResDTO extends RefreshTokenResDTO_base {
}
declare const SendOTPBodyDTO_base: import("nestjs-zod").ZodDto<{
    email: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
}, import("zod").ZodObjectDef<Pick<{
    id: import("zod").ZodNumber;
    email: import("zod").ZodString;
    code: import("zod").ZodString;
    type: import("zod").ZodNativeEnum<{
        readonly REGISTER: "REGISTER";
        readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
        readonly LOGIN: "LOGIN";
        readonly DISABLE_2FA: "DISABLE_2FA";
    }>;
    expiresAt: import("zod").ZodDate;
    createdAt: import("zod").ZodDate;
}, "email" | "type">, "strip", import("zod").ZodTypeAny>, {
    email: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
}>;
export declare class SendOTPBodyDTO extends SendOTPBodyDTO_base {
}
declare const ForgotPasswordBodyDTO_base: import("nestjs-zod").ZodDto<{
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    email: import("zod").ZodString;
    password: import("zod").ZodString;
    confirmPassword: import("zod").ZodString;
    code: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}>>, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}>;
export declare class ForgotPasswordBodyDTO extends ForgotPasswordBodyDTO_base {
}
declare const TwoFADisableBodyDTO_base: import("nestjs-zod").ZodDto<{
    totpCode: string;
}, import("zod").ZodObjectDef<{
    totpCode: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    totpCode: string;
}>;
export declare class TwoFADisableBodyDTO extends TwoFADisableBodyDTO_base {
}
declare const TwoFAEnableResDTO_base: import("nestjs-zod").ZodDto<{
    uri: string;
}, import("zod").ZodObjectDef<{
    uri: import("zod").ZodString;
}, "strip", import("zod").ZodTypeAny>, {
    uri: string;
}>;
export declare class TwoFAEnableResDTO extends TwoFAEnableResDTO_base {
}
export {};
