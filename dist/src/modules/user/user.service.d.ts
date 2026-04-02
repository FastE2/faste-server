import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { UserRepository } from './user.repository';
import { CreateUserBodyType, UpdateUserBodyType } from './user.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { CommonRoleRepository } from 'src/common/repositories/common-role.repository';
import { HashService } from 'src/common/libs/crypto/hash.service';
export declare class UserService {
    private readonly userRepository;
    private readonly commonUserRepository;
    private readonly commonRoleRepository;
    private readonly hashService;
    constructor(userRepository: UserRepository, commonUserRepository: CommonUserRepository, commonRoleRepository: CommonRoleRepository, hashService: HashService);
    getAllUsers(query: PaginationQueryType): Promise<{
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
    getUserById(id: number): Promise<Omit<{
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
    createUser({ data, updatedById, updatedByRoleName, }: {
        data: CreateUserBodyType;
        updatedById: number;
        updatedByRoleName: string;
    }): Promise<Omit<{
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
    updateUser({ id, data, updatedById, updatedByRoleName, }: {
        id: number;
        data: UpdateUserBodyType;
        updatedById: number;
        updatedByRoleName: string;
    }): Promise<{
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
    private verifyYourself;
    private verifyRoleAdmin;
    private getRoleIdByUserId;
    deleteUser({ id, deletedById, deletedByRoleName, }: {
        id: number;
        deletedById: number;
        deletedByRoleName: string;
    }): Promise<{
        message: string;
    }>;
}
