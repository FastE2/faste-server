import { createZodDto } from 'nestjs-zod';
import {
  CreateReviewBodySchema,
  CreateReviewResSchema,
  GetReviewByIdResSchema,
  GetReviewResSchema,
  ReviewQuerySchema,
  UpdateReviewBodySchema,
  UpdateReviewResSchema,
} from './review.schema';

export class CreateReviewBodyDTO extends createZodDto(CreateReviewBodySchema) {}
export class UpdateReviewBodyDTO extends createZodDto(UpdateReviewBodySchema) {}
export class GetReviewResDTO extends createZodDto(GetReviewResSchema) {}
export class GetReviewByIdResDTO extends createZodDto(GetReviewByIdResSchema) {}
export class CreateReviewResDTO extends createZodDto(CreateReviewResSchema) {}
export class UpdateReviewResDTO extends createZodDto(UpdateReviewResSchema) {}
export class ReviewQueryDTO extends createZodDto(ReviewQuerySchema) {}
