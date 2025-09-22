import { Module } from '@nestjs/common';
import { BrandController } from './flashsale.controller';
import { BrandService } from './flashsale.service';
import { BrandRepository } from './flashsale.repository';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class BrandModule {}
