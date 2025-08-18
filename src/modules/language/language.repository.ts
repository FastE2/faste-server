import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateLanguageBodyType,
  LanguageType,
  UpdateLanguageBodyType,
} from './language.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  list(): Promise<LanguageType[]> {
    return this.prismaService.language.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findById(id: number): Promise<LanguageType | null> {
    return this.prismaService.language.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async create(
    data: CreateLanguageBodyType & { createdById: number },
  ): Promise<LanguageType> {
    const existing = await this.prismaService.language.findFirst({
      where: {
        name: data.name,
        deletedAt: null, // chỉ quan tâm những record chưa xóa
      },
    });

    if (existing) {
      throw new Error(`Language with name "${data.name}" already exists.`);
    }
    return this.prismaService.language.create({
      data,
    });
  }

  update({
    id,
    updatedById,
    data,
  }: {
    id: number;
    updatedById: number;
    data: UpdateLanguageBodyType;
  }): Promise<LanguageType> {
    return this.prismaService.language.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        ...data,
        updatedById,
      },
    });
  }

  delete(
    {
      id,
      deletedById,
    }: {
      id: number;
      deletedById: number;
    },
    isHard?: boolean,
  ): Promise<any> {
    return isHard
      ? this.prismaService.language.delete({
          where: {
            id,
          },
        })
      : this.prismaService.language.update({
          where: {
            id,
            deletedAt: null,
          },
          data: {
            deletedAt: new Date(),
            deletedById,
          },
        });
  }
}
