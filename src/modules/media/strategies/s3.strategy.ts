// Interface Segregation Principle
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IStorageStrategy } from '../interfaces/storage-strategy.interface';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import envConfig from 'src/common/configs/validate-env';
import mime from 'mime-types';
import { Upload } from '@aws-sdk/lib-storage';
import { generateRandomFilename } from 'src/common/helpers/random-file-name.helper';

@Injectable()
export class S3Strategy implements IStorageStrategy {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = envConfig.AWS_S3_PUBLIC_BUCKET;
    this.client = new S3Client({
      region: envConfig.AWS_S3_REGION,
      credentials: {
        accessKeyId: envConfig.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: envConfig.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }> {
    const filename = generateRandomFilename(file.originalname);

    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: isPublic ? 'public-read' : 'private',
    });

    try {
      await this.client.send(cmd);
      const url = isPublic
        ? `https://${this.bucket}.s3.amazonaws.com/${filename}`
        : await this.getPresignedUrl(filename);
      return { filename, url };
    } catch (err) {
      throw new InternalServerErrorException('S3 upload error: ' + err.message);
    }
  }

  async uploadFileMutiple(
    file: Express.Multer.File,
    isPublic: boolean,
  ): Promise<{ filename: string; url: string }> {
    const filename = generateRandomFilename(file.originalname.split('.')[0]);

    try {
      // Sử dụng multipart upload cho file lớn
      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: this.bucket,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: isPublic ? 'public-read' : 'private',
        },
        queueSize: 4, // upload 4 part cùng lúc
        partSize: 5 * 1024 * 1024, // mỗi part 5MB
        leavePartsOnError: false,
      });

      await upload.done();

      const url = isPublic
        ? `https://${this.bucket}.s3.amazonaws.com/${filename}`
        : await this.getPresignedUrl(filename);

      return { filename, url };
    } catch (err) {
      console.log('upload', err.message);
      throw new InternalServerErrorException('S3 multipart upload error');
    }
  }

  async deleteFile(filename: string): Promise<{
    message: string;
  }> {
    const cmd = new DeleteObjectCommand({ Bucket: this.bucket, Key: filename });
    await this.client.send(cmd);
    return { message: 'Delete successfully' };
  }

  async getPresignedUrl(filename: string): Promise<string> {
    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: filename });
    return await getSignedUrl(this.client, cmd, { expiresIn: 60 });
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
    let continuationToken: string | undefined = undefined;
    let currentPage = 1;
    let images: any = [];
    do {
      const cmd = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix, // nếu muốn lọc theo folder
        ContinuationToken: continuationToken,
        MaxKeys: limit,
      });
      const response: ListObjectsV2CommandOutput = await this.client.send(cmd);
      console.log(response)
      // Lọc chỉ lấy file ảnh theo đuôi
      if (response.Contents) {
        const filtered = response.Contents.filter(
          (item) => item.Key && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.Key),
        ).map((item) => ({
          url: `https://${this.bucket}.s3.amazonaws.com/${item.Key}`,
          fileSize: item.Size,
          createdAt: item.LastModified,
        }));
        if (currentPage === page) {
          images = filtered;
          break;
        }
        // response.Contents.forEach((item) => {
        //   console.log(item);
        //   if (item.Key && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.Key)) {
        //     images.push({
        //       url: `https://${this.bucket}.s3.amazonaws.com/${item.Key}`,
        //       fileSize: item.Size,
        //       createdAt: item.LastModified,
        //     });
        //   }
        // });
      }
      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;
      currentPage++;
    } while (continuationToken);
    return images;
  }

  async createPresignedUrlWithClient(filename: string): Promise<string> {
    const contentType = mime.lookup(filename) || 'application/octet-stream';
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      ContentType: contentType,
    });
    return await getSignedUrl(this.client, cmd, { expiresIn: 30 });
  }
}
