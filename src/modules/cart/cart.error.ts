import { UnprocessableEntityException } from '@nestjs/common';

export const UnprocessableEntityQuantitySKUInValidException =
  new UnprocessableEntityException({
    message: 'Error.QuantitySKUInvalid',
    path: 'quantity',
  });
