import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAllUsers(query: PaginationQueryType) {
    try {
      return await this.userRepository.list(query);
    } catch (error) {
      console.log('/user', error);
      throw error;
    }
  }
}
