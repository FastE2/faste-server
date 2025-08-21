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

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
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
        // fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body('isPublic') isPublic: string,
    @ActiveUser('userId') userId: number,
  ) {
    const isPublicBool = isPublic === 'true' ? true : false;
    return this.mediaService.upload(file, isPublicBool, userId);
  }

  // @Post('upload-mutiple')
  // @UseInterceptors(
  //   FilesInterceptor('files', 100, {
  //     limits: {
  //       fileSize: 5 * 1024 * 1024, // 1MB
  //     },
  //   }),
  // )
  // uploadFile(
  //   @UploadedFile() // new ParseFilePipeWithUnlink({
  //   file //   validators: [
  //   //     new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }), // 5MB
  //   //     new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
  //   //   ],
  //   // }),
  //   : Express.Multer.File,
  // ) {
  //   return this.mediaService.upload(file, false);
  // }

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
  GetAllImagesInS3(@Query() query: GetMediasQueryDTO) {
    return this.mediaService.getAllImagesInS3(query);
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
