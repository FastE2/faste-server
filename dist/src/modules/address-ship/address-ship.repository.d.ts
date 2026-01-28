import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressShipType, CreateAddressShipBodyType, UpdateAddressShipBodyType } from './address-ship.schema';
export declare class AddressShipRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(userId: number, pagination: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(userId: number, id: number): Promise<AddressShipType | null>;
    findByIdIsDefault(id: number): Promise<AddressShipType | null>;
    create({ userId, data, }: {
        userId: number;
        data: CreateAddressShipBodyType;
    }): Promise<AddressShipType>;
    update({ id, userId, data, }: {
        id: number;
        userId: number;
        data: UpdateAddressShipBodyType;
    }): Promise<AddressShipType>;
    delete({ id, userId, }: {
        id: number;
        userId: number;
    }, isHard?: boolean): Promise<any>;
}
