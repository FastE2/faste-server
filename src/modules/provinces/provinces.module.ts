import { Module } from '@nestjs/common';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';
import { ProvincesRepository } from './provinces.repository';

@Module({
  imports: [],
  controllers: [ProvincesController],
  providers: [ProvincesService, ProvincesRepository],
})
export class ProvincesModule {}
