import { PaginationQueryDTO } from 'src/common/dtos/request.dto';
import { GetParamsProvincesDTO } from './provinces.dto';
import { ProvincesService } from './provinces.service';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    getStates(countryCode: string, query: PaginationQueryDTO): Promise<{
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
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getCities(countryCode: string, query: PaginationQueryDTO): Promise<{
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
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getDistricts(countryCode: string, query: PaginationQueryDTO): Promise<{
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
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
    }>;
    getWards(countryCode: string, query: PaginationQueryDTO): Promise<{
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
        countryId: number | null;
        level: import(".prisma/client").$Enums.DivisionLevel;
        parentId: number | null;
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
