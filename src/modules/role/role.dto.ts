import { createZodDto } from 'nestjs-zod';
import {
  CreateRoleBodySchema,
  CreateRoleResSchema,
  GetRoleByIdResSchema,
  GetRoleParamsSchema,
  GetRolesQuerySchema,
  GetRolesResSchema,
  UpdateRoleBodySchema,
  UpdateRoleResSchema,
} from './role.schema';

export class CreateRoleBodyDTO extends createZodDto(CreateRoleBodySchema) {}
export class GetRolesQueryDTO extends createZodDto(GetRolesQuerySchema) {}
export class GetRoleParamsDTO extends createZodDto(GetRoleParamsSchema) {}
export class UpdateRoleBodyDTO extends createZodDto(UpdateRoleBodySchema) {}
export class GetRolesResDTO extends createZodDto(GetRolesResSchema) {}
export class CreateRoleResDTO extends createZodDto(CreateRoleResSchema) {}
export class GetRoleByIdResDTO extends createZodDto(GetRoleByIdResSchema) {}
export class UpdateRoleResDTO extends createZodDto(UpdateRoleResSchema) {}
