import { LanguageService } from './language.service';
import { GetParamsDTO } from 'src/common/dtos/request.dto';
import { CreateLanguageBodyDTO, UpdateLanguageBodyDTO } from './language.dto';
export declare class LanguageController {
    private readonly languageService;
    constructor(languageService: LanguageService);
    findAllLanguages(): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOneLanguage(params: GetParamsDTO): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createLanguage(body: CreateLanguageBodyDTO, userId: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateLanguage(params: GetParamsDTO, body: UpdateLanguageBodyDTO, userId: number): Promise<{
        id: number;
        name: string;
        createdById: number | null;
        updatedById: number | null;
        deletedById: number | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteLanguage(params: GetParamsDTO, userId: number): Promise<{
        message: string;
    }>;
}
