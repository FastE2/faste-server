import { Module } from '@nestjs/common';
import { DeliveryTypeController } from './delivery-type.controller';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeRepository } from './delivery-type.repository';

@Module({
  imports: [],
  controllers: [DeliveryTypeController],
  providers: [DeliveryTypeService, DeliveryTypeRepository],
})
export class DeliveryTypeModule {}
