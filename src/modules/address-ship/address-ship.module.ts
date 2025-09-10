import { Module } from '@nestjs/common';
import { AddressShipController } from './address-ship.controller';
import { AddressShipService } from './address-ship.service';
import { AddressShipRepository } from './address-ship.repository';

@Module({
  imports: [],
  controllers: [AddressShipController],
  providers: [AddressShipService, AddressShipRepository],
})
export class AddressShipModule {}
