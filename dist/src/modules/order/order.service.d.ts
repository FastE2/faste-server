import { CreateOrderBodyType, GetOrderListQueryType } from './order.schema';
import { OrderRepository } from './order.repository';
import { OrderStatusType } from 'src/common/constants/order.constant';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { TransactionRepository } from './transaction.repository';
export declare class OrderService {
    private readonly orderRepository;
    private readonly transactionRepository;
    private readonly commonUserRepository;
    constructor(orderRepository: OrderRepository, transactionRepository: TransactionRepository, commonUserRepository: CommonUserRepository);
    getOrdersByUser({ userId, query, }: {
        userId: number;
        query: GetOrderListQueryType;
    }): Promise<any>;
    getOrdersBySeller({ userId, query, }: {
        userId: number;
        query: GetOrderListQueryType;
    }): Promise<any>;
    cancelOrder({ userId, id }: {
        userId: number;
        id: number;
    }): Promise<{
        message: string;
    }>;
    getOrderDetailByUser({ userId, id }: {
        userId: number;
        id: number;
    }): Promise<any>;
    getOrderDetailByShop({ userId, id }: {
        userId: number;
        id: number;
    }): Promise<any>;
    getTransactionDetailByUser({ userId, id, }: {
        userId: number;
        id: number;
    }): Promise<any>;
    createOrder({ body, userId, }: {
        body: CreateOrderBodyType;
        userId: number;
    }): Promise<{
        transaction: any;
        orders: any;
    }>;
    updateOrderStatus({ orderId, status, userId, roleName, }: {
        orderId: number;
        status: OrderStatusType;
        userId: number;
        roleName: string;
    }): Promise<any>;
    deleteOrder({ id, deletedById }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
