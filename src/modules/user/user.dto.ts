import { createZodDto } from 'nestjs-zod';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import {
  GetUserParamsSchema,
  GetUserSchemaOmitPwTs,
  GetUsersInclueRoleSchema,
  GetUsersResSchema,
  UpdateUserBodySchema,
} from './user.schema';

export class GetUsersQueryDTO extends createZodDto(PaginationQuerySchema) {}
export class GetUsersResDTO extends createZodDto(GetUsersResSchema) {}
export class GetUserParamsDTO extends createZodDto(GetUserParamsSchema) {}
export class GetUserByIdResDTO extends createZodDto(GetUsersInclueRoleSchema) {}
export class UpdateUserBodyDTO extends createZodDto(UpdateUserBodySchema) {}
export class UpdateUserResDTO extends createZodDto(GetUserSchemaOmitPwTs) {}
