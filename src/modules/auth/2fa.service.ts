import { Injectable } from '@nestjs/common';
import * as OTPAuth from 'otpauth';
import envConfig from 'src/common/configs/validate-env';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';

@Injectable()
export class TwoFactorService {
  constructor(private readonly commonUserRepository: CommonUserRepository) {}
  private createTOTP(email: string, secret?: string) {
    return new OTPAuth.TOTP({
      issuer: envConfig.APP_NAME,
      label: email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: secret || new OTPAuth.Secret(),
    });
  }

  generateTOTPSecret(email: string) {
    const totp = this.createTOTP(email);
    return {
      secret: totp.secret.base32,
      uri: totp.toString(),
    };
  }

  verifyTOTP({
    email,
    token,
    secret,
  }: {
    email: string;
    secret: string;
    token: string;
  }): boolean {
    const totp = this.createTOTP(email, secret);
    const delta = totp.validate({ token, window: 1 });
    console.log('verifyTOTP', { email, token, secret, delta });
    return delta !== null;
  }

  async enableTwoFaForUser(userId: number, secretBase32: string) {
    // TODO: encrypt secretBase32 trước khi lưu
    return await this.commonUserRepository.update(
      { id: userId },
      { totpSecret: secretBase32 }, // hoặc encrypted string
    );
  }

  async disableTwoFaForUser(userId: number) {
    return await this.commonUserRepository.update(
      { id: userId },
      { totpSecret: null },
    );
  }
}
