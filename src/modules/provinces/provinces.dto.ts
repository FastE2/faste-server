import { createZodDto } from 'nestjs-zod';
import { GetParamsProvincesSchema } from './provinces.schema';

export class GetParamsProvincesDTO extends createZodDto(
  GetParamsProvincesSchema,
) {}
