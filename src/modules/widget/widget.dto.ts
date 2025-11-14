import { createZodDto } from 'nestjs-zod';
import {
  CreateWidgetBodySchema,
  UpdateWidgetBodySchema,
} from './widget.schema';

export class CreateWidgetBodyDTO extends createZodDto(CreateWidgetBodySchema) {}
export class UpdateWidgetBodyDTO extends createZodDto(UpdateWidgetBodySchema) {}
