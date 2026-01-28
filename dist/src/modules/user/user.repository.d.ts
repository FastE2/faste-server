import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserBodyType, GetUsersResType } from './user.schema';
import { UserType } from 'src/common/schemas/user.schema';
export declare class UserRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<GetUsersResType>;
    create({ createdById, data, }: {
        createdById: number | null;
        data: CreateUserBodyType;
    }): Promise<Omit<UserType, 'password' | 'totpSecret'>>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<UserType>;
}
