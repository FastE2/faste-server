import { UserService } from './user.service';
import { GetUserParamsDTO, GetUsersQueryDTO, UpdateUserBodyDTO, CreateUserBodyDTO } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(query: GetUsersQueryDTO): Promise<{
        data: {
            role: {
                id: number;
                name: string;
            };
            id: number;
            email: string;
            name: string;
            phoneNumber: string;
            avatar: string | null;
            gender: string | null;
            roleId: number;
            dateOfBirth: Date | null;
            createdById: number | null;
            updatedById: number | null;
            deletedById: number | null;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        page: number;
        totalItem: number;
        limmit: number;
        totalPage: number;
    }>;
    getById(params: GetUserParamsDTO): Promise<Omit<{
        id: number;
        email: string;
        name: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        totpSecret: string | null;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password" | "totpSecret"> & {
        role: {
            id: number;
            name: string;
        };
    }>;
    createUser(body: CreateUserBodyDTO, userId: number, roleName: string): Promise<Omit<{
        id: number;
        email: string;
        name: string;
        password: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        totpSecret: string | null;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, "password" | "totpSecret">>;
    updateUser(body: UpdateUserBodyDTO, params: GetUserParamsDTO, userId: number, roleName: string): Promise<{
        id: number;
        email: string;
        name: string;
        phoneNumber: string;
        avatar: string | null;
        gender: string | null;
        roleId: number;
        dateOfBirth: Date | null;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteUser(params: GetUserParamsDTO, userId: number, roleName: string): Promise<{
        message: string;
    }>;
}
