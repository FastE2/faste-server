import { Injectable } from '@nestjs/common';
import {
  ForgotPasswordBodyType,
  LoginBodyType,
  RegisterBodyType,
  SendOTPBodyType,
  TwoFADisableBodyType,
} from './auth.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import {
  EmailNotExistsException,
  ExpiredOTPException,
  InvalidOTPException,
  InvalidPasswordException,
  InvalidTokenException,
  InvalidTokenTOTPException,
  TOTPNotEnabledException,
  TwoFactorAlreadyEnabledException,
} from './auth.error';
import { AuthRepository } from './auth.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { Response } from 'express';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { TokenService } from 'src/common/libs/token/token.service';
import { MailService } from 'src/common/libs/mail/mail.service';
import { VerificationCodeTypeType } from 'src/common/constants/auth.constant';
import envConfig from 'src/common/configs/validate-env';
import { addMilliseconds } from 'date-fns';
import ms from 'ms';
import { TwoFactorService } from './2fa.service';
import { EncryptionService } from 'src/common/libs/crypto/encryption.service';
import { generateOTP } from 'src/utils/generate-otp.util';
import { EmailAlreadyExistsException } from 'src/common/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly authRepository: AuthRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly twoFactorService: TwoFactorService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const existedUser = await this.commonUserRepository.findUniqueUser({
        email: body.email,
      });

      if (existedUser) {
        throw EmailAlreadyExistsException;
      }

      await this.validateVerificationCode({
        code: body.code,
        email: body.email,
        type: VerificationCodeTypeType.REGISTER,
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
        roleId: roleClientId!,
      });

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(
    body: LoginBodyType & { userAgent: string; ip: string },
    res: Response,
  ) {
    try {
      // Find email exists in db
      const user = await this.commonUserRepository.findUniqueUser({
        email: body.email,
      });
      if (!user) {
        throw EmailNotExistsException;
      }
      if (
        (user.totpSecret && !body.totpCode) ||
        (!user.totpSecret && body.totpCode)
      ) {
        throw InvalidTokenTOTPException;
      }
      if (body.totpCode) {
        const decryptedSecret = this.encryptionService.decrypt(
          user.totpSecret!,
        );
        const isValid = this.twoFactorService.verifyTOTP({
          email: body.email,
          token: body.totpCode,
          secret: decryptedSecret,
        });
        console.log('ISVALID', isValid);
        if (!isValid) {
          throw InvalidTokenTOTPException;
        }
      }

      const isMatchPassword = await this.hashService.compare({
        plainText: body.password,
        hashed: user.password,
      });
      if (!isMatchPassword) {
        throw InvalidPasswordException;
      }

      // if device not found then create new device or if device already then update lastActive
      const deviceUser = await this.authRepository.updateOrCreateDeviceUser({
        ip: body.ip,
        userAgent: body.userAgent,
        userId: user.id,
      });

      // create accessToken and refreshToken
      const [accessToken, refreshToken] = await Promise.all([
        this.tokenService.signAccessToken({
          userId: user.id,
          roleId: user.roleId,
        }),
        this.tokenService.signRefreshToken({ userId: user.id }),
      ]);

      // verifyRefreshToken
      const decodedRefreshToken =
        await this.tokenService.verifyRefreshToken(refreshToken);

      // Create table RefreshToken
      await this.authRepository.createRefreshToken({
        token: refreshToken,
        deviceId: deviceUser.id,
        userId: user.id,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      });

      // Save refreshToken on http-only cookie
      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/auth',
        maxAge: 1 * 24 * 3600 * 1000,
      });

      return { accessToken };
    } catch (error) {
      console.log('/auth/login', error);
      throw error;
    }
  }

  async refreshToken(token: string, res: Response) {
    try {
      // decode refeshToken on http-only cookie
      const verifyRefreshToken =
        await this.tokenService.verifyRefreshToken(token);

      if (!verifyRefreshToken) {
        res.clearCookie('refresh-token', {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/auth',
        });
        throw InvalidTokenException;
      }

      // Check refreshToken in database and include data user & role
      const refreshTokenInDb =
        await this.authRepository.findUniqueRefreshTokenIncludeUserRole(token);
      if (!refreshTokenInDb) {
        throw InvalidTokenException;
      }
      const { roleId, id } = refreshTokenInDb;

      // create new accessToken
      const accessToken = await this.tokenService.signAccessToken({
        userId: id,
        roleId,
      });

      return { accessToken };
    } catch (error) {
      console.log('auht/refresh-token', error);
      throw error;
    }
  }

  async logout(token: string, res: Response) {
    try {
      res.clearCookie('refresh-token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/auth',
      });

      await this.authRepository.deleteRefreshToken(token);

      return { message: 'Logout successfully' };
    } catch (error) {
      console.log('/auth/logout', error);
      throw error;
    }
  }

  async validateVerificationCode({
    email,
    code,
    type,
  }: {
    email: string;
    code: string;
    type: keyof typeof VerificationCodeTypeType;
  }) {
    const verifyCode = await this.authRepository.findUniqueVerificationCode({
      email_type: {
        email,
        // code,
        type,
      },
    });

    if (!verifyCode) {
      throw InvalidOTPException;
    }

    if (verifyCode.expiresAt < new Date()) {
      throw ExpiredOTPException;
    }

    return verifyCode;
  }

  async sendOTP(body: SendOTPBodyType) {
    try {
      const user = await this.commonUserRepository.findUniqueUser({
        email: body.email,
      });
      if (body.type === VerificationCodeTypeType.REGISTER) {
        if (user) throw EmailAlreadyExistsException;
      } else if (
        [
          VerificationCodeTypeType.DISABLE_2FA,
          VerificationCodeTypeType.FORGOT_PASSWORD,
          VerificationCodeTypeType.LOGIN,
        ].includes(body.type)
      ) {
        if (!user) throw EmailNotExistsException;
      }
      const otp = generateOTP();
      const subject = body.type.replace(/_/g, ' ');

      await Promise.all([
        this.authRepository.createVerificationCode({
          email: body.email,
          type: body.type,
          code: otp,
          expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN)),
        }),
        this.mailService.sendMail({
          code: otp,
          subject,
          to: body.email,
        }),
      ]);

      return { message: 'OTP has been sent successfully' };
    } catch (error) {
      console.log('/auth/otp', error);
      throw error;
    }
  }

  async forgotPassowrd(body: ForgotPasswordBodyType) {
    try {
      const { code, email, password: newPassword } = body;
      const user = await this.commonUserRepository.findUniqueUser({
        email: body.email,
      });

      if (!user) {
        throw EmailNotExistsException;
      }

      const hashNewPassword = await this.hashService.hash(newPassword);

      // 1. Validate code
      await this.validateVerificationCode({
        email,
        code,
        type: VerificationCodeTypeType.FORGOT_PASSWORD,
      });

      // 2. Update password
      await this.commonUserRepository.update(
        { id: user.id },
        { password: hashNewPassword, updatedById: user.id },
      );

      // 3. delete VerificationCode
      await this.authRepository.deleteVerificationCode({
        email_type: {
          // code,
          email,
          type: VerificationCodeTypeType.FORGOT_PASSWORD,
        },
      });

      return {
        message: 'Password changed successfully',
      };
    } catch (error) {
      console.log('/auth/forgot-password', error);
      throw error;
    }
  }

  async enableTwoFactorAuth(id: number) {
    try {
      const user = await this.commonUserRepository.findUniqueUser({ id });
      if (!user) {
        throw EmailNotExistsException;
      }
      if (user.totpSecret) {
        throw TwoFactorAlreadyEnabledException;
      }
      const { secret, uri } = this.twoFactorService.generateTOTPSecret(
        user.email,
      );
      const encryptedSecret = this.encryptionService.encrypt(secret);
      await this.twoFactorService.enableTwoFaForUser(id, encryptedSecret);

      return { uri };
    } catch (error) {
      console.log('/auth/2fa/enable', error);
      throw error;
    }
  }

  async disableTwoFactorAuth(
    data: TwoFADisableBodyType & {
      userId: number;
    },
  ) {
    try {
      const { totpCode, userId } = data;
      const user = await this.commonUserRepository.findUniqueUser({
        id: userId,
      });
      if (!user) {
        throw EmailNotExistsException;
      }

      if (!user.totpSecret) {
        throw TOTPNotEnabledException;
      }
      if (totpCode) {
        const decryptedSecret = this.encryptionService.decrypt(user.totpSecret);
        const isValid = this.twoFactorService.verifyTOTP({
          email: user.email,
          secret: decryptedSecret,
          token: totpCode,
        });
        if (!isValid) {
          throw InvalidTokenTOTPException;
        }
      }
      await this.twoFactorService.disableTwoFaForUser(userId);
      return { message: 'Disable 2FA successfully' };
    } catch (error) {
      console.log('/auth/2fa/disable', error);
      throw error;
    }
  }
}
