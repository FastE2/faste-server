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
import { AddressShipService } from './address-ship.service';
import {
  CreateAddressShipBodyDTO,
  CreateAddressShipResDTO,
  GetAddressShipByIdResDTO,
  GetAddressShipResDTO,
  UpdateAddressShipBodyDTO,
  UpdateAddressShipResDTO,
} from './address-ship.dto';

@Controller('address-ship')
export class AddressShipController {
  constructor(private readonly addressShipService: AddressShipService) {}

  @Get()
  @ZodSerializerDto(GetAddressShipResDTO)
  getAllAddressShips(
    @Query() query: PaginationQueryDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.addressShipService.getAllAddressShips(userId, query);
  }
  @Post()
  @ZodSerializerDto(CreateAddressShipResDTO)
  createAddressShip(
    @Body() body: CreateAddressShipBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.addressShipService.createAddressShip({
      data: body,
      userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetAddressShipByIdResDTO)
  getAddressShipById(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.addressShipService.getAddressShipById(userId, params.id);
  }

  @Get('/default/:id')
  @ZodSerializerDto(GetAddressShipByIdResDTO)
  getAddressShipByIdIsDefault(@Param() params: GetParamsDTO) {
    return this.addressShipService.getAddressShipByIdIsDefault(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateAddressShipResDTO)
  updateAddressShip(
    @Body() body: UpdateAddressShipBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.addressShipService.updateAddressShip({
      id: params.id,
      data: body,
      userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteAddressShip(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.addressShipService.deleteAddressShip({
      id: params.id,
      userId,
    });
  }
}
