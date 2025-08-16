import { Global, Module } from '@nestjs/common';
import { CommonUserRepository } from './repositories/common-user.repository';
import { CommonRoleRepository } from './repositories/common-role.repository';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './libs/token/token.service';
import { HashService } from './libs/crypto/hash.service';
import { MailModule } from './libs/mail/mail.module';
import { EncryptionService } from './libs/crypto/encryption.service';

@Global()
@Module({
  imports: [JwtModule, MailModule],
  providers: [
    CommonUserRepository,
    CommonRoleRepository,
    Reflector,
    TokenService,
    EncryptionService,
    HashService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    CommonUserRepository,
    CommonRoleRepository,
    TokenService,
    HashService,
    EncryptionService,
    MailModule,
  ],
})
export class CommonModule {}
