import { createZodDto } from 'nestjs-zod';
import {
  CreateLanguageBodySchema,
  UpdateLanguageBodySchema,
} from './language.schema';

export class CreateLanguageBodyDTO extends createZodDto(
  CreateLanguageBodySchema,
) {}
export class UpdateLanguageBodyDTO extends createZodDto(
  UpdateLanguageBodySchema,
) {}
