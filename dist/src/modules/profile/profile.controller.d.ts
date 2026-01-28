import { ProfileService } from './profile.service';
import { UpdateProfileBodyDTO, ChangePasswordProfileBodyDTO } from './profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(userId: number): Promise<any>;
    updateUser(body: UpdateProfileBodyDTO, userId: number): Promise<{
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
    changePassword(body: ChangePasswordProfileBodyDTO, userId: number): Promise<{
        message: string;
    }>;
}
