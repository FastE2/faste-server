import { createZodDto } from 'nestjs-zod';
import {
  CreateWidgetBodySchema,
  UpdateManyWidgetsSchema,
  UpdateWidgetBodySchema,
} from './widget.schema';

export class CreateWidgetBodyDTO extends createZodDto(CreateWidgetBodySchema) {}
export class UpdateWidgetBodyDTO extends createZodDto(UpdateWidgetBodySchema) {}
export class UpdateManyWidgetsDTO extends createZodDto(
  UpdateManyWidgetsSchema,
) {}
