declare const UpdateProfileBodyDTO_base: import("nestjs-zod").ZodDto<{
    name?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    gender?: string | null | undefined;
    dateOfBirth?: Date | null | undefined;
}, import("zod").ZodObjectDef<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    phoneNumber: import("zod").ZodOptional<import("zod").ZodString>;
    avatar: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    gender: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodNativeEnum<{
        MALE: string;
        FEMALE: string;
        OTHER: string;
    }>>>;
    dateOfBirth: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodNullable<import("zod").ZodDate>, Date | null, unknown>>;
}, "strip", import("zod").ZodTypeAny>, {
    name?: string | undefined;
    phoneNumber?: string | undefined;
    avatar?: string | null | undefined;
    gender?: string | null | undefined;
    dateOfBirth?: unknown;
}>;
export declare class UpdateProfileBodyDTO extends UpdateProfileBodyDTO_base {
}
declare const ChangePasswordProfileBodyDTO_base: import("nestjs-zod").ZodDto<{
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}, import("zod").ZodEffectsDef<import("zod").ZodObject<{
    oldPassword: import("zod").ZodString;
    confirmNewPassword: import("zod").ZodString;
    newPassword: import("zod").ZodString;
}, "strict", import("zod").ZodTypeAny, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}>>, {
    oldPassword: string;
    confirmNewPassword: string;
    newPassword: string;
}>;
export declare class ChangePasswordProfileBodyDTO extends ChangePasswordProfileBodyDTO_base {
}
export {};
