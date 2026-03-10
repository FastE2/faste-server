import { UserService } from './user.service';
import { GetUserParamsDTO, GetUsersQueryDTO, UpdateUserBodyDTO, CreateUserBodyDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(query: GetUsersQueryDTO): Promise<{
        data: {
            id: number;
            name: string;
            createdById: number | null;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            phoneNumber: string;
            avatar: string | null;
            gender: string | null;
            roleId: number;
            dateOfBirth: Date | null;
            role: {
                id: number;
                name: string;
            };
        }[];
        page: number;
        totalItem: number;
        limmit: number;
        totalPage: number;
    }>;
    getById(params: GetUserParamsDTO): Promise<Omit<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        totpSecret: string | null;
        dateOfBirth: Date | null;
    }, "password" | "totpSecret"> & {
        role: {
            id: number;
            name: string;
        };
    }>;
    createUser(body: CreateUserBodyDTO, userId: number, roleName: string): Promise<Omit<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        totpSecret: string | null;
        dateOfBirth: Date | null;
    }, "password" | "totpSecret">>;
    updateUser(body: UpdateUserBodyDTO, params: GetUserParamsDTO, userId: number, roleName: string): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
    }>;
    deleteUser(params: GetUserParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
}
