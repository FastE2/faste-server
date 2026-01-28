import { CommonUserRepository } from 'src/common/repositories/common-user.repository';
export declare class TwoFactorService {
    private readonly commonUserRepository;
    constructor(commonUserRepository: CommonUserRepository);
    private createTOTP;
    generateTOTPSecret(email: string): {
        secret: string;
        uri: string;
    };
    verifyTOTP({ email, token, secret, }: {
        email: string;
        secret: string;
        token: string;
    }): boolean;
    enableTwoFaForUser(userId: number, secretBase32: string): Promise<{
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
    } | null>;
    disableTwoFaForUser(userId: number): Promise<{
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
    } | null>;
}
