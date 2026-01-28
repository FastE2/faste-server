export declare const AUTH_TYPE_KEY = "auth-type";
export declare const AUTH_NOT_REQUIRED = "auth-not-required";
export declare const REQUEST_USER_KEY = "user";
export declare const REQUEST_ROLE_PERMISSIONS = "role-permissions";
export declare const AuthType: {
    readonly Bearer: "Bearer";
    readonly None: "None";
    readonly PaymentAPIKey: "PaymentAPIKey";
};
export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType];
export declare const ConditionGuard: {
    readonly And: "and";
    readonly Or: "or";
};
export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard];
export declare const VerificationCodeTypeType: {
    readonly REGISTER: "REGISTER";
    readonly FORGOT_PASSWORD: "FORGOT_PASSWORD";
    readonly LOGIN: "LOGIN";
    readonly DISABLE_2FA: "DISABLE_2FA";
};
