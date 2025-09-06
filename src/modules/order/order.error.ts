import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export const ForbiddenActionOnBaseRoleException = new ForbiddenException(
  'Error.ForbiddenActionOnBaseRole',
);

export const NotFoundCartItemException = new NotFoundException(
  'Error.NotFoundCartItemException',
);

export const OutOfStockSKUException = (sku: string) =>
  new BadRequestException(`Error.OutOfStockSKUException: ${sku}`);

export const ProductNotBelongToShopException = () =>
  new ForbiddenException(`Error.ProductNotBelongToShopException`);

export const CannotCancelOrderException = () =>
  new BadRequestException(`Error.CannotCancelOrderException`);
