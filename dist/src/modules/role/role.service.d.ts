import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { CreateRoleBodyType, UpdateRoleBodyType } from './role.schema';
import { RoleRepository } from './role.repository';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    getAllRoles(query: PaginationQueryType): Promise<{
        data: import("../../common/schemas/role.schema").RoleType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getRoleById(id: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
    }>;
    createRole({ data, createdById, }: {
        data: CreateRoleBodyType;
        createdById: number;
    }): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
    }>;
    updateRole({ id, data, updatedById, }: {
        id: number;
        data: UpdateRoleBodyType;
        updatedById: number;
    }): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        permissions: {
            id: number;
            name: string;
            path: string;
            createdById: number | null;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            description: string;
            method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
            module: string;
        }[];
    }>;
    private verifyRole;
    deleteRole({ id, deletedById }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
