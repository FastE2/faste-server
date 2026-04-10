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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const common_user_repository_1 = require("../../common/repositories/common-user.repository");
const auth_error_1 = require("./auth.error");
const auth_repository_1 = require("./auth.repository");
const common_role_repository_1 = require("../../common/repositories/common-role.repository");
const hash_service_1 = require("../../common/libs/crypto/hash.service");
const token_service_1 = require("../../common/libs/token/token.service");
const mail_service_1 = require("../../common/libs/mail/mail.service");
const auth_constant_1 = require("../../common/constants/auth.constant");
const validate_env_1 = __importDefault(require("../../common/configs/validate-env"));
const date_fns_1 = require("date-fns");
const ms_1 = __importDefault(require("ms"));
const _2fa_service_1 = require("./2fa.service");
const encryption_service_1 = require("../../common/libs/crypto/encryption.service");
const generate_otp_util_1 = require("../../utils/generate-otp.util");
const errors_1 = require("../../common/errors");
let AuthService = class AuthService {
    commonUserRepository;
    commonRoleRepository;
    authRepository;
    hashService;
    tokenService;
    mailService;
    twoFactorService;
    encryptionService;
    constructor(commonUserRepository, commonRoleRepository, authRepository, hashService, tokenService, mailService, twoFactorService, encryptionService) {
        this.commonUserRepository = commonUserRepository;
        this.commonRoleRepository = commonRoleRepository;
        this.authRepository = authRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
        this.mailService = mailService;
        this.twoFactorService = twoFactorService;
        this.encryptionService = encryptionService;
    }
    async register(body) {
        try {
            const existedUser = await this.commonUserRepository.findUniqueUser({
                email: body.email,
            });
            if (existedUser) {
                throw errors_1.EmailAlreadyExistsException;
            }
            await this.validateVerificationCode({
                code: body.code,
                email: body.email,
                type: auth_constant_1.VerificationCodeTypeType.REGISTER,
            });
            const [passwordHash, roleClientId] = await Promise.all([
                this.hashService.hash(body.password),
                this.commonRoleRepository.getClientRoleId(),
            ]);
            const user = await this.authRepository.createUser({
                email: body.email,
                password: passwordHash,
                name: body.name,
                phoneNumber: body.phoneNumber,
                roleId: roleClientId,
            });
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login(body, res) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({
                email: body.email,
            });
            if (!user) {
                throw auth_error_1.EmailNotExistsException;
            }
            if ((user.totpSecret && !body.totpCode) ||
                (!user.totpSecret && body.totpCode)) {
                throw auth_error_1.InvalidTokenTOTPException;
            }
            if (body.totpCode) {
                const decryptedSecret = this.encryptionService.decrypt(user.totpSecret);
                const isValid = this.twoFactorService.verifyTOTP({
                    email: body.email,
                    token: body.totpCode,
                    secret: decryptedSecret,
                });
                if (!isValid) {
                    throw auth_error_1.InvalidTokenTOTPException;
                }
            }
            const isMatchPassword = await this.hashService.compare({
                plainText: body.password,
                hashed: user.password,
            });
            if (!isMatchPassword) {
                throw auth_error_1.InvalidPasswordException;
            }
            const deviceUser = await this.authRepository.updateOrCreateDeviceUser({
                ip: body.ip,
                userAgent: body.userAgent,
                userId: user.id,
            });
            const [accessToken, refreshToken] = await Promise.all([
                this.tokenService.signAccessToken({
                    userId: user.id,
                    roleId: user.roleId,
                }),
                this.tokenService.signRefreshToken({ userId: user.id }),
            ]);
            const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);
            await this.authRepository.createRefreshToken({
                token: refreshToken,
                deviceId: deviceUser.id,
                userId: user.id,
                expiresAt: new Date(decodedRefreshToken.exp * 1000),
            });
            res.cookie('refresh-token', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 1 * 24 * 3600 * 1000,
            });
            return { accessToken };
        }
        catch (error) {
            console.log('/auth/login', error);
            throw error;
        }
    }
    async refreshToken(token, res) {
        try {
            const verifyRefreshToken = await this.tokenService.verifyRefreshToken(token);
            if (!verifyRefreshToken) {
                res.clearCookie('refresh-token', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/',
                });
                throw auth_error_1.InvalidTokenException;
            }
            const refreshTokenInDb = await this.authRepository.findUniqueRefreshTokenIncludeUserRole(token);
            if (!refreshTokenInDb) {
                throw auth_error_1.InvalidTokenException;
            }
            const { roleId, id } = refreshTokenInDb;
            const accessToken = await this.tokenService.signAccessToken({
                userId: id,
                roleId,
            });
            return { accessToken };
        }
        catch (error) {
            console.log('auht/refresh-token', error);
            throw error;
        }
    }
    async logout(token, res) {
        try {
            res.clearCookie('refresh-token', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
            });
            await this.authRepository.deleteRefreshToken(token);
            return { message: 'Logout successfully' };
        }
        catch (error) {
            console.log('/auth/logout', error);
            throw error;
        }
    }
    async validateVerificationCode({ email, code, type, }) {
        const verifyCode = await this.authRepository.findUniqueVerificationCode({
            email_type: {
                email,
                type,
            },
        });
        if (!verifyCode) {
            throw auth_error_1.InvalidOTPException;
        }
        if (verifyCode.expiresAt < new Date()) {
            throw auth_error_1.ExpiredOTPException;
        }
        return verifyCode;
    }
    async sendOTP(body) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({
                email: body.email,
            });
            if (body.type === auth_constant_1.VerificationCodeTypeType.REGISTER) {
                if (user)
                    throw errors_1.EmailAlreadyExistsException;
            }
            else if ([
                auth_constant_1.VerificationCodeTypeType.DISABLE_2FA,
                auth_constant_1.VerificationCodeTypeType.FORGOT_PASSWORD,
                auth_constant_1.VerificationCodeTypeType.LOGIN,
            ].includes(body.type)) {
                if (!user)
                    throw auth_error_1.EmailNotExistsException;
            }
            const otp = (0, generate_otp_util_1.generateOTP)();
            const subject = body.type.replace(/_/g, ' ');
            await Promise.all([
                this.authRepository.createVerificationCode({
                    email: body.email,
                    type: body.type,
                    code: otp,
                    expiresAt: (0, date_fns_1.addMilliseconds)(new Date(), (0, ms_1.default)(validate_env_1.default.OTP_EXPIRES_IN)),
                }),
                this.mailService.sendMail({
                    code: otp,
                    subject,
                    to: body.email,
                }),
            ]);
            return { message: 'OTP has been sent successfully' };
        }
        catch (error) {
            console.log('/auth/otp', error);
            throw error;
        }
    }
    async forgotPassowrd(body) {
        try {
            const { code, email, password: newPassword } = body;
            const user = await this.commonUserRepository.findUniqueUser({
                email: body.email,
            });
            if (!user) {
                throw auth_error_1.EmailNotExistsException;
            }
            const hashNewPassword = await this.hashService.hash(newPassword);
            await this.validateVerificationCode({
                email,
                code,
                type: auth_constant_1.VerificationCodeTypeType.FORGOT_PASSWORD,
            });
            await this.commonUserRepository.update({ id: user.id }, { password: hashNewPassword, updatedById: user.id });
            await this.authRepository.deleteVerificationCode({
                email_type: {
                    email,
                    type: auth_constant_1.VerificationCodeTypeType.FORGOT_PASSWORD,
                },
            });
            return {
                message: 'Password changed successfully',
            };
        }
        catch (error) {
            console.log('/auth/forgot-password', error);
            throw error;
        }
    }
    async enableTwoFactorAuth(id) {
        try {
            const user = await this.commonUserRepository.findUniqueUser({ id });
            if (!user) {
                throw auth_error_1.EmailNotExistsException;
            }
            if (user.totpSecret) {
                throw auth_error_1.TwoFactorAlreadyEnabledException;
            }
            const { secret, uri } = this.twoFactorService.generateTOTPSecret(user.email);
            const encryptedSecret = this.encryptionService.encrypt(secret);
            await this.twoFactorService.enableTwoFaForUser(id, encryptedSecret);
            return { uri };
        }
        catch (error) {
            console.log('/auth/2fa/enable', error);
            throw error;
        }
    }
    async disableTwoFactorAuth(data) {
        try {
            const { totpCode, userId } = data;
            const user = await this.commonUserRepository.findUniqueUser({
                id: userId,
            });
            if (!user) {
                throw auth_error_1.EmailNotExistsException;
            }
            if (!user.totpSecret) {
                throw auth_error_1.TOTPNotEnabledException;
            }
            let isVerifiedEmail = false;
            if (totpCode) {
                await this.validateVerificationCode({
                    email: user.email,
                    code: totpCode,
                    type: auth_constant_1.VerificationCodeTypeType.DISABLE_2FA,
                });
                isVerifiedEmail = true;
            }
            if (!isVerifiedEmail && totpCode) {
                const decryptedSecret = this.encryptionService.decrypt(user.totpSecret);
                const isValid = this.twoFactorService.verifyTOTP({
                    email: user.email,
                    secret: decryptedSecret,
                    token: totpCode,
                });
                if (!isValid) {
                    throw auth_error_1.InvalidTokenTOTPException;
                }
            }
            await this.twoFactorService.disableTwoFaForUser(userId);
            return { message: 'Disable 2FA successfully' };
        }
        catch (error) {
            console.log('/auth/2fa/disable', error);
            throw error;
        }
    }
    getDevices(userId) {
        try {
            return this.authRepository.findDevicesByUserId(userId);
        }
        catch (error) {
            console.log('/auth/device/me', error);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_user_repository_1.CommonUserRepository,
        common_role_repository_1.CommonRoleRepository,
        auth_repository_1.AuthRepository,
        hash_service_1.HashService,
        token_service_1.TokenService,
        mail_service_1.MailService,
        _2fa_service_1.TwoFactorService,
        encryption_service_1.EncryptionService])
], AuthService);
//# sourceMappingURL=auth.service.js.map