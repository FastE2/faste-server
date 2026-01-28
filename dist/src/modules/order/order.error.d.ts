import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
export declare const ForbiddenActionOnBaseRoleException: ForbiddenException;
export declare const NotFoundCartItemException: NotFoundException;
export declare const OutOfStockSKUException: (sku: string) => BadRequestException;
export declare const ProductNotBelongToShopException: () => ForbiddenException;
export declare const CannotCancelOrderException: () => BadRequestException;
