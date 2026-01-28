import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { AddressShipRepository } from './address-ship.repository';
import { CreateAddressShipBodyType, UpdateAddressShipBodyType } from './address-ship.schema';
export declare class AddressShipService {
    private readonly addressShipRepository;
    constructor(addressShipRepository: AddressShipRepository);
    getAllAddressShips(userId: number, query: PaginationQueryType): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    getAddressShipById(userId: number, id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        countryId: number;
        phone: string;
        divisionId: number;
        divisionPath: {
            STATE?: string | undefined;
            CITY?: string | undefined;
            DISTRICT?: string | undefined;
            WARD?: string | undefined;
        } | null;
        address: string;
        isDeliveryAddress: boolean;
        isDefault: boolean;
        street?: string | null | undefined;
        houseNumber?: string | null | undefined;
        addressInstruction?: string | null | undefined;
        zipcode?: string | null | undefined;
        town?: string | null | undefined;
        labelId?: number | null | undefined;
        deletedAt?: Date | null | undefined;
        geoinfo?: {
            region: {
                latitude: number;
                longitude: number;
            };
            auto_fill: boolean;
            user_adjusted?: boolean | undefined;
            user_verified?: boolean | undefined;
            source?: string | undefined;
            timestamp?: string | undefined;
            additionalData?: Record<string, unknown> | undefined;
        } | null | undefined;
        latitude?: number | null | undefined;
        longitude?: number | null | undefined;
        updatedAt?: Date | undefined;
    }>;
    getAddressShipByIdIsDefault(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        countryId: number;
        phone: string;
        divisionId: number;
        divisionPath: {
            STATE?: string | undefined;
            CITY?: string | undefined;
            DISTRICT?: string | undefined;
            WARD?: string | undefined;
        } | null;
        address: string;
        isDeliveryAddress: boolean;
        isDefault: boolean;
        street?: string | null | undefined;
        houseNumber?: string | null | undefined;
        addressInstruction?: string | null | undefined;
        zipcode?: string | null | undefined;
        town?: string | null | undefined;
        labelId?: number | null | undefined;
        deletedAt?: Date | null | undefined;
        geoinfo?: {
            region: {
                latitude: number;
                longitude: number;
            };
            auto_fill: boolean;
            user_adjusted?: boolean | undefined;
            user_verified?: boolean | undefined;
            source?: string | undefined;
            timestamp?: string | undefined;
            additionalData?: Record<string, unknown> | undefined;
        } | null | undefined;
        latitude?: number | null | undefined;
        longitude?: number | null | undefined;
        updatedAt?: Date | undefined;
    }>;
    createAddressShip({ data, userId, }: {
        data: CreateAddressShipBodyType;
        userId: number;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        countryId: number;
        phone: string;
        divisionId: number;
        divisionPath: {
            STATE?: string | undefined;
            CITY?: string | undefined;
            DISTRICT?: string | undefined;
            WARD?: string | undefined;
        } | null;
        address: string;
        isDeliveryAddress: boolean;
        isDefault: boolean;
        street?: string | null | undefined;
        houseNumber?: string | null | undefined;
        addressInstruction?: string | null | undefined;
        zipcode?: string | null | undefined;
        town?: string | null | undefined;
        labelId?: number | null | undefined;
        deletedAt?: Date | null | undefined;
        geoinfo?: {
            region: {
                latitude: number;
                longitude: number;
            };
            auto_fill: boolean;
            user_adjusted?: boolean | undefined;
            user_verified?: boolean | undefined;
            source?: string | undefined;
            timestamp?: string | undefined;
            additionalData?: Record<string, unknown> | undefined;
        } | null | undefined;
        latitude?: number | null | undefined;
        longitude?: number | null | undefined;
        updatedAt?: Date | undefined;
    }>;
    updateAddressShip({ id, data, userId, }: {
        id: number;
        data: UpdateAddressShipBodyType;
        userId: number;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        userId: number;
        countryId: number;
        phone: string;
        divisionId: number;
        divisionPath: {
            STATE?: string | undefined;
            CITY?: string | undefined;
            DISTRICT?: string | undefined;
            WARD?: string | undefined;
        } | null;
        address: string;
        isDeliveryAddress: boolean;
        isDefault: boolean;
        street?: string | null | undefined;
        houseNumber?: string | null | undefined;
        addressInstruction?: string | null | undefined;
        zipcode?: string | null | undefined;
        town?: string | null | undefined;
        labelId?: number | null | undefined;
        deletedAt?: Date | null | undefined;
        geoinfo?: {
            region: {
                latitude: number;
                longitude: number;
            };
            auto_fill: boolean;
            user_adjusted?: boolean | undefined;
            user_verified?: boolean | undefined;
            source?: string | undefined;
            timestamp?: string | undefined;
            additionalData?: Record<string, unknown> | undefined;
        } | null | undefined;
        latitude?: number | null | undefined;
        longitude?: number | null | undefined;
        updatedAt?: Date | undefined;
    }>;
    deleteAddressShip({ id, userId }: {
        id: number;
        userId: number;
    }): Promise<{
        message: string;
    }>;
}
