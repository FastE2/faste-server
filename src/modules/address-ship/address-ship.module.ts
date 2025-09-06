import { Module } from '@nestjs/common';
import { BrandController } from './address-ship.controller';
import { BrandService } from './address-ship.service';
import { BrandRepository } from './address-ship.repository';

@Module({
  imports: [],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
})
export class AddressShipModule {}
