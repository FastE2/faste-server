import { GetParamsDTO, PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { AddressShipService } from './address-ship.service';
import { CreateAddressShipBodyDTO, UpdateAddressShipBodyDTO } from './address-ship.dto';
export declare class AddressShipController {
    private readonly addressShipService;
    constructor(addressShipService: AddressShipService);
    getAllAddressShips(query: PaginationQueryDTO, userId: number): Promise<{
        data: any[];
        totalItem: number;
        page: number;
        limmit: number;
        totalPage: number;
    }>;
    createAddressShip(body: CreateAddressShipBodyDTO, userId: number): Promise<{
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
    getAddressShipById(params: GetParamsDTO, userId: number): Promise<{
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
    getAddressShipByIdIsDefault(params: GetParamsDTO): Promise<{
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
    updateAddressShip(body: UpdateAddressShipBodyDTO, params: GetParamsDTO, userId: number): Promise<{
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
    deleteAddressShip(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
