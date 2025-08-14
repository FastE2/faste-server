import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetUserParamsDTO,
  GetUserByIdResDTO,
  GetUsersQueryDTO,
  GetUsersResDTO,
  UpdateUserBodyDTO,
  UpdateUserResDTO,
} from './user.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveRolePermissions } from 'src/common/decorators/active-role-permissions.decorator';

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
  getById(@Param() params: GetUserParamsDTO) {
    return this.userService.getUserById(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateUserResDTO)
  updateUser(
    @Body() body: UpdateUserBodyDTO,
    @Param() params: GetUserParamsDTO,
    @ActiveUser('userId') userId: number,
    @ActiveRolePermissions('name') roleName: string,
  ) {
    return this.userService.updateUser({
      id: params.id,
      data: body,
      updatedById: userId,
      updatedByRoleName: roleName,
    });
  }
}
