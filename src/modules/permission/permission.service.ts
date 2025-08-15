import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { Prisma } from '@prisma/client';
import { PermissionRepository } from './permission.repository';
import { ForbiddenActionOnBaseRoleException } from './permission.error';
import {
  CreatePermissionBodyType,
  UpdatePermissionBodyType,
} from './permission.schema';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async getAllPermissions() {
    try {
      return await this.permissionRepository.list();
    } catch (error) {
      console.log('/permission', error);
      throw error;
    }
  }

  async getPermissionById(id: number) {
    try {
      const permission = await this.permissionRepository.findById(id);
      if (!permission) {
        throw NotFoundRecordException;
      }
      return permission;
    } catch (error) {
      console.log('/permission/:id', error);
      throw error;
    }
  }

  async createPermission({
    data,
    createdById,
  }: {
    data: CreatePermissionBodyType;
    createdById: number;
  }) {
    try {
      const role = await this.permissionRepository.create({
        createdById,
        data,
      });
      return role;
    } catch (error) {
      console.log('/permission', error);
      throw error
    }
  }

  async updatePermission({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdatePermissionBodyType;
    updatedById: number;
  }) {
    try {
      // 2. update user
      const updatedPermission = await this.permissionRepository.update({
        id,
        updatedById,
        data,
      });
      return updatedPermission;
    } catch (error) {
      console.log('/permission/:id', error);
      throw error;
    }
  }

  async deletePermission({
    id,
    deletedById,
  }: {
    id: number;
    deletedById: number;
  }) {
    try {
      // delete permission (xóa mềm)
      await this.permissionRepository.delete({ id, deletedById });

      return { message: 'Delete permission successfully' };
    } catch (error) {
      console.log('/permission/:id', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw NotFoundRecordException;
      }
      throw error;
    }
  }
}
