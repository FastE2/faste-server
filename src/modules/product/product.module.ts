import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import Redis from 'ioredis';

@Module({
  imports: [Redis],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
