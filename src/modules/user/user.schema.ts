import { RoleSchema } from 'src/common/schemas/role.schema';
import { UserSchema } from 'src/common/schemas/user.schema';
import { z } from 'zod';

export const GetUsersInclueRoleSchema = UserSchema.omit({
  password: true,
  totpSecret: true,
}).extend({
  role: RoleSchema.pick({
    id: true,
    name: true,
  })
    .strict()
    .strip(),
});

export const GetUserByIdParamsSchema = z
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

export type GetUsersInclueRoleType = z.infer<typeof GetUsersInclueRoleSchema>;
export type GetUsersResType = z.infer<typeof GetUsersResSchema>;
export type GetUserByIdParamsType = z.infer<typeof GetUserByIdParamsSchema>;
