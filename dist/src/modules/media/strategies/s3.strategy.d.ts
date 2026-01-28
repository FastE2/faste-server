import { IStorageStrategy } from '../interfaces/storage-strategy.interface';
export declare class S3Strategy implements IStorageStrategy {
    private client;
    private bucket;
    constructor();
    uploadFile(file: Express.Multer.File, isPublic: boolean): Promise<{
        filename: string;
        url: string;
    }>;
    uploadFileMutiple(file: Express.Multer.File, isPublic: boolean): Promise<{
        filename: string;
        url: string;
    }>;
    deleteFile(filename: string): Promise<{
        message: string;
    }>;
    getPresignedUrl(filename: string): Promise<string>;
    getAllImages({ page, limit, prefix, }: {
        page: number;
        limit: number;
        prefix: string;
    }): Promise<string[]>;
    createPresignedUrlWithClient(filename: string): Promise<string>;
}
