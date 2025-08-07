import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '../schemas/user.schema';

export type WhereUniqueUserType = { id: number } | { email: string };

@Injectable()
export class CommonUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUniqueUser(where: WhereUniqueUserType): Promise<UserType | null> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }
}
