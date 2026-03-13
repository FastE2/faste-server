import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleBodyType, UpdateRoleBodyType } from './role.schema';
import { RoleType } from 'src/common/schemas/role.schema';
import { RolePermissionsType } from 'src/common/schemas/permission.schema';
export declare class RoleRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<{
        data: RoleType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(id: number): Promise<RoleType | null>;
    findByIdIncludePermissions(id: number): Promise<RoleType | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreateRoleBodyType;
    }): Promise<RoleType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateRoleBodyType;
    }): Promise<RolePermissionsType>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
