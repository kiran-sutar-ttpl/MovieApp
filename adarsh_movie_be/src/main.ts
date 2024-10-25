import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/v1/api');

  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  const options = new DocumentBuilder()
    .setTitle('Movie App')
    .setDescription('Movie APP')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1/api/docs', app, document);

  await app.listen(5000);
}
bootstrap();
