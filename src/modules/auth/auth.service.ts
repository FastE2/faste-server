import { Body, Injectable, Req, Res } from '@nestjs/common';
import { LoginBodyType, RegisterBodyType } from './auth.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import {
  EmailAlreadyExistsException,
  EmailNotExistsException,
  InvalidPasswordException,
  InvalidTokenException,
} from './auth.error';
import { HashService } from 'src/libs/crypto/hash.service';
import { AuthRepository } from './auth.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { TokenService } from 'src/libs/token/token.service';
import { Request, Response, response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly hashService: HashService,
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
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

      return accessToken;
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

      return accessToken;
    } catch (error) {
      console.log('auht/refresh-token', error);
      throw error;
    }
  }
}
