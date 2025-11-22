import { createZodDto } from 'nestjs-zod';
import { CreateProductSearchSchema } from '../search.schema';

export class CreateProductSearchDTO extends createZodDto(
  CreateProductSearchSchema,
) {}
