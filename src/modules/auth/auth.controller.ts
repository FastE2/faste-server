import { Body, Controller, Ip, Post, Req, Res } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  LoginBodyDTO,
  LoginResDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { Request, Response } from 'express';
import { EmptyBodyDTO } from 'src/common/dtos/request.dto';
import { MessageResDto } from 'src/common/dtos/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(RegisterResDTO)
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  @ZodSerializerDto(LoginResDTO)
  login(
    @Body() body: LoginBodyDTO,
    @UserAgent() userAgent: string,
    @Ip() ip: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log({ userAgent, ip });
    return this.authService.login({ ...body, userAgent, ip }, res);
  }

  @Post('refresh-token')
  @ZodSerializerDto(RefreshTokenResDTO)
  refreshToken(
    @Body() body: EmptyBodyDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    return this.authService.refreshToken(token, res);
  }

  @Post('logout')
  @ZodSerializerDto(MessageResDto)
  logout(
    @Body() body: EmptyBodyDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    return this.authService.logout(token, res);
  }
}
