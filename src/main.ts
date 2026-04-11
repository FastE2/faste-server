import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WebsocketAdapter } from './common/websockets/websocket.adapter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import helmet from 'helmet';
import { VersioningType } from '@nestjs/common';

// © Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  const corsOrigin = process.env.CORS_ORIGIN?.split(',') || [];

  app.enableCors({
    origin: corsOrigin.length > 0 ? corsOrigin : true,
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

  // -- helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.setGlobalPrefix('api');

  // -- versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // -- swagger
  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle('FastE API')
    .setDescription('The API for the ecommerce application')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      {
        name: 'authorization',
        type: 'apiKey',
      },
      'payment-api-key',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // websocket
  const websocketAdapter = new WebsocketAdapter(app);
  await websocketAdapter.connectToRedis();
  app.useWebSocketAdapter(websocketAdapter);
  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`
  ╔═══════════════════════════════════════════╗
  ║ FastE API Server is running!              ║
  ║                                           ║
  ║ URL: http://localhost:${port}                ║
  ║ Docs: http://localhost:${port}/api/docs      ║
  ╚═══════════════════════════════════════════╝
  © Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.

  `);
}
void bootstrap();
