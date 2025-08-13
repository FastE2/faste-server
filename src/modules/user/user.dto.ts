import { createZodDto } from 'nestjs-zod';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import { GetUserByIdParamsSchema, GetUsersInclueRoleSchema, GetUsersResSchema } from './user.schema';

export class GetUsersQueryDTO extends createZodDto(PaginationQuerySchema) {}
export class GetUsersResDTO extends createZodDto(GetUsersResSchema) {}
export class GetUserByIdParamsDTO extends createZodDto(GetUserByIdParamsSchema) {}
export class GetUserByIdResDTO extends createZodDto(GetUsersInclueRoleSchema) {}
