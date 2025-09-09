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
import { DeliveryTypeService } from './delivery-type.service';
import {
  CreateDeliveryTypeBodyDTO,
  CreateDeliveryTypeResDTO,
  GetDeliveryTypeByIdResDTO,
  GetDeliveryTypeResDTO,
  UpdateDeliveryTypeBodyDTO,
  UpdateDeliveryTypeResDTO,
} from './delivery-type.dto';

@Controller('delivery-type')
export class DeliveryTypeController {
  constructor(private readonly deliveryTypeService: DeliveryTypeService) {}

  @Get()
  @ZodSerializerDto(GetDeliveryTypeResDTO)
  getAllDeliveryTypes(@Query() query: PaginationQueryDTO) {
    return this.deliveryTypeService.getAllDeliveryTypes(query);
  }
  @Post()
  @ZodSerializerDto(CreateDeliveryTypeResDTO)
  createDeliveryType(
    @Body() body: CreateDeliveryTypeBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.deliveryTypeService.createDeliveryType({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetDeliveryTypeByIdResDTO)
  getById(@Param() params: GetParamsDTO) {
    return this.deliveryTypeService.getDeliveryTypeById(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateDeliveryTypeResDTO)
  updateDeliveryType(
    @Body() body: UpdateDeliveryTypeBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.deliveryTypeService.updateDeliveryType({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteDeliveryType(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.deliveryTypeService.deleteDeliveryType({
      id: params.id,
      deletedById: userId,
    });
  }
}
