import { Body, Injectable } from '@nestjs/common';
import { RegisterBodyType } from './auth.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { EmailAlreadyExistsException } from './auth.error';
import { HashService } from 'src/libs/crypto/hash.service';
import { AuthRepository } from './auth.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly hashService: HashService,
    private readonly authRepository: AuthRepository,
  ) {}

  async register(@Body() body: RegisterBodyType) {
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
}
