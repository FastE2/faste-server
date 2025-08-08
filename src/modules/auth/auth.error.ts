import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const EmailAlreadyExistsException = new ConflictException({
  message: 'Error.EmailAlreadyExists',
  path: 'email',
});

export const EmailNotExistsException = new NotFoundException({
  message: 'Error.EmailNotExists',
  path: 'email',
});

export const InvalidPasswordException = new BadRequestException({
  message: 'Error.InvalidPassword',
  path: 'password',
});

export const InvalidTokenException = new UnauthorizedException({
  message: 'Error.InvalidToken',
  path: 'token',
});
