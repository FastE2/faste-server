import { createZodDto } from 'nestjs-zod';
import {
  ChangePasswordProfileBodySchema,
  UpdateProfileBodySchema,
} from './profile.schema';

export class UpdateProfileBodyDTO extends createZodDto(
  UpdateProfileBodySchema,
) {}
export class ChangePasswordProfileBodyDTO extends createZodDto(
  ChangePasswordProfileBodySchema,
) {}
