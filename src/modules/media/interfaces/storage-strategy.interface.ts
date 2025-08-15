export interface GetAllImagesParams {
  page: number;
  limit: number;
  prefix: string;
}

export interface IStorageStrategy {
  uploadFile(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }>;

  uploadFileMutiple(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }>;

  deleteFile(filename: string): Promise<{
    message: string;
  }>;

  getPresignedUrl(filename: string): Promise<string>;

  getAllImages(GetAllImagesParams): Promise<string[]>;

  createPresignedUrlWithClient(filename: string): Promise<string>;
}
