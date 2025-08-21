import { UserSchema } from 'src/common/schemas/user.schema';
import { z } from 'zod';

export const UpdateProfileBodySchema = UserSchema.pick({
  name: true,
  avatar: true,
  phoneNumber: true,
  dateOfBirth: true,
  updatedAt: true,
}).partial();

export const ChangePasswordProfileBodySchema = z
  .object({
    oldPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
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

export type ChangePasswordProfileBodyType = z.infer<
  typeof ChangePasswordProfileBodySchema
>;
export type UpdateProfileBodyType = z.infer<typeof UpdateProfileBodySchema>;
