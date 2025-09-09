import { createZodDto } from 'nestjs-zod';
import {
  CreateDeliveryTypeBodySchema,
  CreateDeliveryTypeResSchema,
  GetDeliveryTypeByIdResSchema,
  GetDeliveryTypeResSchema,
  UpdateDeliveryTypeBodySchema,
  UpdateDeliveryTypeResSchema,
} from './delivery-type.schema';

export class CreateDeliveryTypeBodyDTO extends createZodDto(
  CreateDeliveryTypeBodySchema,
) {}
export class UpdateDeliveryTypeBodyDTO extends createZodDto(
  UpdateDeliveryTypeBodySchema,
) {}
export class GetDeliveryTypeResDTO extends createZodDto(
  GetDeliveryTypeResSchema,
) {}
export class GetDeliveryTypeByIdResDTO extends createZodDto(
  GetDeliveryTypeByIdResSchema,
) {}
export class CreateDeliveryTypeResDTO extends createZodDto(
  CreateDeliveryTypeResSchema,
) {}
export class UpdateDeliveryTypeResDTO extends createZodDto(
  UpdateDeliveryTypeResSchema,
) {}
