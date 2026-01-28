import { CartService } from './cart.service';
import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { AddToCartBodyDTO, UpdateCartItemBodyDTO } from './cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: number, query: PaginationQueryDTO): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    addToCart(body: AddToCartBodyDTO, userId: number): Promise<any>;
    updateCartItem(userId: number, param: GetParamsDTO, body: UpdateCartItemBodyDTO): Promise<any>;
    deleteCart(userId: number, param: GetParamsDTO): Promise<{
        message: string;
    }>;
}
