import { PrismaService } from 'src/prisma/prisma.service';
export type WhereUniqueUserType = {
    id: number;
} | {
    email: string;
};
export declare class CommonRoleRepository {
    private readonly prismaService;
    private clientRoleId;
    private adminRoleId;
    private sellerRoleId;
    constructor(prismaService: PrismaService);
    private getRole;
    getClientRoleId(): Promise<number | null>;
    getAdminRoleId(): Promise<number | null>;
    getSellerRoleId(): Promise<number | null>;
}
