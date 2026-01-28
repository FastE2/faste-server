import { VerificationCodeTypeType } from 'src/common/constants/auth.constant';
import { RoleType } from 'src/common/schemas/role.schema';
import { UserType } from 'src/common/schemas/user.schema';
import { RefreshTokenType, RegisterResType, VerificationCodeType } from 'src/modules/auth/auth.schema';
import { PrismaService } from 'src/prisma/prisma.service';
type UserWithoutPassword = Omit<UserType, 'password'> & {
    role: {
        id: number;
    };
};
export declare class AuthRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(user: Pick<UserType, 'roleId' | 'email' | 'name' | 'password' | 'phoneNumber'>): Promise<RegisterResType>;
    createUserIncludeRole(user: Pick<UserType, 'roleId' | 'email' | 'name' | 'password' | 'phoneNumber' | 'avatar'>): Promise<Promise<UserType & {
        role: RoleType;
    }>>;
    updateOrCreateDeviceUser(body: {
        ip: string;
        userAgent: string;
        userId: number;
    }): import(".prisma/client").Prisma.Prisma__DeviceClient<{
        id: number;
        createdAt: Date;
        userId: number;
        userAgent: string;
        ip: string;
        lastActive: Date;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    createRefreshToken(data: {
        token: string;
        deviceId: number;
        userId: number;
        expiresAt: Date;
    }): import(".prisma/client").Prisma.Prisma__RefreshTokenClient<{
        createdAt: Date;
        token: string;
        userId: number;
        deviceId: number;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUniqueRefreshTokenIncludeUserRole(token: string): Promise<UserWithoutPassword | null>;
    deleteRefreshToken(token: string): Promise<RefreshTokenType>;
    createVerificationCode(payload: Omit<VerificationCodeType, 'id' | 'createdAt'>): import(".prisma/client").Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        code: string;
        type: import(".prisma/client").$Enums.VerificationCodeType;
        createdAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findUniqueVerificationCode(uniqueValue: {
        id: number;
    } | {
        email_type: {
            email: string;
            type: keyof typeof VerificationCodeTypeType;
        };
    }): Promise<VerificationCodeType | null>;
    deleteVerificationCode(uniqueValue: {
        id: number;
    } | {
        email_type: {
            email: string;
            type: keyof typeof VerificationCodeTypeType;
        };
    }): import(".prisma/client").Prisma.Prisma__VerificationCodeClient<{
        id: number;
        email: string;
        code: string;
        type: import(".prisma/client").$Enums.VerificationCodeType;
        createdAt: Date;
        expiresAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
export {};
