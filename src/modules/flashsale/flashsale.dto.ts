import { createZodDto } from 'nestjs-zod';
import { UpdateFlashSaleStatusBodySchema } from './flashsale.schema';

export class UpdateFlashSaleStatusBodyDTO extends createZodDto(
  UpdateFlashSaleStatusBodySchema,
) {}
