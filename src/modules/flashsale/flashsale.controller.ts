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
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { BrandService } from './flashsale.service';
import {
  CreateBrandBodyDTO,
  CreateBrandResDTO,
  GetBrandByIdResDTO,
  GetBrandResDTO,
  UpdateBrandBodyDTO,
  UpdateBrandResDTO,
} from './flashsale.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ZodSerializerDto(GetBrandResDTO)
  getAllBrands(@Query() query: PaginationQueryDTO) {
    return this.brandService.getAllBrands(query);
  }
  @Post()
  @ZodSerializerDto(CreateBrandResDTO)
  createBrand(
    @Body() body: CreateBrandBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.createBrand({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetBrandByIdResDTO)
  getById(@Param() params: GetParamsDTO) {
    return this.brandService.getBrandById(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateBrandResDTO)
  updateBrand(
    @Body() body: UpdateBrandBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.updateBrand({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteBrand(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.brandService.deleteBrand({
      id: params.id,
      deletedById: userId,
    });
  }
}
