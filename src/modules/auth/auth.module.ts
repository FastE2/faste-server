import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TwoFactorService } from './2fa.service';
import { GoogleService } from './google.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, TwoFactorService, GoogleService],
})
export class AuthModule {}
