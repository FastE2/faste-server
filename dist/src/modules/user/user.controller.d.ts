import { UserService } from './user.service';
import { GetUserParamsDTO, GetUsersQueryDTO, UpdateUserBodyDTO, CreateUserBodyDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(query: GetUsersQueryDTO): Promise<{
        page: number;
        data: {
            role: {
                name: string;
                id: number;
            };
            name: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            deletedById: number | null;
            id: number;
            createdById: number | null;
            updatedById: number | null;
            email: string;
            phoneNumber: string;
            avatar: string | null;
            gender: string | null;
            roleId: number;
            dateOfBirth: Date | null;
        }[];
        totalItem: number;
        limmit: number;
        totalPage: number;
    }>;
    getById(params: GetUserParamsDTO): Promise<Omit<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        deletedById: number | null;
        id: number;
        createdById: number | null;
        updatedById: number | null;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        deletedById: number | null;
        id: number;
        createdById: number | null;
        updatedById: number | null;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        deletedById: number | null;
        id: number;
        createdById: number | null;
        updatedById: number | null;
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
