import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { UserRepository } from './user.repository';
import { CreateUserBodyType, UpdateUserBodyType } from './user.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import {
  EmailAlreadyExistsException,
  NotFoundRecordException,
} from 'src/common/errors';
import { CannotUpdateOrDeleteYourselfException } from './user.error';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { Prisma } from '@prisma/client';
import { isPrismaRecordNotFound } from 'src/common/errors/prisma';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonUserRepository: CommonUserRepository,
    private readonly commonRoleRepository: CommonRoleRepository,
    private readonly hashService: HashService,
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

  async createUser({
    data,
    updatedById,
    updatedByRoleName,
  }: {
    data: CreateUserBodyType;
    updatedById: number;
    updatedByRoleName: string;
  }) {
    try {
      const existEmail = await this.commonUserRepository.findUniqueUser({
        email: data.email,
      });
      if (existEmail) {
        throw EmailAlreadyExistsException;
      }
      await this.verifyRoleAdmin({
        roleIdTarget: data.roleId,
        roleNameAgent: updatedByRoleName,
      });

      const hasPassword = await this.hashService.hash(data.password);

      const user = await this.userRepository.create({
        createdById: updatedById,
        data: {
          ...data,
          password: hasPassword,
        },
      });
      return user;
    } catch (error) {
      console.log('/user/:id', error);
      throw error;
    }
  }

  async updateUser({
    id,
    data,
    updatedById,
    updatedByRoleName,
  }: {
    id: number;
    data: UpdateUserBodyType;
    updatedById: number;
    updatedByRoleName: string;
  }) {
    try {
      // 1. kiểm tra xem có phải đang cập nhập chính bản thân không
      this.verifyYourself({ userId: updatedById, userTargetId: id });

      // lấy ra role id của người dùng được update
      const userRoleId = await this.getRoleIdByUserId(id);

      // 2. kiểm tra xem role của người cập nhật có phải là admin không và người đi cập nhập có phải là admin không
      await this.verifyRoleAdmin({
        roleIdTarget: userRoleId,
        roleNameAgent: updatedByRoleName,
      });

      // 3. update user
      const updateUser = await this.commonUserRepository.update({ id }, data);
      if (!updateUser) {
        throw new NotFoundException();
      }

      const { password, totpSecret, ...safeUser } = updateUser;
      return safeUser;
    } catch (error) {
      console.log('/user/:id', error);
      throw error;
    }
  }

  private verifyYourself({
    userId,
    userTargetId,
  }: {
    userId: number;
    userTargetId: number;
  }) {
    if (userId === userTargetId) {
      throw CannotUpdateOrDeleteYourselfException;
    }
  }

  private async verifyRoleAdmin({
    roleNameAgent,
    roleIdTarget,
  }: {
    roleNameAgent: string;
    roleIdTarget: number;
  }) {
    if (roleNameAgent === ROLE_NAME.ADMIN) {
      return true;
    } else {
      const adminRoleId = await this.commonRoleRepository.getAdminRoleId();
      if (roleIdTarget === adminRoleId) {
        throw new ForbiddenException();
      }
      return true;
    }
  }

  private async getRoleIdByUserId(userId: number) {
    const currentUser = await this.commonUserRepository.findUniqueUser({
      id: userId,
    });
    if (!currentUser) {
      throw NotFoundRecordException;
    }
    return currentUser.roleId;
  }

  async deleteUser({
    id,
    deletedById,
    deletedByRoleName,
  }: {
    id: number;
    deletedById: number;
    deletedByRoleName: string;
  }) {
    try {
      // 1. kiểm tra xem có phải đang xóa chính bản thân không
      this.verifyYourself({ userId: deletedById, userTargetId: id });

      // lấy ra role id của người dùng được delete
      const userRoleId = await this.getRoleIdByUserId(id);

      // 2. kiểm tra xem role của người bị xóa có phải là admin không và người đi xóa có phải là admin không
      await this.verifyRoleAdmin({
        roleIdTarget: userRoleId,
        roleNameAgent: deletedByRoleName,
      });

      // 3. delete user (xóa mềm)
      await this.userRepository.delete({ id, deletedById });

      return { message: 'Delete user successfully' };
    } catch (error) {
      console.log('/user/:id', error);
      if (isPrismaRecordNotFound(error)) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
