import { BadRequestException } from '@nestjs/common';

export const IncorrectPasswordException = new BadRequestException(
  'Error.IncorrectPasswordException',
);
