import { Injectable } from '@nestjs/common';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { NotFoundRecordException } from 'src/common/errors';
import { ROLE_NAME } from 'src/common/constants/role-base.constant';
import { Prisma } from '@prisma/client';
import { CreateRoleBodyType, UpdateRoleBodyType } from './role.schema';
import { RoleRepository } from './role.repository';
import { ForbiddenActionOnBaseRoleException } from './role.error';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async getAllRoles(query: PaginationQueryType) {
    try {
      return await this.roleRepository.list(query);
    } catch (error) {
      console.log('/role', error);
      throw error;
    }
  }

  async getRoleById(id: number) {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        throw NotFoundRecordException;
      }
      return role;
    } catch (error) {
      console.log('/role/:id', error);
      throw error;
    }
  }

  async createRole({
    data,
    createdById,
  }: {
    data: CreateRoleBodyType;
    createdById: number;
  }) {
    try {
      const role = await this.roleRepository.create({ createdById, data });
      return role;
    } catch (error) {
      console.log('/role', error);
    }
  }

  async updateRole({
    id,
    data,
    updatedById,
  }: {
    id: number;
    data: UpdateRoleBodyType;
    updatedById: number;
  }) {
    try {
      // check role base
      await this.verifyRole(id);

      // 2. update user
      const updatedRole = await this.roleRepository.update({
        id,
        updatedById,
        data,
      });
      return updatedRole;
    } catch (error) {
      console.log('/role/:id', error);
      throw error;
    }
  }

  private async verifyRole(roleId: number) {
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw NotFoundRecordException;
    }
    const baseRoles: string[] = [
      ROLE_NAME.ADMIN,
      ROLE_NAME.CLIENT,
      ROLE_NAME.SELLER,
    ];

    if (baseRoles.includes(role.name)) {
      throw ForbiddenActionOnBaseRoleException;
    }
  }

  async deleteRole({ id, deletedById }: { id: number; deletedById: number }) {
    try {
      // 1. kiểm tra role có thuộc role base không
      await this.verifyRole(id);

      // 2. delete role (xóa mềm)
      await this.roleRepository.delete({ id, deletedById });

      return { message: 'Delete role successfully' };
    } catch (error) {
      console.log('/role/:id', error);
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
