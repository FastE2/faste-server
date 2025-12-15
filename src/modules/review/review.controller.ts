import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';

import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Ispublic } from 'src/common/decorators/auth.decorator';

import { MessageResDTO } from 'src/common/dtos/response.dto';
import { GetParamsDTO } from 'src/common/dtos/request.dto';

import { ReviewService } from './review.service';
import {
  CreateReviewBodyDTO,
  CreateReviewResDTO,
  GetReviewByIdResDTO,
  GetReviewResDTO,
  ReviewQueryDTO,
  UpdateReviewBodyDTO,
  UpdateReviewResDTO,
} from './review.dto';
import { ActiveRolePermissions } from 'src/common/decorators/active-role-permissions.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @Ispublic()
  @ZodSerializerDto(GetReviewResDTO)
  getAllReviews(@Query() query: ReviewQueryDTO) {
    return this.reviewService.getAllReviews(query);
  }

  @Get('/:id')
  @Ispublic()
  @ZodSerializerDto(GetReviewByIdResDTO)
  getReviewById(@Param() params: GetParamsDTO) {
    return this.reviewService.getReviewById(params.id);
  }

  @Post()
  @ZodSerializerDto(CreateReviewResDTO)
  createReview(
    @Body() body: CreateReviewBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.reviewService.createReview({
      data: body,
      userId,
    });
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateReviewResDTO)
  updateReview(
    @Param() params: GetParamsDTO,
    @Body() body: UpdateReviewBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.reviewService.updateReview({
      id: params.id,
      data: body,
      userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteReview(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.reviewService.deleteReview({
      id: params.id,
      userId,
      roleName,
    });
  }
}
