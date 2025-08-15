import { createZodDto } from 'nestjs-zod';
import { PresignedUploadFileBodySchema } from './media.schema';
import { PaginationQuerySchema } from 'src/common/schemas/request.schema';

export class PresignedUploadFileBodyDTO extends createZodDto(
  PresignedUploadFileBodySchema,
) {}

export class GetMediasQueryDTO extends createZodDto(PaginationQuerySchema) {}
