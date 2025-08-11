import { createZodDto } from 'nestjs-zod';
import {
  EmptyBodySchema,
  PaginationQuerySchema,
} from '../schemas/request.schema';

export class EmptyBodyDTO extends createZodDto(EmptyBodySchema) {}

export class PaginationQueryDTO extends createZodDto(PaginationQuerySchema) {}
