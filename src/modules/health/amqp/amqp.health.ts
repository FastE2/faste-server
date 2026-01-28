import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import * as amqp from 'amqplib';

@Injectable()
export class AmqpHealthIndicator extends HealthIndicator {
  async isHealthy(key = 'amqp'): Promise<HealthIndicatorResult> {
    let connection: any = null;
    let channel: any = null;

    try {
      connection = await amqp.connect(process.env.AMQP_URL);
      channel = await connection.createChannel();

      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError(
        'RabbitMQ check failed',
        this.getStatus(key, false, {
          message: error.message,
        }),
      );
    } finally {
      try {
        if (channel) await channel.close();
        if (connection) await connection.close();
      } catch {
        // ignore errors on close
      }
    }
  }
}
