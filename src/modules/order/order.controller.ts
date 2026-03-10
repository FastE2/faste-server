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
import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { OrderService } from './order.service';
import {
  CreateOrderBodyDTO,
  GetOrderListQueryDTO,
  UpdateOrderStatusBodyDTO,
} from './order.dto';
import { ActiveRolePermissions } from 'src/common/decorators/active-role-permissions.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(
    @Query() query: GetOrderListQueryDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.getOrdersByUser({ userId, query });
  }

  @Get('seller')
  getOrdersByShop(
    @Query() query: GetOrderListQueryDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.getOrdersBySeller({ userId, query });
  }

  @Get('shop/:id')
  getByIdByShop(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.getOrderDetailByShop({ userId, id: params.id });
  }

  @Post()
  createOrder(
    @Body() body: CreateOrderBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.createOrder({
      body,
      userId,
    });
  }

  @Patch('cancel/:id')
  @ZodSerializerDto(MessageResDTO)
  cancelOrder(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.cancelOrder({ userId, id: params.id });
  }

  @Get('/:id')
  getById(@Param() params: GetParamsDTO, @ActiveUser('userId') userId: number) {
    return this.orderService.getOrderDetailByUser({ userId, id: params.id });
  }

  @Get('tx/:id')
  getTXById(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.getTransactionDetailByUser({
      userId,
      id: params.id,
    });
  }

  @Patch('/status/:id') // Seller: PENDING_PICKUP, PENDING_DELIVERY, CANCELLED; admin thì tất cả; client: chỉ có thể CANCELLED
  updateOrderStatus(
    @Body() body: UpdateOrderStatusBodyDTO,
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.orderService.updateOrderStatus({
      orderId: params.id,
      roleName,
      userId,
      status: body.status,
    });
  }

  // @Patch('/:id')
  // @ZodSerializerDto(UpdateBrandResDTO)
  // updateUser(
  //   @Body() body: any,
  //   @Param() params: GetParamsDTO,
  //   @ActiveUser('userId') userId: number,
  // ) {
  //   return this.orderService.updateRole({
  //     id: params.id,
  //     data: body,
  //     updatedById: userId,
  //   });
  // }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteUser(
    @Param() params: GetParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.orderService.deleteOrder({
      id: params.id,
      deletedById: userId,
    });
  }
}
