import { Injectable } from '@nestjs/common';
import { UserType } from 'src/common/schemas/user.schema';
import { RegisterResType } from 'src/modules/auth/auth.schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    user: Pick<
      UserType,
      'roleId' | 'email' | 'name' | 'password' | 'phoneNumber'
    >,
  ): Promise<RegisterResType> {
    return this.prismaService.user.create({
      data: user,
      omit: {
        password: true,
      },
    });
  }
}
