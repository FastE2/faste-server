"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUserInfoError = exports.TOTPNotEnabledException = exports.InvalidTokenTOTPException = exports.TwoFactorAlreadyEnabledException = exports.ExpiredOTPException = exports.InvalidOTPException = exports.InvalidTokenException = exports.InvalidPasswordException = exports.EmailNotExistsException = void 0;
const common_1 = require("@nestjs/common");
exports.EmailNotExistsException = new common_1.NotFoundException({
    message: 'Error.EmailNotExists',
    path: 'email',
});
exports.InvalidPasswordException = new common_1.BadRequestException({
    message: 'Error.InvalidPassword',
    path: 'password',
});
exports.InvalidTokenException = new common_1.UnauthorizedException({
    message: 'Error.InvalidToken',
    path: 'token',
});
exports.InvalidOTPException = new common_1.NotFoundException({
    message: 'Error.InvalidOTP',
    path: 'code',
});
exports.ExpiredOTPException = new common_1.BadRequestException({
    message: 'Error.ExpiredOTPException',
    path: 'code',
});
exports.TwoFactorAlreadyEnabledException = new common_1.BadRequestException({
    message: 'Error.TwoFactorAlreadyEnabled',
    path: '2fa',
});
exports.InvalidTokenTOTPException = new common_1.BadRequestException({
    message: 'Error.InvalidTokenTOTPException',
    path: 'code',
});
exports.TOTPNotEnabledException = new common_1.BadRequestException({
    message: 'Error.TOTPNotEnabledException',
    path: '2fa',
});
exports.GoogleUserInfoError = new common_1.BadRequestException({
    message: 'Error.GoogleUserInfoError',
    path: 'google',
});
//# sourceMappingURL=auth.error.js.map