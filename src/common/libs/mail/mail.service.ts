import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import  fs from 'fs';
import  path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(payload: { to: string; subject: string; code: string }) {
    const otpTemplate = fs.readFileSync(
      path.resolve('src/common/libs/mail/templates/otp.html'),
      'utf8',
    );
    const htmlContent = otpTemplate
      .replaceAll('{{subject}}', payload.subject)
      .replaceAll('{{code}}', payload.code)
      .replaceAll('{{email}}', payload.to);

    return this.mailService.sendMail({
      from: `No Reply <${process.env.MAIL_USER}>`,
      to: payload.to,
      subject: payload.subject,
      html: htmlContent,
    });
  }
}
