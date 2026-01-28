"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordProfileBodySchema = exports.UpdateProfileBodySchema = void 0;
const user_schema_1 = require("../../common/schemas/user.schema");
const zod_1 = require("zod");
exports.UpdateProfileBodySchema = user_schema_1.UserSchema.pick({
    name: true,
    avatar: true,
    phoneNumber: true,
    gender: true,
    dateOfBirth: true,
}).partial();
exports.ChangePasswordProfileBodySchema = zod_1.z
    .object({
    oldPassword: zod_1.z.string().min(6).max(100),
    confirmNewPassword: zod_1.z.string().min(6).max(100),
    newPassword: zod_1.z.string().min(6).max(100),
})
    .strict()
    .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
    if (confirmNewPassword !== newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'New password and confirm new password must be same',
            path: ['confirmNewPassword'],
        });
    }
});
//# sourceMappingURL=profile.schema.js.map