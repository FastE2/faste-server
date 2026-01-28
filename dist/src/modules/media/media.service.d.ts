import { IStorageStrategy } from './interfaces/storage-strategy.interface';
import { PresignedUploadFileBodyType } from './media.schema';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { MediaRepository } from './media.repository';
export declare class MediaService {
    private readonly storage;
    private readonly mediaRepository;
    constructor(storage: IStorageStrategy, mediaRepository: MediaRepository);
    upload(file: Express.Multer.File, isPublic: boolean | undefined, userId: number): Promise<{
        type: import(".prisma/client").$Enums.FileType;
        createdById: number;
        createdAt: Date;
        url: string;
        key: string;
        size: number;
        isPublic: boolean;
    }>;
    delete(key: string): Promise<{
        message: string;
    }>;
    getSignedUrl(key: string): Promise<string>;
    getPresignUrl(body: PresignedUploadFileBodyType): Promise<string>;
    getAllImagesInS3(query: PaginationQueryType): Promise<{
        data: string[];
        page: number;
        limit: number;
    }>;
    getAllImagesInDB(query: PaginationQueryType): Promise<{
        data: {
            type: import(".prisma/client").$Enums.FileType;
            createdById: number;
            createdAt: Date;
            url: string;
            key: string;
            size: number;
            isPublic: boolean;
        }[];
        page: number;
        limit: number;
        totalPage: number;
    }>;
}
