import { GetParamsProvincesDTO, QueryProvincesDTO } from './provinces.dto';
import { ProvincesService } from './provinces.service';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    getStates(countryCode: string, query: QueryProvincesDTO): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getStateById(params: GetParamsProvincesDTO): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getCities(countryCode: string, query: QueryProvincesDTO): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getCityById(params: GetParamsProvincesDTO): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getDistricts(countryCode: string, query: QueryProvincesDTO): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getDistrictById(params: GetParamsProvincesDTO): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
    getWards(countryCode: string, query: QueryProvincesDTO): Promise<{
        data: any;
        totalItem: any;
        page: number;
        limit: number;
        totalPage: number;
    }>;
    getWardById(params: GetParamsProvincesDTO): Promise<{
        id: number;
        name: string;
        code: string | null;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
    }>;
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
}
