import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IStorageStrategy } from '../interfaces/storage-strategy.interface';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CloudinaryStrategy implements IStorageStrategy {
  constructor() {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    if (cloudinaryUrl) {
      cloudinary.config({
        cloudinary_url: cloudinaryUrl,
      });
    }
  }

  private checkConfig() {
    if (!cloudinary.config().api_key) {
      throw new InternalServerErrorException(
        'Cloudinary credentials are not configured. Please set CLOUDINARY_URL in .env',
      );
    }
  }

  private uploadStream(fileBuffer: Buffer, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            return reject(
              new Error(error.message || 'Cloudinary upload failed'),
            );
          }
          resolve(result);
        },
      );
      Readable.from(fileBuffer).pipe(stream);
    });
  }

  private uploadChunkedStream(fileBuffer: Buffer, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_chunked_stream(
        options,
        (error, result) => {
          if (error) {
            return reject(
              new Error(error.message || 'Cloudinary chunked upload failed'),
            );
          }
          resolve(result);
        },
      );
      Readable.from(fileBuffer).pipe(stream);
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }> {
    this.checkConfig();
    try {
      const options: any = {
        folder: 'faste',
        resource_type: 'auto',
        type: isPublic ? 'upload' : 'authenticated',
      };

      const result = await this.uploadStream(file.buffer, options);
      const filename = result.public_id;
      const url = isPublic
        ? result.secure_url
        : await this.getPresignedUrl(filename);
      return { filename, url };
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary upload error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async uploadFileMutiple(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }> {
    this.checkConfig();
    try {
      const options: any = {
        folder: 'faste',
        resource_type: 'auto',
        type: isPublic ? 'upload' : 'authenticated',
        chunk_size: 6000000,
      };

      const result = await this.uploadChunkedStream(file.buffer, options);
      const filename = result.public_id;
      const url = isPublic
        ? result.secure_url
        : await this.getPresignedUrl(filename);
      return { filename, url };
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary multiple upload error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }[]> {
    this.checkConfig();
    const uploadPromises = files.map(async (file) => {
      try {
        const options: any = {
          folder: 'faste',
          resource_type: 'auto',
          type: isPublic ? 'upload' : 'authenticated',
        };
        const result = await this.uploadStream(file.buffer, options);
        const filename = result.public_id;
        const url = isPublic
          ? result.secure_url
          : await this.getPresignedUrl(filename);
        return { filename, url };
      } catch (err) {
        throw new InternalServerErrorException(
          'Cloudinary multiple upload error: ' +
            (err instanceof Error ? err.message : String(err)),
        );
      }
    });
    return Promise.all(uploadPromises);
  }

  async deleteFile(filename: string): Promise<{ message: string }> {
    this.checkConfig();
    try {
      await cloudinary.uploader.destroy(filename, { type: 'upload' });
      await cloudinary.uploader.destroy(filename, { type: 'authenticated' });
      return { message: 'Delete successfully' };
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary delete error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  getPresignedUrl(filename: string): Promise<string> {
    this.checkConfig();
    try {
      const url = cloudinary.url(filename, {
        sign_url: true,
        type: 'authenticated',
        expires_at: Math.floor(Date.now() / 1000) + 60,
        secure: true,
      });
      return Promise.resolve(url);
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary presign error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async getAllImages({
    page = 1,
    limit = 10,
    prefix = '',
  }: {
    page: number;
    limit: number;
    prefix: string;
  }): Promise<string[]> {
    this.checkConfig();
    try {
      let nextCursor: string | undefined = undefined;
      let currentPage = 1;
      let images: string[] = [];
      do {
        const response = await cloudinary.api.resources({
          type: 'upload',
          prefix: 'faste',
          max_results: limit,
          next_cursor: nextCursor,
        });
        if (currentPage === page) {
          images = response.resources.map(
            (resource: any) => resource.secure_url,
          );
          break;
        }
        nextCursor = response.next_cursor;
        currentPage++;
      } while (nextCursor);
      return images;
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary list error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  createPresignedUrlWithClient(filename: string): Promise<string> {
    this.checkConfig();
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const apiSecret = cloudinary.config().api_secret!;
      const apiKey = cloudinary.config().api_key;
      const cloudName = cloudinary.config().cloud_name;

      const baseName = filename.split('.')[0].replace(/[^a-zA-Z0-9_-]/g, '');
      const publicId = `${baseName}_${uuidv4().slice(0, 8)}`;

      const paramsToSign: Record<string, any> = {
        folder: 'faste',
        overwrite: false,
        public_id: publicId,
        timestamp: timestamp,
        unique_filename: false,
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        apiSecret,
      );

      const queryParams = new URLSearchParams({
        api_key: apiKey!,
        timestamp: timestamp.toString(),
        signature: signature,
        public_id: publicId,
        folder: 'faste',
        overwrite: 'false',
        unique_filename: 'false',
      });

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?${queryParams.toString()}`;

      return Promise.resolve(url);
    } catch (err) {
      throw new InternalServerErrorException(
        'Cloudinary client presign error: ' +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }
}
