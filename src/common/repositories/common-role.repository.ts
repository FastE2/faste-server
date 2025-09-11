import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLE_NAME } from '../constants/role-base.constant';

export type WhereUniqueUserType = { id: number } | { email: string };

@Injectable()
export class CommonRoleRepository {
  private clientRoleId: number | null = null;
  private adminRoleId: number | null = null;
  private sellerRoleId: number | null = null;
  constructor(private readonly prismaService: PrismaService) {}

  private async getRole(roleName: string) {
    const role: any = await this.prismaService.$queryRaw`
    SELECT * FROM "Role" WHERE name = ${roleName} AND "deletedAt" IS NULL LIMIT 1;
  `.then((res: any) => {
      if (res.length === 0) {
        throw new Error('Role not found');
      }
      return res[0];
    });
    return role;
  }

  async getClientRoleId() {
    if (this.clientRoleId) {
      return this.clientRoleId;
    }

    const role = await this.getRole(ROLE_NAME.CLIENT);
    this.clientRoleId = role.id;
    return this.clientRoleId;
  }

  async getAdminRoleId() {
    if (this.adminRoleId) {
      return this.adminRoleId;
    }

    const role = await this.getRole(ROLE_NAME.ADMIN);
    this.adminRoleId = role.id;
    return this.adminRoleId;
  }

  async getSellerRoleId() {
    if (this.sellerRoleId) {
      return this.sellerRoleId;
    }

    const role = await this.getRole(ROLE_NAME.SELLER);
    this.sellerRoleId = role.id;
    return this.sellerRoleId;
  }
}
