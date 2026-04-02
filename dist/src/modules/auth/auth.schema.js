"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthStateSchema = exports.DeviceResSchema = exports.DeviceSchema = exports.TwoFAEnableResSchema = exports.TwoFADisableBodySchema = exports.ForgotPasswordBodySchema = exports.SendOTPBodySchema = exports.RegisterResSchema = exports.RefreshTokenResSchema = exports.LoginResSchema = exports.LoginBodySchema = exports.VerificationCodeSchema = exports.RefreshTokenSchema = exports.RegisterBodySchema = void 0;
const auth_constant_1 = require("../../common/constants/auth.constant");
const user_schema_1 = require("../../common/schemas/user.schema");
const zod_1 = __importDefault(require("zod"));
exports.RegisterBodySchema = user_schema_1.UserSchema.pick({
    email: true,
    name: true,
    phoneNumber: true,
    password: true,
})
    .extend({
    confirmPassword: zod_1.default.string().min(6).max(100),
    code: zod_1.default.string().length(6),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and confirm password must be same',
            path: ['confirmPassword'],
        });
    }
});
exports.RefreshTokenSchema = zod_1.default.object({
    token: zod_1.default.string(),
    userId: zod_1.default.number(),
    deviceId: zod_1.default.number(),
    expiresAt: zod_1.default.date(),
    createdAt: zod_1.default.date(),
});
exports.VerificationCodeSchema = zod_1.default.object({
    id: zod_1.default.number(),
    email: zod_1.default.string().email(),
    code: zod_1.default.string().length(6),
    type: zod_1.default.nativeEnum(auth_constant_1.VerificationCodeTypeType),
    expiresAt: zod_1.default.date(),
    createdAt: zod_1.default.date(),
});
exports.LoginBodySchema = user_schema_1.UserSchema.pick({
    email: true,
    password: true,
})
    .extend({
    totpCode: zod_1.default.string().length(6).optional(),
})
    .strict();
exports.LoginResSchema = zod_1.default.object({
    accessToken: zod_1.default.string(),
});
exports.RefreshTokenResSchema = exports.LoginResSchema;
exports.RegisterResSchema = user_schema_1.UserSchema.omit({
    password: true,
    totpSecret: true,
});
exports.SendOTPBodySchema = exports.VerificationCodeSchema.pick({
    email: true,
    type: true,
});
exports.ForgotPasswordBodySchema = user_schema_1.UserSchema.pick({
    email: true,
    password: true,
})
    .extend({
    confirmPassword: zod_1.default.string().min(6).max(100),
    code: zod_1.default.string().length(6),
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and confirm password must be same',
            path: ['confirmPassword'],
        });
    }
});
exports.TwoFADisableBodySchema = zod_1.default.object({
    totpCode: zod_1.default.string().min(6),
});
exports.TwoFAEnableResSchema = zod_1.default.object({
    uri: zod_1.default.string(),
});
exports.DeviceSchema = zod_1.default.object({
    id: zod_1.default.number(),
    userId: zod_1.default.number(),
    userAgent: zod_1.default.string(),
    ip: zod_1.default.string(),
    lastActive: zod_1.default.date(),
    createdAt: zod_1.default.date(),
    isActive: zod_1.default.boolean(),
});
exports.DeviceResSchema = zod_1.default.array(exports.DeviceSchema);
exports.GoogleAuthStateSchema = exports.DeviceSchema.pick({
    userAgent: true,
    ip: true,
});
//# sourceMappingURL=auth.schema.js.map