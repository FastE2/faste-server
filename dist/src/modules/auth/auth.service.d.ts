import { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType, SendOTPBodyType, TwoFADisableBodyType } from './auth.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { AuthRepository } from './auth.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { Response } from 'express';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { TokenService } from 'src/common/libs/token/token.service';
import { MailService } from 'src/common/libs/mail/mail.service';
import { VerificationCodeTypeType } from 'src/common/constants/auth.constant';
import { TwoFactorService } from './2fa.service';
import { EncryptionService } from 'src/common/libs/crypto/encryption.service';
export declare class AuthService {
    private readonly commonUserRepository;
    private readonly commonRoleRepository;
    private readonly authRepository;
    private readonly hashService;
    private readonly tokenService;
    private readonly mailService;
    private readonly twoFactorService;
    private readonly encryptionService;
    constructor(commonUserRepository: CommonUserRepository, commonRoleRepository: CommonRoleRepository, authRepository: AuthRepository, hashService: HashService, tokenService: TokenService, mailService: MailService, twoFactorService: TwoFactorService, encryptionService: EncryptionService);
    register(body: RegisterBodyType): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(body: LoginBodyType & {
        userAgent: string;
        ip: string;
    }, res: Response): Promise<{
        accessToken: string;
    }>;
    refreshToken(token: string, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(token: string, res: Response): Promise<{
        message: string;
    }>;
    validateVerificationCode({ email, code, type, }: {
        email: string;
        code: string;
        type: keyof typeof VerificationCodeTypeType;
    }): Promise<{
        id: number;
        email: string;
        code: string;
        type: "REGISTER" | "FORGOT_PASSWORD" | "LOGIN" | "DISABLE_2FA";
        createdAt: Date;
        expiresAt: Date;
    }>;
    sendOTP(body: SendOTPBodyType): Promise<{
        message: string;
    }>;
    forgotPassowrd(body: ForgotPasswordBodyType): Promise<{
        message: string;
    }>;
    enableTwoFactorAuth(id: number): Promise<{
        uri: string;
    }>;
    disableTwoFactorAuth(data: TwoFADisableBodyType & {
        userId: number;
    }): Promise<{
        message: string;
    }>;
}
