// src/dms/dms.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IStorageStrategy } from './interfaces/storage-strategy.interface';
import { PresignedUploadFileBodyType } from './media.schema';
import { MAX_SIZE } from 'src/common/constants/media.constant';
import { generateRandomFilename } from 'src/common/helpers/random-file-name.helper';
import { PaginationQueryType } from 'src/common/schemas/request.schema';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    @Inject('IStorageStrategy') private readonly storage: IStorageStrategy,
    private readonly mediaRepository: MediaRepository,
  ) {}

  async upload(file: Express.Multer.File, isPublic = true, userId: number) {
    const { filename, url } = await this.storage.uploadFile(file, isPublic);

    // console.log(file);

    return await this.mediaRepository.create({
      key: filename,
      type: 'IMAGE',
      size: file.size,
      url,
      isPublic,
      createdById: userId,
    });
  }

  // uploadMutiple(files: Array<Express.Multer.File>, isPublic = true) {
  //   return this.storage.uploadFileMutiple()
  // }

  async delete(key: string) {
    try {
      const result = await this.storage.deleteFile(key);
      if (!result.message) {
        throw new InternalServerErrorException('Delete file error');
      }
      await this.mediaRepository.delete(key);
      return result;
    } catch (error) {
      console.log('/media', error);
      throw error;
    }
  }

  getSignedUrl(key: string) {
    return this.storage.getPresignedUrl(key);
  }

  getPresignUrl(body: PresignedUploadFileBodyType) {
    if (body.filesize > MAX_SIZE) {
      throw new BadRequestException('File size exceeds 1MB');
    }
    const randomFilename = generateRandomFilename(body.filename);
    return this.storage.createPresignedUrlWithClient(randomFilename);
  }

  async getAllImagesInS3(query: PaginationQueryType) {
    const data = await this.storage.getAllImages({
      page: query.page,
      limit: query.limit,
      prefix: '',
    });
    return {
      data,
      page: query.page,
      limit: query.limit,
    };
  }

  async getAllImagesInDB(query: PaginationQueryType) {
    return await this.mediaRepository.list(query);
  }
}
