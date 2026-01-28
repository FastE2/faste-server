import { ChangePasswordProfileBodyType } from './profile.schema';
import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
import { HashService } from 'src/common/libs/crypto/hash.service';
import { UpdateUserBodyType } from '../user/user.schema';
export declare class ProfileService {
    private readonly commonUserRepository;
    private readonly hashService;
    constructor(commonUserRepository: CommonUserRepository, hashService: HashService);
    getProfile(id: number): Promise<any>;
    updateProfile({ id, data }: {
        id: number;
        data: UpdateUserBodyType;
    }): Promise<{
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
    changePassword({ id, data, }: {
        id: number;
        data: ChangePasswordProfileBodyType;
    }): Promise<{
        message: string;
    }>;
}
