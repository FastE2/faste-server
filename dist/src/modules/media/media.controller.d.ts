import { MediaService } from './media.service';
import { GetMediasQueryDTO, PresignedUploadFileBodyDTO } from './media.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File, isPublic: string, userId: number): Promise<{
        type: import(".prisma/client").$Enums.FileType;
        createdById: number;
        createdAt: Date;
        url: string;
        key: string;
        size: number;
        isPublic: boolean;
    }>;
    delete(filename: string): Promise<{
        message: string;
    }>;
    getPresigned(filename: string): Promise<string>;
    GetAllImagesInS3(query: GetMediasQueryDTO): Promise<{
        data: string[];
        page: number;
        limit: number;
    }>;
    GetAllImagesInDB(query: GetMediasQueryDTO): Promise<{
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
    createPresignedUrl(body: PresignedUploadFileBodyDTO): Promise<string>;
}
