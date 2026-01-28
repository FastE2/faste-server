import z from 'zod';
export declare const RegisterBodySchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    phoneNumber: z.ZodString;
    confirmPassword: z.ZodString;
    code: z.ZodString;
}, "strict", z.ZodTypeAny, {
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
}>, {
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
}>;
export declare const RefreshTokenSchema: z.ZodObject<{
    token: z.ZodString;
    userId: z.ZodNumber;
    deviceId: z.ZodNumber;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    createdAt: Date;
    token: string;
    userId: number;
    deviceId: number;
    expiresAt: Date;
}, {
    createdAt: Date;
    token: string;
    userId: number;
    deviceId: number;
    expiresAt: Date;
}>;
export declare const VerificationCodeSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    code: z.ZodString;
    type: z.ZodNativeEnum<{
        readonly REGISTER: "REGISTER";
        readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
        readonly LOGIN: "LOGIN";
        readonly DISABLE_2FA: "DISABLE_2FA";
    }>;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    code: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
    createdAt: Date;
    expiresAt: Date;
}, {
    id: number;
    email: string;
    code: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
    createdAt: Date;
    expiresAt: Date;
}>;
export declare const LoginBodySchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    totpCode: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    email: string;
    password: string;
    totpCode?: string | undefined;
}, {
    email: string;
    password: string;
    totpCode?: string | undefined;
}>;
export declare const LoginResSchema: z.ZodObject<{
    accessToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
}, {
    accessToken: string;
}>;
export declare const RefreshTokenResSchema: z.ZodObject<{
    accessToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
}, {
    accessToken: string;
}>;
export declare const RegisterResSchema: z.ZodObject<Omit<{
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
export declare const SendOTPBodySchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    email: z.ZodString;
    code: z.ZodString;
    type: z.ZodNativeEnum<{
        readonly REGISTER: "REGISTER";
        readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
        readonly LOGIN: "LOGIN";
        readonly DISABLE_2FA: "DISABLE_2FA";
    }>;
    expiresAt: z.ZodDate;
    createdAt: z.ZodDate;
}, "email" | "type">, "strip", z.ZodTypeAny, {
    email: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
}, {
    email: string;
    type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
}>;
export declare const ForgotPasswordBodySchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    code: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}>, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    code: string;
    confirmPassword: string;
}>;
export declare const TwoFADisableBodySchema: z.ZodObject<{
    totpCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    totpCode: string;
}, {
    totpCode: string;
}>;
export declare const TwoFAEnableResSchema: z.ZodObject<{
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uri: string;
}, {
    uri: string;
}>;
export declare const DeviceSchema: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    userAgent: z.ZodString;
    ip: z.ZodString;
    lastActive: z.ZodDate;
    createdAt: z.ZodDate;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    userId: number;
    userAgent: string;
    ip: string;
    lastActive: Date;
    isActive: boolean;
}, {
    id: number;
    createdAt: Date;
    userId: number;
    userAgent: string;
    ip: string;
    lastActive: Date;
    isActive: boolean;
}>;
export declare const GoogleAuthStateSchema: z.ZodObject<Pick<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    userAgent: z.ZodString;
    ip: z.ZodString;
    lastActive: z.ZodDate;
    createdAt: z.ZodDate;
    isActive: z.ZodBoolean;
}, "userAgent" | "ip">, "strip", z.ZodTypeAny, {
    userAgent: string;
    ip: string;
}, {
    userAgent: string;
    ip: string;
}>;
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>;
export type VerificationCodeType = z.infer<typeof VerificationCodeSchema>;
export type ForgotPasswordBodyType = z.infer<typeof ForgotPasswordBodySchema>;
export type TwoFADisableBodyType = z.infer<typeof TwoFADisableBodySchema>;
export type TwoFAEnableResType = z.infer<typeof TwoFAEnableResSchema>;
export type GoogleAuthStateType = z.infer<typeof GoogleAuthStateSchema>;
export type GoogleAuthBodyType = GoogleAuthStateType;
