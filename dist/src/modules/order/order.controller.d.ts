import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { OrderService } from './order.service';
import { CreateOrderBodyDTO, GetOrderListQueryDTO, UpdateOrderStatusBodyDTO } from './order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(query: GetOrderListQueryDTO, userId: number): Promise<any>;
    getOrdersByShop(query: GetOrderListQueryDTO, userId: number): Promise<any>;
    getByIdByShop(params: GetParamsDTO, userId: number): Promise<any>;
    createOrder(body: CreateOrderBodyDTO, userId: number): Promise<{
        transaction: any;
        orders: any;
    }>;
    cancelOrder(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
    getById(params: GetParamsDTO, userId: number): Promise<any>;
    getTXById(params: GetParamsDTO, userId: number): Promise<any>;
    updateOrderStatus(body: UpdateOrderStatusBodyDTO, params: GetParamsDTO, userId: number, roleName: string): Promise<any>;
    deleteUser(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
