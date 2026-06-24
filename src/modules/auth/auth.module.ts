import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TwoFactorService } from './2fa.service';
import { GoogleService } from './google.service';
import { CaptchaService } from 'src/common/libs/captcha/captcha.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    TwoFactorService,
    GoogleService,
    CaptchaService,
  ],
})
export class AuthModule {}
