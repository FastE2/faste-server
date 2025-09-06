import { createZodDto } from 'nestjs-zod';
import {
  CreateOrderBodySchema,
  GetOrderListQuerySchema,
  UpdateOrderStatusBodySchema,
} from './order.schema';
export class GetOrderListQueryDTO extends createZodDto(
  GetOrderListQuerySchema,
) {}
export class CreateOrderBodyDTO extends createZodDto(CreateOrderBodySchema) {}
export class UpdateOrderStatusBodyDTO extends createZodDto(
  UpdateOrderStatusBodySchema,
) {}
