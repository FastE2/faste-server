import { ConflictException, NotFoundException } from '@nestjs/common';

export const NotFoundRecordException = new NotFoundException({
  message: 'Error.NotFoundRecord',
});

export const NotFoundRecordSKUException = new NotFoundException({
  message: 'Error.NotFoundRecordSKU',
});

export const EmailAlreadyExistsException = new ConflictException({
  message: 'Error.EmailAlreadyExists',
  path: 'email',
});

export const NotFoundUserException = new NotFoundException({
  message: 'Error.NotFoundUser',
});
