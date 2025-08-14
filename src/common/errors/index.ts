import { ConflictException, NotFoundException } from '@nestjs/common';

export const NotFoundRecordException = new NotFoundException({
  message: 'Error.NotFoundRecord',
});

export const EmailAlreadyExistsException = new ConflictException({
  message: 'Error.EmailAlreadyExists',
  path: 'email',
});
