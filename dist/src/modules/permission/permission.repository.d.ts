import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionType } from 'src/common/schemas/permission.schema';
import { CreatePermissionBodyType, UpdatePermissionBodyType } from './permission.schema';
export declare class PermissionRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(): Promise<{
        data: PermissionType[];
        totalItem: number;
    }>;
    findById(id: number): Promise<PermissionType | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreatePermissionBodyType;
    }): Promise<PermissionType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdatePermissionBodyType;
    }): Promise<PermissionType & {
        roles: {
            id: number;
        }[];
    }>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
