import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  
  const config = new DocumentBuilder()
    .setTitle('MyMusix')
    .setDescription('API untuk mengelola lagu menggunakan NestJS dan MongoDB, serta dilengkapi dengan JWT Authentication. <br>  <br> File lagu dapat di akses di sini http://localhost:3000/uploads/song1.mp3')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('songs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
