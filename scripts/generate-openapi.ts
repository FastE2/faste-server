import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { VersioningType } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function generate() {
  // Patch NestJS Swagger for Zod integration
  patchNestJsSwagger();

  // Create NestJS app instance (without initializing or listening)
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable versioning to match application settings
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

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

  const document = SwaggerModule.createDocument(app, config);
  const docsDir = path.join(__dirname, '../docs/postman');

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const outputPath = path.join(docsDir, 'openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), 'utf-8');
  console.log(`OpenAPI schema successfully written to: ${outputPath}`);

  await app.close();
  process.exit(0);
}

generate().catch((err) => {
  console.error('Error generating OpenAPI spec:', err);
  process.exit(1);
});
