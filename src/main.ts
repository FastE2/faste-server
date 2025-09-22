import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { AuthGuard } from './common/guards/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WebsocketAdapter } from './common/websockets/websocket.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // -- guard
  // app.useGlobalGuards(app.get(AuthGuard));

  // -- interceptor
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // -- filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // websocket
  const websocketAdapter = new WebsocketAdapter(app);
  await websocketAdapter.connectToRedis();
  app.useWebSocketAdapter(websocketAdapter);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
