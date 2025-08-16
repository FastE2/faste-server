import { createZodDto } from 'nestjs-zod';
import {
  CreatePermissionBodySchema,
  CreatePermissionResSchema,
  GetPermissionByIdResSchema,
  GetPermissionParamsSchema,
  GetPermissionsResSchema,
  UpdatePermissionBodySchema,
  UpdatePermissionResSchema,
} from './permission.schema';

export class CreatePermissionBodyDTO extends createZodDto(
  CreatePermissionBodySchema,
) {}
export class GetPermissionParamsDTO extends createZodDto(
  GetPermissionParamsSchema,
) {}
export class UpdatePermissionBodyDTO extends createZodDto(
  UpdatePermissionBodySchema,
) {}
export class GetPermissionsResDTO extends createZodDto(
  GetPermissionsResSchema,
) {}
export class CreatePermissionResDTO extends createZodDto(
  CreatePermissionResSchema,
) {}
export class GetPermissionByIdResDTO extends createZodDto(
  GetPermissionByIdResSchema,
) {}
export class UpdatePermissionResDTO extends createZodDto(
  UpdatePermissionResSchema,
) {}
