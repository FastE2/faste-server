import { Injectable } from '@nestjs/common';
import { UserType } from 'src/common/schemas/user.schema';
import { RegisterResType } from 'src/modules/auth/auth.schema';
import { PrismaService } from 'src/prisma/prisma.service';

type UserWithoutPassword = Omit<UserType, 'password'> & {
  role: { id: number };
};
@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(
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

  updateOrCreateDeviceUser(body: {
    ip: string;
    userAgent: string;
    UserId: number;
  }) {
    const deviceUser = this.prismaService.device.upsert({
      where: {
        ip: body.ip,
      },
      create: {
        ip: body.ip,
        userAgent: body.userAgent,
        userId: body.UserId,
      },
      update: {
        lastActive: new Date(),
      },
    });
    return deviceUser;
  }

  createRefreshToken(data: {
    token: string;
    deviceId: number;
    userId: number;
    expiresAt: Date;
  }) {
    return this.prismaService.refreshToken.create({
      data,
    });
  }

  findUniqueRefreshTokenIncludeUserRole(
    token: string,
  ): Promise<UserWithoutPassword | null> {
    return this.prismaService.refreshToken
      .findUnique({
        where: {
          token,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              phoneNumber: true,
              avatar: true,
              dateOfBirth: true,
              roleId: true,
              createdById: true,
              updatedById: true,
              deletedAt: true,
              deletedById: true,
              createdAt: true,
              updatedAt: true,
              role: { select: { id: true } },
            },
          },
        },
      })
      .then((result) => result?.user ?? null);
  }
}
