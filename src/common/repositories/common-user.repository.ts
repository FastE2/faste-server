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

  findUniqueUserProfile(where: WhereUniqueUserType): Promise<any> {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        gender: true,
        addresses: true,
        avatar: true,
        createdAt: true,
        dateOfBirth: true,
        followers: true,
        following: true,
      },
    });
  }

  findUniqueUserIncludeRole(where: WhereUniqueUserType): Promise<
    | (Omit<UserType, 'password' | 'totpSecret'> & {
        role: { id: number; name: string };
      })
    | null
  > {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
      omit: {
        password: true,
        totpSecret: true,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(
    where: { id: number },
    data: Partial<UserType>,
  ): Promise<UserType | null> {
    const { id, ...dataToUpdate } = data;

    return this.prismaService.user.update({
      where: {
        ...where,
        deletedAt: null,
      },
      data: {
        ...dataToUpdate,
        gender: dataToUpdate.gender
          ? (dataToUpdate.gender as any as import('@prisma/client').Gender)
          : null, // giữ nullable gender
      },
    });
  }
}
