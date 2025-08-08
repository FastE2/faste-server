import { createZodDto } from 'nestjs-zod';
import {
  LoginBodySchema,
  LoginResSchema,
  RefreshTokenResSchema,
  RegisterBodySchema,
  RegisterResSchema,
} from './auth.schema';

// -- Register
export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) {}
export class RegisterResDTO extends createZodDto(RegisterResSchema) {}

// -- Login
export class LoginBodyDTO extends createZodDto(LoginBodySchema) {}
export class LoginResDTO extends createZodDto(LoginResSchema) {}

// -- RefreshToken
export class RefreshTokenResDTO extends createZodDto(RefreshTokenResSchema) {}
