import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { CartRepository } from './cart.repository';
import { AddToCartBodyType, UpdateCartItemBodyType } from './cart.schema';
export declare class CartService {
    private readonly cartRepository;
    constructor(cartRepository: CartRepository);
    getCarts(userId: number, query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    create(userId: number, body: AddToCartBodyType): Promise<any>;
    update({ id, userId, body, }: {
        id: number;
        userId: number;
        body: UpdateCartItemBodyType;
    }): Promise<any>;
    delete({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<{
        message: string;
    }>;
}
