import { PrismaService } from 'src/prisma/prisma.service';
import { FileMediaType } from './media.schema';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
export declare class MediaRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(data: Omit<FileMediaType, 'createdAt'>): import(".prisma/client").Prisma.Prisma__FileClient<{
        type: import(".prisma/client").$Enums.FileType;
        createdById: number;
        createdAt: Date;
        url: string;
        key: string;
        size: number;
        isPublic: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    list(query: PaginationQueryType): Promise<{
        data: {
            type: import(".prisma/client").$Enums.FileType;
            createdById: number;
            createdAt: Date;
            url: string;
            key: string;
            size: number;
            isPublic: boolean;
        }[];
        page: number;
        limit: number;
        totalPage: number;
    }>;
    delete(key: string): import(".prisma/client").Prisma.Prisma__FileClient<{
        type: import(".prisma/client").$Enums.FileType;
        createdById: number;
        createdAt: Date;
        url: string;
        key: string;
        size: number;
        isPublic: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
