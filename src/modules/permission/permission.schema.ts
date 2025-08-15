import {
  PermissionSchema,
  RolePermissionsSchema,
} from 'src/common/schemas/permission.schema';
import { RoleSchema } from 'src/common/schemas/role.schema';
import { z } from 'zod';

export const GetPermissionParamsSchema = z.object({
  id: z.coerce.number(),
});

export const CreatePermissionBodySchema = PermissionSchema.pick({
  name: true,
  path: true,
  method: true,
  module: true,
}).strict();

export const UpdatePermissionBodySchema = CreatePermissionBodySchema;

export const GetPermissionsResSchema = z.array(PermissionSchema);
export const CreatePermissionResSchema = PermissionSchema;
export const GetPermissionByIdResSchema = PermissionSchema;
export const UpdatePermissionResSchema = PermissionSchema.extend({
  roles: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
    }),
  ),
});

export type CreatePermissionBodyType = z.infer<
  typeof CreatePermissionBodySchema
>;
export type UpdatePermissionBodyType = z.infer<
  typeof UpdatePermissionBodySchema
>;
export type GetPermissionParamsType = z.infer<typeof GetPermissionParamsSchema>;
