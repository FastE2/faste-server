"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeTypeType = exports.ConditionGuard = exports.AuthType = exports.REQUEST_ROLE_PERMISSIONS = exports.REQUEST_USER_KEY = exports.AUTH_NOT_REQUIRED = exports.AUTH_TYPE_KEY = void 0;
exports.AUTH_TYPE_KEY = 'auth-type';
exports.AUTH_NOT_REQUIRED = 'auth-not-required';
exports.REQUEST_USER_KEY = 'user';
exports.REQUEST_ROLE_PERMISSIONS = "role-permissions";
exports.AuthType = {
    Bearer: 'Bearer',
    None: 'None',
    PaymentAPIKey: 'PaymentAPIKey',
};
exports.ConditionGuard = {
    And: 'and',
    Or: 'or',
};
exports.VerificationCodeTypeType = {
    REGISTER: 'REGISTER',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    LOGIN: 'LOGIN',
    DISABLE_2FA: 'DISABLE_2FA',
};
//# sourceMappingURL=auth.constant.js.map