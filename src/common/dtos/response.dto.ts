import { createZodDto } from 'nestjs-zod';
import { MessageResSchema } from '../schemas/response.schema';

export class MessageResDto extends createZodDto(MessageResSchema) {}
