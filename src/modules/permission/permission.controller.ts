import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { MessageResDto } from 'src/common/dtos/response.dto';
import { PermissionService } from './permission.service';
import {
  CreatePermissionBodyDTO,
  CreatePermissionResDTO,
  GetPermissionByIdResDTO,
  GetPermissionParamsDTO,
  GetPermissionsResDTO,
  UpdatePermissionBodyDTO,
  UpdatePermissionResDTO,
} from './permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ZodSerializerDto(GetPermissionsResDTO)
  getAllUser() {
    return this.permissionService.getAllPermissions();
  }
  @Post()
  @ZodSerializerDto(CreatePermissionResDTO)
  createUser(
    @Body() body: CreatePermissionBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.createPermission({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetPermissionByIdResDTO)
  getById(@Param() params: GetPermissionParamsDTO) {
    return this.permissionService.getPermissionById(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdatePermissionResDTO)
  updateUser(
    @Body() body: UpdatePermissionBodyDTO,
    @Param() params: GetPermissionParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.updatePermission({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDto)
  deleteUser(
    @Param() params: GetPermissionParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.permissionService.deletePermission({
      id: params.id,
      deletedById: userId,
    });
  }
}
