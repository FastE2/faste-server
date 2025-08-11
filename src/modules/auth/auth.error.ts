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

export const InvalidOTPException = new NotFoundException({
  message: 'Error.InvalidOTP',
  path: 'code',
});

export const ExpiredOTPException = new BadRequestException({
  message: 'Error.ExpiredOTPException',
  path: 'code',
});

export const TwoFactorAlreadyEnabledException = new BadRequestException({
  message: 'Error.TwoFactorAlreadyEnabled',
  path: '2fa',
});

export const InvalidTokenTOTPException = new BadRequestException({
  message: 'Error.InvalidTokenTOTPException',
  path: 'code',
});

export const TOTPNotEnabledException = new BadRequestException({
  message: 'Error.TOTPNotEnabledException',
  path: '2fa',
});
