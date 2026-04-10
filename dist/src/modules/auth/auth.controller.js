"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const user_agent_decorator_1 = require("../../common/decorators/user-agent.decorator");
const request_dto_1 = require("../../common/dtos/request.dto");
const response_dto_1 = require("../../common/dtos/response.dto");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const active_user_decorator_1 = require("../../common/decorators/active-user.decorator");
const google_service_1 = require("./google.service");
const validate_env_1 = __importDefault(require("../../common/configs/validate-env"));
const throttler_1 = require("@nestjs/throttler");
let AuthController = class AuthController {
    authService;
    googleService;
    constructor(authService, googleService) {
        this.authService = authService;
        this.googleService = googleService;
    }
    register(body) {
        return this.authService.register(body);
    }
    login(body, userAgent, ip, res) {
        return this.authService.login({ ...body, userAgent, ip }, res);
    }
    refreshToken(_, req, res) {
        const token = req.cookies['refresh-token'];
        return this.authService.refreshToken(token, res);
    }
    logout(_, req, res) {
        const token = req.cookies['refresh-token'];
        return this.authService.logout(token, res);
    }
    sendOTP(body) {
        return this.authService.sendOTP(body);
    }
    forgotPassowrd(body) {
        return this.authService.forgotPassowrd(body);
    }
    enableTwoFactorAuth(_, userId) {
        return this.authService.enableTwoFactorAuth(userId);
    }
    disableTwoFactorAuth(body, userId) {
        return this.authService.disableTwoFactorAuth({
            totpCode: body.totpCode,
            userId,
        });
    }
    deviceUser(userId) {
        return this.authService.getDevices(userId);
    }
    googleAuth(ip, userAgent) {
        const { url } = this.googleService.getOAuth2ClientUrl({ ip, userAgent });
        return { url };
    }
    async googleAuthCallback(code, state, res) {
        const { accessToken, refreshToken } = await this.googleService.googleCallback({ code, state });
        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/auth',
            maxAge: 1 * 24 * 3600 * 1000,
        });
        return res.redirect(`${validate_env_1.default.GOOGLE_CLIENT_REDIRECT_URI}?accessToken=${accessToken}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.RegisterResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.LoginResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_agent_decorator_1.UserAgent)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginBodyDTO, String, String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.RefreshTokenResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.EmptyBodyDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.EmptyBodyDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('otp'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    (0, common_1.HttpCode)(200),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SendOTPBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendOTP", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordBodyDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassowrd", null);
__decorate([
    (0, common_1.Post)('2fa/enable'),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.TwoFAEnableResDTO),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.EmptyBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "enableTwoFactorAuth", null);
__decorate([
    (0, common_1.Post)('2fa/disable'),
    (0, nestjs_zod_1.ZodSerializerDto)(response_dto_1.MessageResDTO),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.TwoFADisableBodyDTO, Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "disableTwoFactorAuth", null);
__decorate([
    (0, common_1.Get)('device/me'),
    (0, nestjs_zod_1.ZodSerializerDto)(auth_dto_1.DeviceResDTO),
    (0, common_1.HttpCode)(200),
    __param(0, (0, active_user_decorator_1.ActiveUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deviceUser", null);
__decorate([
    (0, common_1.Get)('google-auth'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Ip)()),
    __param(1, (0, user_agent_decorator_1.UserAgent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, auth_decorator_1.Ispublic)(),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        google_service_1.GoogleService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map