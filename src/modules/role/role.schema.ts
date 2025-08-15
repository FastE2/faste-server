import { RolePermissionsSchema } from 'src/common/schemas/permission.schema';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import { RoleSchema } from 'src/common/schemas/role.schema';
import { z } from 'zod';

export const GetRolesQuerySchema = PaginationQuerySchema;

export const GetRoleParamsSchema = z.object({
  id: z.coerce.number(),
});

export const CreateRoleBodySchema = RoleSchema.pick({
  name: true,
  description: true,
  isActive: true,
});

export const UpdateRoleBodySchema = RoleSchema.pick({
  name: true,
  description: true,
  isActive: true,
})
  .extend({
    permissionIds: z.array(z.number()),
  })
  .strict();

export const GetRolesResSchema = z.array(RoleSchema);
export const CreateRoleResSchema = RoleSchema;
export const GetRoleByIdResSchema = RoleSchema;
export const UpdateRoleResSchema = RolePermissionsSchema;

export type CreateRoleBodyType = z.infer<typeof CreateRoleBodySchema>;
export type UpdateRoleBodyType = z.infer<typeof UpdateRoleBodySchema>;
export type GetRolesQueryType = z.infer<typeof GetRolesQuerySchema>;
export type GetRoleParamsType = z.infer<typeof GetRoleParamsSchema>;
