import { createZodDto } from 'nestjs-zod';
import {
  CreateShopResSchema,
  GetShopByIdResSchema,
  GetShopResSchema,
  RegisterShopBodySchema,
  UpdateShopBodySchema,
  UpdateShopResSchema,
} from './shop.schema';

export class UpdateShopBodyDTO extends createZodDto(UpdateShopBodySchema) {}
export class GetShopResDTO extends createZodDto(GetShopResSchema) {}
export class GetShopByIdResDTO extends createZodDto(GetShopByIdResSchema) {}
export class CreateShopResDTO extends createZodDto(CreateShopResSchema) {}
export class UpdateShopResDTO extends createZodDto(UpdateShopResSchema) {}
export class RegisterShopBodyDTO extends createZodDto(RegisterShopBodySchema) {}
