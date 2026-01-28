import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLanguageBodyType, LanguageType, UpdateLanguageBodyType } from './language.schema';
export declare class LanguageRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    list(): Promise<LanguageType[]>;
    findById(id: number): Promise<LanguageType | null>;
    create(data: CreateLanguageBodyType & {
        createdById: number;
    }): Promise<LanguageType>;
    update({ id, updatedById, data, }: {
        id: number;
        updatedById: number;
        data: UpdateLanguageBodyType;
    }): Promise<LanguageType>;
    delete({ id, deletedById, }: {
        id: number;
        deletedById: number;
    }, isHard?: boolean): Promise<any>;
}
