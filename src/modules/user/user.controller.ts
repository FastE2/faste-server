import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetUserByIdParamsDTO,
  GetUserByIdResDTO,
  GetUsersQueryDTO,
  GetUsersResDTO,
} from './user.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ZodSerializerDto(GetUsersResDTO)
  getAllUser(@Query() query: GetUsersQueryDTO) {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  @ZodSerializerDto(GetUserByIdResDTO)
  getById(@Param() params: GetUserByIdParamsDTO) {
    return this.userService.getUserById(params.id);
  }
}
