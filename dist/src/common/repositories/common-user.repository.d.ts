import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '../schemas/user.schema';
export type WhereUniqueUserType = {
    id: number;
} | {
    email: string;
};
export declare class CommonUserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUniqueUser(where: WhereUniqueUserType): Promise<UserType | null>;
    findUniqueUserProfile(where: WhereUniqueUserType): Promise<any>;
    findUniqueUserIncludeRole(where: WhereUniqueUserType): Promise<(Omit<UserType, 'password' | 'totpSecret'> & {
        role: {
            id: number;
            name: string;
        };
    }) | null>;
    update(where: {
        id: number;
    }, data: Partial<UserType>): Promise<UserType | null>;
}
