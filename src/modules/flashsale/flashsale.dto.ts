import { createZodDto } from 'nestjs-zod';
import {
  CreateFlashSaleBodySchema,
  FlashSaleListQuerySchema,
  UpdateFlashSaleStatusBodySchema,
} from './flashsale.schema';
import {
  CreateFlashSaleItemBodySchema,
  GetParamsFlashSaleSchema,
  UpdateFlashSaleItemBodySchema,
} from './flashsale-item.schema';

export class UpdateFlashSaleStatusBodyDTO extends createZodDto(
  UpdateFlashSaleStatusBodySchema,
) {}

export class FlashSaleListQueryDTO extends createZodDto(
  FlashSaleListQuerySchema,
) {}

export class GetParamsFlashSaleDTO extends createZodDto(
  GetParamsFlashSaleSchema,
) {}

export class FlashSaleListSellerQueryDTO extends createZodDto(
  FlashSaleListQuerySchema.omit({
    createdById: true,
    type: true,
  }),
) {}

export class CreateFlashSaleBodyDTO extends createZodDto(
  CreateFlashSaleBodySchema.omit({ type: true }),
) {}

// Flash sale item
export class CreateFlashSaleItemBodyDTO extends createZodDto(
  CreateFlashSaleItemBodySchema.array(),
) {}

export class UpdateFlashSaleItemBodyDTO extends createZodDto(
  UpdateFlashSaleItemBodySchema,
) {}
