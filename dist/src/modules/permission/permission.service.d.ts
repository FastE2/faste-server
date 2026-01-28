import { PermissionRepository } from './permission.repository';
import { CreatePermissionBodyType, UpdatePermissionBodyType } from './permission.schema';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    getAllPermissions(): Promise<{
        data: import("../../common/schemas/permission.schema").PermissionType[];
        totalItem: number;
    }>;
    getPermissionById(id: number): Promise<{
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
    }>;
    createPermission({ data, createdById, }: {
        data: CreatePermissionBodyType;
        createdById: number;
    }): Promise<{
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
    }>;
    updatePermission({ id, data, updatedById, }: {
        id: number;
        data: UpdatePermissionBodyType;
        updatedById: number;
    }): Promise<{
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
    } & {
        roles: {
            id: number;
        }[];
    }>;
    deletePermission({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
