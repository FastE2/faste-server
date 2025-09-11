import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export const ForbiddenActionOnBaseRoleException = new ForbiddenException(
  'Error.ForbiddenActionOnBaseRole',
);

export const ExistedShopException = new BadRequestException({
  message: 'Error.ExistedShop',
});
