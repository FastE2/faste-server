import { createZodDto } from 'nestjs-zod';
import {
  CreateProductBodySchema,
  GetAllProductPublicResSchema,
  GetParamSlugIdSchema,
  GetProductsManageQuerySchema,
  GetProductsQuerySchema,
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

export class GetProductsQueryDTO extends createZodDto(GetProductsQuerySchema) {}

export class GetProductsManageQueryDTO extends createZodDto(
  GetProductsManageQuerySchema,
) {}

export class GetAllProductPublicResDTO extends createZodDto(
  GetAllProductPublicResSchema,
) {}
