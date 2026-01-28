import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeliveryTypeType, CreateDeliveryTypeBodyType, UpdateDeliveryTypeBodyType } from './delivery-type.schema';
export declare class DeliveryTypeRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(pagination: PaginationQueryType): Promise<{
        data: DeliveryTypeType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    findById(id: number): Promise<DeliveryTypeType | null>;
    create({ createdById, data, }: {
        createdById: number;
        data: CreateDeliveryTypeBodyType;
    }): Promise<DeliveryTypeType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateDeliveryTypeBodyType;
    }): Promise<DeliveryTypeType>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
