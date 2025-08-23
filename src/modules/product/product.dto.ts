import { createZodDto } from 'nestjs-zod';
import {
  CreateProductBodySchema,
  GetParamSlugIdSchema,
  UpdateCategoryBodySchema,
  UpdateProductBodySchema,
} from './product.schema';

export class CreateProductBodyDTO extends createZodDto(
  CreateProductBodySchema,
) {}
export class GetParamSlugIdDTO extends createZodDto(GetParamSlugIdSchema) {}
export class UpdateCategoryBodyDTO extends createZodDto(
  UpdateCategoryBodySchema,
) {}
export class UpdateProductBodyDTO extends createZodDto(
  UpdateProductBodySchema,
) {}
