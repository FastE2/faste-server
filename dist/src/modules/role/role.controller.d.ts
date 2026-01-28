import { RoleService } from './role.service';
import { CreateRoleBodyDTO, GetRoleParamsDTO, GetRolesQueryDTO, UpdateRoleBodyDTO } from './role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    getAllUser(query: GetRolesQueryDTO): Promise<{
        data: import("../../common/schemas/role.schema").RoleType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createUser(body: CreateRoleBodyDTO, userId: number): Promise<{
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
    getById(params: GetRoleParamsDTO): Promise<{
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
    updateUser(body: UpdateRoleBodyDTO, params: GetRoleParamsDTO, userId: number): Promise<{
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
    deleteUser(params: GetRoleParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
