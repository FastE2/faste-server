"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFAEnableResDTO = exports.TwoFADisableBodyDTO = exports.ForgotPasswordBodyDTO = exports.SendOTPBodyDTO = exports.RefreshTokenResDTO = exports.LoginResDTO = exports.LoginBodyDTO = exports.RegisterResDTO = exports.RegisterBodyDTO = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const auth_schema_1 = require("./auth.schema");
class RegisterBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.RegisterBodySchema) {
}
exports.RegisterBodyDTO = RegisterBodyDTO;
class RegisterResDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.RegisterResSchema) {
}
exports.RegisterResDTO = RegisterResDTO;
class LoginBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.LoginBodySchema) {
}
exports.LoginBodyDTO = LoginBodyDTO;
class LoginResDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.LoginResSchema) {
}
exports.LoginResDTO = LoginResDTO;
class RefreshTokenResDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.RefreshTokenResSchema) {
}
exports.RefreshTokenResDTO = RefreshTokenResDTO;
class SendOTPBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.SendOTPBodySchema) {
}
exports.SendOTPBodyDTO = SendOTPBodyDTO;
class ForgotPasswordBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.ForgotPasswordBodySchema) {
}
exports.ForgotPasswordBodyDTO = ForgotPasswordBodyDTO;
class TwoFADisableBodyDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.TwoFADisableBodySchema) {
}
exports.TwoFADisableBodyDTO = TwoFADisableBodyDTO;
class TwoFAEnableResDTO extends (0, nestjs_zod_1.createZodDto)(auth_schema_1.TwoFAEnableResSchema) {
}
exports.TwoFAEnableResDTO = TwoFAEnableResDTO;
//# sourceMappingURL=auth.dto.js.map