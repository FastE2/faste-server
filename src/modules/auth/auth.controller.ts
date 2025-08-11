import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  ForgotPasswordBodyDTO,
  LoginBodyDTO,
  LoginResDTO,
  RefreshTokenResDTO,
  RegisterBodyDTO,
  RegisterResDTO,
  SendOTPBodyDTO,
  TwoFADisableBodyDTO,
  TwoFAEnableResDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { Request, Response } from 'express';
import { EmptyBodyDTO } from 'src/common/dtos/request.dto';
import { MessageResDto } from 'src/common/dtos/response.dto';
import { Ispublic } from 'src/common/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { GoogleService } from './google.service';
import envConfig from 'src/common/configs/validate-env';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @Post('register')
  @Ispublic()
  @ZodSerializerDto(RegisterResDTO)
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  @Ispublic()
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
    @Body() _: EmptyBodyDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    return this.authService.refreshToken(token, res);
  }

  @Post('logout')
  @ZodSerializerDto(MessageResDto)
  logout(
    @Body() _: EmptyBodyDTO,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies['refreshToken'];
    return this.authService.logout(token, res);
  }

  @Post('otp')
  @Ispublic()
  @HttpCode(200)
  @ZodSerializerDto(MessageResDto)
  sendOTP(@Body() body: SendOTPBodyDTO) {
    return this.authService.sendOTP(body);
  }

  @Post('forgot-password')
  @Ispublic()
  @ZodSerializerDto(MessageResDto)
  @HttpCode(200)
  forgotPassowrd(@Body() body: ForgotPasswordBodyDTO) {
    return this.authService.forgotPassowrd(body);
  }

  @Post('2fa/enable')
  @ZodSerializerDto(TwoFAEnableResDTO)
  enableTwoFactorAuth(
    @Body() _: EmptyBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.authService.enableTwoFactorAuth(userId);
  }

  @Post('2fa/disable')
  @ZodSerializerDto(MessageResDto)
  @HttpCode(200)
  disableTwoFactorAuth(
    @Body() body: TwoFADisableBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return this.authService.disableTwoFactorAuth({
      totpCode: body.totpCode,
      userId,
    });
  }

  @Get('google-auth')
  @Ispublic()
  googleAuth(@Ip() ip: string, @UserAgent() userAgent: string) {
    const { url } = this.googleService.getOAuth2ClientUrl({ ip, userAgent });
    return { url };
  }

  @Get('google/callback')
  @Ispublic()
  async googleAuthCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.googleService.googleCallback({ code, state });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth',
      maxAge: 1 * 24 * 3600 * 1000,
    });
    return res.redirect(
      `${envConfig.GOOGLE_CLIENT_REDIRECT_URI}?accessToken=${accessToken}`,
    );
  }
}
