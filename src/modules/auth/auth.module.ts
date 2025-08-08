import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from 'src/libs/crypto/hash.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/libs/token/token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, HashService, JwtService, TokenService],
})
export class AuthModule {}
