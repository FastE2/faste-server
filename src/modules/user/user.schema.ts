import { RoleSchema } from 'src/common/schemas/role.schema';
import { UserSchema } from 'src/common/schemas/user.schema';
import { z } from 'zod';

export const GetUserSchemaOmitPwTs = UserSchema.omit({
  password: true,
  totpSecret: true,
});

export const GetUsersInclueRoleSchema = GetUserSchemaOmitPwTs.extend({
  role: RoleSchema.pick({
    id: true,
    name: true,
  })
    .strict()
    .strip(),
});

export const GetUserParamsSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export const GetUsersResSchema = z
  .object({
    data: z.array(GetUsersInclueRoleSchema),
    totalItem: z.number(),
    page: z.number(),
    limmit: z.number(),
    totalPage: z.number(),
  })
  .strict();

export const CreateUserBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phoneNumber: true,
  avatar: true,
  status: true,
  password: true,
  roleId: true,
}).strict();

export const UpdateUserBodySchema = UserSchema.pick({
  email: true,
  name: true,
  phoneNumber: true,
  avatar: true,
  status: true,
  password: true,
  roleId: true,
})
  .partial()
  .strict();

export type GetUsersInclueRoleType = z.infer<typeof GetUsersInclueRoleSchema>;
export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUserByIdParamsType = z.infer<typeof GetUserParamsSchema>;
export type UpdateUserBodyType = z.infer<typeof UpdateUserBodySchema>;
export type CreateUserBodyType = z.infer<typeof CreateUserBodySchema>;
