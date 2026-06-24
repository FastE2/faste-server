// captcha.service.ts
import axios from 'axios';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  async verify(token: string, ip: string) {
    const res = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
          remoteip: ip,
        },
      },
    );

    const data = res.data;

    if (!data.success || data.score < 0.7 || data.action !== 'login') {
      throw new BadRequestException({
        path: 'captcha',
        message: 'Captcha failed',
      });
    }

    return true;
  }
}
