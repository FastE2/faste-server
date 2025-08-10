import { Body, Injectable, Req, Res } from '@nestjs/common';
import {
  ForgotPasswordBodyType,
  LoginBodyType,
  RegisterBodyType,
  SendOTPBodyType,
} from './auth.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import {
  EmailAlreadyExistsException,
  EmailNotExistsException,
  ExpiredOTPException,
  InvalidOTPException,
  InvalidPasswordException,
  InvalidTokenException,
} from './auth.error';
import { AuthRepository } from './auth.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { Request, Response, response } from 'express';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { TokenService } from 'src/common/libs/token/token.service';
import { MailService } from 'src/common/libs/mail/mail.service';
import { generateOTP } from 'src/utils/generate-otp';
import { VerificationCodeTypeType } from 'src/common/constants/auth.constant';
import envConfig from 'src/common/configs/validate-env';
import { addMilliseconds } from 'date-fns';
import  ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly authRepository: AuthRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async register(body: RegisterBodyType) {
    try {
      const existedUser = await this.commonUserRepository.findUniqueUser({
        email: body.email,
      });
      if (existedUser) {
        throw EmailAlreadyExistsException;
      }
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
        UserId: user.id,
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
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
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
        res.clearCookie('refreshToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
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
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
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
    type: VerificationCodeTypeType;
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
}
