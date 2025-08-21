import { Injectable, NotFoundException } from '@nestjs/common';
import { ChangePasswordProfileBodyType } from './profile.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { NotFoundRecordException } from 'src/common/errors';
import { IncorrectPasswordException } from './profile.error';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { UpdateUserBodyType } from '../user/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    private readonly commonUserRepository: CommonUserRepository,
    private readonly hashService: HashService,
  ) {}
  async getProfile(id: number) {
    try {
      return await this.commonUserRepository.findUniqueUser({ id });
    } catch (error) {
      console.log('/profile', error);
      throw error;
    }
  }

  async updateProfile({ id, data }: { id: number; data: UpdateUserBodyType }) {
    try {
      // update user
      const updateUser = await this.commonUserRepository.update(
        { id },
        {
          ...data,
          updatedById: id,
        },
      );
      if (!updateUser) {
        throw new NotFoundException();
      }

      const { password, totpSecret, ...safeUser } = updateUser;
      return safeUser;
    } catch (error) {
      console.log('/profile', error);
      throw error;
    }
  }

  async changePassword({
    id,
    data,
  }: {
    id: number;
    data: ChangePasswordProfileBodyType;
  }) {
    try {
      const user = await this.commonUserRepository.findUniqueUser({ id });
      if (!user) {
        throw NotFoundRecordException;
      }
      const isMatchPassword = await this.hashService.compare({
        hashed: user.password,
        plainText: data.oldPassword,
      });
      if (!isMatchPassword) {
        throw IncorrectPasswordException;
      }

      const hashPassword = await this.hashService.hash(data.newPassword);

      // update user
      const updateUser = await this.commonUserRepository.update(
        { id },
        {
          password: hashPassword,
          updatedById: id,
        },
      );
      if (!updateUser) {
        throw new NotFoundException();
      }

      return { message: 'Change password successfully' };
    } catch (error) {
      console.log('/profile/change-password', error);
      throw error;
    }
  }
}
