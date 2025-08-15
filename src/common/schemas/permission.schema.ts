import { z } from 'zod';
import { RoleSchema } from './role.schema';
import { HTTPMethod } from '@prisma/client';

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  path: z.string(),
  method: z.nativeEnum(HTTPMethod),
  module: z.string(),
  isActive: z.boolean(),
  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RolePermissionsSchema = RoleSchema.extend({
  permissions: z.array(PermissionSchema),
});

export type RolePermissionsType = z.infer<typeof RolePermissionsSchema>;
export type PermissionType = z.infer<typeof PermissionSchema>;
