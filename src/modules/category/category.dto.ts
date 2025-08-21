import { createZodDto } from 'nestjs-zod';
import {
  CreateCategoryBodySchema,
  CreateCategoryResSchema,
  GetCategoryByIdResSchema,
  GetCategoryResSchema,
  UpdateCategoryBodySchema,
  UpdateCategoryResSchema,
} from './category.schema';

export class CreateCategoryBodyDTO extends createZodDto(
  CreateCategoryBodySchema,
) {}
export class UpdateCategoryBodyDTO extends createZodDto(
  UpdateCategoryBodySchema,
) {}
export class GetCategoryResDTO extends createZodDto(GetCategoryResSchema) {}
export class GetCategoryByIdResDTO extends createZodDto(
  GetCategoryByIdResSchema,
) {}
export class CreateCategoryResDTO extends createZodDto(
  CreateCategoryResSchema,
) {}
export class UpdateCategoryResDTO extends createZodDto(
  UpdateCategoryResSchema,
) {}
