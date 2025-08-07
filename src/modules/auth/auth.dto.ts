import { createZodDto } from 'nestjs-zod';
import { RegisterBodySchema, RegisterResSchema } from './auth.schema';

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}
