import { z } from 'zod';
export declare const UpdateProfileBodySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gender: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>>;
    dateOfBirth: z.ZodOptional<z.ZodEffects<z.ZodNullable<z.ZodDate>, Date | null, unknown>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    gender?: string | null | undefined;
    dateOfBirth?: Date | null | undefined;
}, {
    name?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    gender?: string | null | undefined;
    dateOfBirth?: unknown;
}>;
export declare const ChangePasswordProfileBodySchema: z.ZodEffects<z.ZodObject<{
    oldPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strict", z.ZodTypeAny, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}>, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}>;
export type ChangePasswordProfileBodyType = z.infer<typeof ChangePasswordProfileBodySchema>;
export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>;
