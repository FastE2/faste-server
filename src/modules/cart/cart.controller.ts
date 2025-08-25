import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ZodSerializerDto } from 'nestjs-zod';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import {
  AddToCartBodyDTO,
  CartItemResDTO,
  UpdateCartItemBodyDTO,
} from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  // @ZodSerializerDto(GetCartResDTO)
  getCart(
    @ActiveUser('userId') userId: number,
    @Query() query: PaginationQueryDTO,
  ) {
    return this.cartService.getCarts(userId, query);
  }

  @Post()
  @ZodSerializerDto(CartItemResDTO)
  addToCart(
    @Body() body: AddToCartBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.cartService.create(userId, body);
  }

  @Put(':id')
  @ZodSerializerDto(CartItemResDTO)
  updateCartItem(
    @ActiveUser('userId') userId: number,
    @Param() param: GetParamsDTO,
    @Body() body: UpdateCartItemBodyDTO,
  ) {
    return this.cartService.update({
      id: param.id,
      userId,
      body,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteCart(
    @ActiveUser('userId') userId: number,
    @Param() param: GetParamsDTO,
  ) {
    return this.cartService.delete({ id: param.id, userId });
  }
}
