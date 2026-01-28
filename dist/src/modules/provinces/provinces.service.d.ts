import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { ProvincesRepository } from './provinces.repository';
export declare class ProvincesService {
    private readonly provincesRepository;
    constructor(provincesRepository: ProvincesRepository);
    getCountryById(countryCode: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        iso2: string;
        iso3: string | null;
        phoneCode: string | null;
        addressFormat: PrismaJson.AddressFormat | null;
    }>;
    getStates(countryCode: string, query: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getDistricts(countryCode: string, query: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getCities(countryCode: string, query: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getWards(countryCode: string, query: PaginationQueryType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getStateById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getDistrictById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getCityById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getWardById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
}
