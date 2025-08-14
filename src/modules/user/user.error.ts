import { ForbiddenException } from '@nestjs/common';

export const CannotUpdateOrDeleteYourselfException = new ForbiddenException(
  'Error.CannotUpdateOrDeleteYourselfException',
);
