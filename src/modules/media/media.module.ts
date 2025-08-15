// src/media/media.module.ts
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { S3Strategy } from './strategies/s3.strategy';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';

@Module({
  controllers: [MediaController],
  providers: [
    S3Strategy,
    { provide: 'IStorageStrategy', useClass: S3Strategy },
    MediaService,
    MediaRepository,
  ],
  exports: [MediaService],
})
export class MediaModule {}
