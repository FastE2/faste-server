import { createZodDto } from 'nestjs-zod';
import { MessageResSchema } from '../schemas/response.schema';

export class MessageResDTO extends createZodDto(MessageResSchema) {}
