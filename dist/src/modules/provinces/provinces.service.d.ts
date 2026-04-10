import { ProvincesRepository } from './provinces.repository';
import { QueryProvincesType } from './provinces.schema';
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
    getStates(countryCode: string, query: QueryProvincesType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getDistricts(countryCode: string, query: QueryProvincesType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getCities(countryCode: string, query: QueryProvincesType): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getWards(countryCode: string, query: QueryProvincesType): Promise<{
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
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getDistrictById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getCityById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getWardById(countryCode: string, id: number): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
}
