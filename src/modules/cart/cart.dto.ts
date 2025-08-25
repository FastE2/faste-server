import { createZodDto } from 'nestjs-zod';
import {
  AddToCartBodySchema,
  CartItemSchema,
  UpdateCartItemBodySchema,
} from './cart.schema';

export class CartItemResDTO extends createZodDto(CartItemSchema) {}
export class AddToCartBodyDTO extends createZodDto(AddToCartBodySchema) {}
export class UpdateCartItemBodyDTO extends createZodDto(
  UpdateCartItemBodySchema,
) {}
