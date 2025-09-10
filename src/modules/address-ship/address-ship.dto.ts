import { createZodDto } from 'nestjs-zod';
import {
  CreateAddressShipBodySchema,
  CreateAddressShipResSchema,
  GetAddressShipByIdResSchema,
  GetAddressShipResSchema,
  UpdateAddressShipBodySchema,
  UpdateAddressShipResSchema,
} from './address-ship.schema';

export class CreateAddressShipBodyDTO extends createZodDto(
  CreateAddressShipBodySchema,
) {}
export class UpdateAddressShipBodyDTO extends createZodDto(
  UpdateAddressShipBodySchema,
) {}
export class GetAddressShipResDTO extends createZodDto(
  GetAddressShipResSchema,
) {}
export class GetAddressShipByIdResDTO extends createZodDto(
  GetAddressShipByIdResSchema,
) {}
export class CreateAddressShipResDTO extends createZodDto(
  CreateAddressShipResSchema,
) {}
export class UpdateAddressShipResDTO extends createZodDto(
  UpdateAddressShipResSchema,
) {}
