import { createZodDto } from 'nestjs-zod';
import {
  ForgotPasswordBodySchema,
  LoginBodySchema,
  LoginResSchema,
  RefreshTokenResSchema,
  RegisterBodySchema,
  RegisterResSchema,
  SendOTPBodySchema,
  TwoFADisableBodySchema,
  TwoFAEnableResSchema,
} from './auth.schema';

// -- Register
export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

// -- Login
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}

// -- RefreshToken
export class RefreshTokenResDTO extends createZodDto(RefreshTokenResSchema) {}

// -- SendOTP
export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) {}

// -- ForgotPassword
export class ForgotPasswordBodyDTO extends createZodDto(
  ForgotPasswordBodySchema,
) {}

// -- 2FA
export class TwoFADisableBodyDTO extends createZodDto(TwoFADisableBodySchema) {}
export class TwoFAEnableResDTO extends createZodDto(TwoFAEnableResSchema) {}
