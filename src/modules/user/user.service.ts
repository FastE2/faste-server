import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { UserRepository } from './user.repository';
import { GetUserByIdParamsType } from './user.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { NotFoundRecordException } from 'src/common/errors';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonUserRepository: CommonUserRepository,
  ) {}
  async getAllUsers(query: PaginationQueryType) {
    try {
      return await this.userRepository.list(query);
    } catch (error) {
      console.log('/user', error);
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.commonUserRepository.findUniqueUserIncludeRole({
        id,
      });
      if (!user) {
        throw NotFoundRecordException;
      }
      return user;
    } catch (error) {
      console.log('/user/:id', error);
      throw error;
    }
  }
}
