import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { DeliveryTypeService } from './delivery-type.service';
import { CreateDeliveryTypeBodyDTO, UpdateDeliveryTypeBodyDTO } from './delivery-type.dto';
export declare class DeliveryTypeController {
    private readonly deliveryTypeService;
    constructor(deliveryTypeService: DeliveryTypeService);
    getAllDeliveryTypes(query: PaginationQueryDTO): Promise<{
        data: import("./delivery-type.schema").DeliveryTypeType[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createDeliveryType(body: CreateDeliveryTypeBodyDTO, userId: number): Promise<{
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
    getById(params: GetParamsDTO): Promise<{
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
    updateDeliveryType(body: UpdateDeliveryTypeBodyDTO, params: GetParamsDTO, userId: number): Promise<{
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
    deleteDeliveryType(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
