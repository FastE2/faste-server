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
import { MessageResDTO } from 'src/common/dtos/response.dto';
import { RoleService } from './role.service';
import {
  CreateRoleBodyDTO,
  CreateRoleResDTO,
  GetRoleByIdResDTO,
  GetRoleParamsDTO,
  GetRolesQueryDTO,
  GetRolesResDTO,
  UpdateRoleBodyDTO,
  UpdateRoleResDTO,
} from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ZodSerializerDto(GetRolesResDTO)
  getAllUser(@Query() query: GetRolesQueryDTO) {
    return this.roleService.getAllRoles(query);
  }
  @Post()
  @ZodSerializerDto(CreateRoleResDTO)
  createUser(
    @Body() body: CreateRoleBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.roleService.createRole({
      data: body,
      createdById: userId,
    });
  }

  @Get('/:id')
  @ZodSerializerDto(GetRoleByIdResDTO)
  getById(@Param() params: GetRoleParamsDTO) {
    return this.roleService.getRoleById(params.id);
  }

  @Get('/:id/permissions')
  // @ZodSerializerDto(GetRoleByIdResDTO)
  getByIdIncludePermission(@Param() params: GetRoleParamsDTO) {
    return this.roleService.getRoleByIdIncludePermissions(params.id);
  }

  @Patch('/:id')
  @ZodSerializerDto(UpdateRoleResDTO)
  updateUser(
    @Body() body: UpdateRoleBodyDTO,
    @Param() params: GetRoleParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.roleService.updateRole({
      id: params.id,
      data: body,
      updatedById: userId,
    });
  }

  @Delete('/:id')
  @ZodSerializerDto(MessageResDTO)
  deleteUser(
    @Param() params: GetRoleParamsDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.roleService.deleteRole({
      id: params.id,
      deletedById: userId,
    });
  }
}
