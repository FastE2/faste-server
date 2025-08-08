import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import envConfig from 'src/common/configs/validate-env';
import { v4 as uuidv4 } from 'uuid';

type PayloadAccessTokenType = {
  userId: number;
  roleId: number;
};

type PayloadRefreshTokenType = {
  userId: number;
};

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  signAccessToken(payload: PayloadAccessTokenType): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, uuid: uuidv4() },
      {
        expiresIn: envConfig.EXPIRES_IN_ACCESSTOKEN,
        secret: envConfig.SERECT_KEY_ACCESSTOKEN,
        algorithm: 'HS256',
      },
    );
  }

  signRefreshToken(payload: PayloadRefreshTokenType): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, uuid: uuidv4() },
      {
        expiresIn: envConfig.EXPIRES_IN_REFRESHTOKEN,
        secret: envConfig.SERECT_KEY_REFRESHTOKEN,
        algorithm: 'HS256',
      },
    );
  }

  verifyAccessToken(
    token: string,
  ): Promise<{ userId: number; roleId: number; exp: number }> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.SERECT_KEY_ACCESSTOKEN,
    });
  }

  verifyRefreshToken(token: string): Promise<{ userId: number; exp: number }> {
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.SERECT_KEY_REFRESHTOKEN,
    });
  }
}
