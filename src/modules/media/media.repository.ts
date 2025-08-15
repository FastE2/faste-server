import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileMediaType } from './media.schema';
import { PaginationQueryType } from 'src/common/schemas/request.schema';

@Injectable()
export class MediaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Omit<FileMediaType, 'createdAt'>) {
    return this.prismaService.file.create({
      data,
    });
  }

  async list(query: PaginationQueryType) {
    const take = query.limit;
    const skip = (query.page - 1) * query.limit;
    const [data, totalCount] = await Promise.all([
      this.prismaService.file.findMany({
        take,
        skip,
      }),
      this.prismaService.file.count(),
    ]);
    const totalPage = Math.ceil(totalCount / query.limit);
    return {
      data,
      page: query.page,
      limit: query.limit,
      totalPage,
    };
  }

  delete(key: string) {
    return this.prismaService.file.delete({
      where: {
        key,
      },
    });
  }
}
