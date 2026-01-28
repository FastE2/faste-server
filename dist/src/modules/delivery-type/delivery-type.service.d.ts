import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { DeliveryTypeRepository } from './delivery-type.repository';
import { CreateDeliveryTypeBodyType, UpdateDeliveryTypeBodyType } from './delivery-type.schema';
export declare class DeliveryTypeService {
    private readonly deliveryTypeRepository;
    constructor(deliveryTypeRepository: DeliveryTypeRepository);
    getAllDeliveryTypes(query: PaginationQueryType): Promise<{
        data: import("./delivery-type.schema").DeliveryTypeType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getDeliveryTypeById(id: number): Promise<{
        id: number;
        name: string;
        code: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        basePrice: number;
        countryCode: string;
        pricePerKg: number;
        estimatedTime?: string | null | undefined;
    }>;
    createDeliveryType({ data, createdById, }: {
        data: CreateDeliveryTypeBodyType;
        createdById: number;
    }): Promise<{
        id: number;
        name: string;
        code: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        basePrice: number;
        countryCode: string;
        pricePerKg: number;
        estimatedTime?: string | null | undefined;
    }>;
    updateDeliveryType({ id, data, updatedById, }: {
        id: number;
        data: UpdateDeliveryTypeBodyType;
        updatedById: number;
    }): Promise<{
        id: number;
        name: string;
        code: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        description: string;
        basePrice: number;
        countryCode: string;
        pricePerKg: number;
        estimatedTime?: string | null | undefined;
    }>;
    deleteDeliveryType({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }): Promise<{
        message: string;
    }>;
}
