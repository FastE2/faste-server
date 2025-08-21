import { ForbiddenException } from '@nestjs/common';

export const ForbiddenActionOnBaseRoleException = new ForbiddenException(
  'Error.ForbiddenActionOnBaseRole',
);
