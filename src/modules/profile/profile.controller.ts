import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  UpdateProfileBodyDTO,
  ChangePasswordProfileBodyDTO,
} from './profile.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDTO } from 'src/common/dtos/response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@ActiveUser('userId') userId: number) {
    return this.profileService.getProfile(userId);
  }

  @Patch('')
  updateUser(
    @Body() body: UpdateProfileBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.profileService.updateProfile({
      id: userId,
      data: body,
    });
  }

  @Put('/change-password')
  @ZodSerializerDto(MessageResDTO)
  changePassword(
    @Body() body: ChangePasswordProfileBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.profileService.changePassword({
      id: userId,
      data: body,
    });
  }
}
