// src/media/media.module.ts
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { S3Strategy } from './strategies/s3.strategy';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { CloudinaryStrategy } from './strategies/cloudinary.strategy';

@Module({
  controllers: [MediaController],
  providers: [
    S3Strategy,
    CloudinaryStrategy,
    { provide: 'IStorageStrategy', useClass: CloudinaryStrategy },
    MediaService,
    MediaRepository,
  ],
  exports: [MediaService],
})
export class MediaModule {}
