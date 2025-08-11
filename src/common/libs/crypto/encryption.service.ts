import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import envConfig from 'src/common/configs/validate-env';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = Buffer.from(envConfig.ENCRYPTION_KEY, 'hex');
  private readonly ivLength = 16;

  encrypt(text: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    // let encrypted = cipher.update(text, 'utf8', 'hex');
    // encrypted += cipher.final('hex');
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return `${encrypted.toString('hex')}:${iv.toString('hex')}`;
  }

  decrypt(encryptedText: string): string {
    const [encrypted, ivHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
