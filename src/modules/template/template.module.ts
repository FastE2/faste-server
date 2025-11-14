import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateRepository } from './template.repository';
import { TemplateController } from './template.controller';

@Module({
  imports: [],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
})
export class TemplateModule {}
