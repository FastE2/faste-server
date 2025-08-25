import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartController } from './cart.controller';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
