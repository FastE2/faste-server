import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersQueryDTO, GetUsersResDTO } from './user.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ZodSerializerDto(GetUsersResDTO)
  getAllUser(@Query() query: GetUsersQueryDTO) {
    return this.userService.getAllUsers(query);
  }
}
