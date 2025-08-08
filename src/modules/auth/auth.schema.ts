import { UserSchema } from 'src/common/schemas/user.schema';
import z from 'zod';

export const RegisterBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phoneNumber: true,
  password: true,
})
  .extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().length(6),
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

export const RefreshTokenSchema = z.object({
  token: z.string(),
  userId: z.number(),
  deviceId: z.number(),
  expiresAt: z.date(),
  createdAt: z.date(),
});

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export const LoginResSchema = z.object({
  accessToken: z.string(),
});

export const RefreshTokenResSchema = LoginResSchema;

export const RegisterResSchema = UserSchema.omit({
  password: true,
});

// -- Register
export type RegisterBodyType = z.infer<typeof RegisterBodySchema>;
export type RegisterResType = z.infer<typeof RegisterResSchema>;

// -- Login
export type LoginBodyType = z.infer<typeof LoginBodySchema>;
export type LoginResType = z.infer<typeof LoginResSchema>;

// -- RefreshToken
export type RefreshTokenType = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenResType = z.infer<typeof RefreshTokenResSchema>;
