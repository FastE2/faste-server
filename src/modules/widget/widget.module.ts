import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetRepository } from './widget.repository';
import { WidgetController } from './widget.controller';

@Module({
  imports: [],
  controllers: [WidgetController],
  providers: [WidgetService, WidgetRepository],
})
export class WidgetModule {}
