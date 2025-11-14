import { createZodDto } from 'nestjs-zod';
import {
  CreateTemplateBodySchema,
  UpdateTemplateBodySchema,
} from './widget.schema';

export class CreateTemplateBodyDTO extends createZodDto(
  CreateTemplateBodySchema,
) {}
export class UpdateTemplateBodyDTO extends createZodDto(
  UpdateTemplateBodySchema,
) {}
