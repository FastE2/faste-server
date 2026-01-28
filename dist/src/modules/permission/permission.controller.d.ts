import { PermissionService } from './permission.service';
import { CreatePermissionBodyDTO, GetPermissionParamsDTO, UpdatePermissionBodyDTO } from './permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    getAllUser(): Promise<{
        data: import("../../common/schemas/permission.schema").PermissionType[];
        totalItem: number;
    }>;
    createUser(body: CreatePermissionBodyDTO, userId: number): Promise<{
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
    getById(params: GetPermissionParamsDTO): Promise<{
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
    updateUser(body: UpdatePermissionBodyDTO, params: GetPermissionParamsDTO, userId: number): Promise<{
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
    deleteUser(params: GetPermissionParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
