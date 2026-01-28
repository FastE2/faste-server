import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail(payload: {
        to: string;
        subject: string;
        code: string;
    }): Promise<any>;
}
