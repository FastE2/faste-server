import { createZodDto } from 'nestjs-zod';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';
import { GetUsersResSchema } from './user.schema';

export class GetUsersQueryDTO extends createZodDto(PaginationQuerySchema) {}
export class GetUsersResDTO extends createZodDto(GetUsersResSchema) {}
