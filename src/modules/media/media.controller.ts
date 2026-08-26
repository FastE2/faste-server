import {
  Controller,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  ParseFilePipe,
  Get,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { GetMediasQueryDTO, PresignedUploadFileBodyDTO } from './media.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Ispublic } from 'src/common/decorators/auth.decorator';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @Ispublic()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
          new MaxFileSizeValidator({
            maxSize: 1 * 1024 * 1024, // 1MB
            message: 'File is too large. Max file size is 1MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
    @ActiveUser('userId') userId: number,
  ) {
    const isPublicBool = isPublic === 'true' ? true : false;
    return this.mediaService.upload(file, isPublicBool, userId);
  }

  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 1 * 1024 * 1024, // 1MB
      },
    }),
  )
  uploadFileMultiple(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
          new MaxFileSizeValidator({
            maxSize: 1 * 1024 * 1024, // 1MB
            message: 'File is too large. Max file size is 1MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.mediaService.uploadMultipleFiles(files, true);
  }

  @Delete(':filename')
  @ZodSerializerDto(MessageResDTO)
  delete(@Param('filename') filename: string) {
    return this.mediaService.delete(filename);
  }

  @Post('presigned/:filename')
  getPresigned(@Param('filename') filename: string) {
    return this.mediaService.getSignedUrl(filename);
  }

  @Get('all')
  GetAllImagesInCloud(@Query() query: GetMediasQueryDTO) {
    return this.mediaService.getAllImagesInCloud(query);
  }

  @Get('')
  GetAllImagesInDB(@Query() query: GetMediasQueryDTO) {
    return this.mediaService.getAllImagesInDB(query);
  }

  @Post('upload/presigned-url')
  createPresignedUrl(@Body() body: PresignedUploadFileBodyDTO) {
    return this.mediaService.getPresignUrl(body);
  }
}
