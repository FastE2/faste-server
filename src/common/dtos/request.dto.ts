import { createZodDto } from 'nestjs-zod';
import {
  DeleteBodySchema,
  EmptyBodySchema,
  GetParamsSchema,
  PaginationQuerySchema,
} from '../schemas/request.schema';

export class EmptyBodyDTO extends createZodDto(EmptyBodySchema) {}

export class PaginationQueryDTO extends createZodDto(PaginationQuerySchema) {}

export class DeleteBodyDTO extends createZodDto(DeleteBodySchema) {}
export class GetParamsDTO extends createZodDto(GetParamsSchema) {}
