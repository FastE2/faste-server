import { createZodDto } from 'nestjs-zod';
import {
  CreateBrandBodySchema,
  CreateBrandResSchema,
  GetBrandByIdResSchema,
  GetBrandResSchema,
  UpdateBrandBodySchema,
  UpdateBrandResSchema,
} from './brand.schema';

export class CreateBrandBodyDTO extends createZodDto(CreateBrandBodySchema) {}
export class UpdateBrandBodyDTO extends createZodDto(UpdateBrandBodySchema) {}
export class GetBrandResDTO extends createZodDto(GetBrandResSchema) {}
export class GetBrandByIdResDTO extends createZodDto(GetBrandByIdResSchema) {}
export class CreateBrandResDTO extends createZodDto(CreateBrandResSchema) {}
export class UpdateBrandResDTO extends createZodDto(UpdateBrandResSchema) {}
