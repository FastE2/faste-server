import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerificationCodeTask {
  private readonly logger = new Logger(VerificationCodeTask.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredVerificationCodes() {
    this.logger.log('Running task: cleanupExpiredVerificationCodes');
    const now = new Date();

    try {
      const result = await this.prisma.verificationCode.deleteMany({
        where: {
          expiresAt: { lt: now },
        },
      });

      if (result.count > 0) {
        this.logger.log(
          `Cleaned up ${result.count} expired verification codes.`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error in cleanupExpiredVerificationCodes: ${error.message}`,
        error.stack,
      );
    }
  }
}
