import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// ⬇️ Ajoute ça en haut
import * as dotenv from 'dotenv';
dotenv.config(); // ⬅️ charge les variables .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Trop de requêtes depuis cette IP, réessaie plus tard.',
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');
  console.log('✅ PREFIX /api ACTIVÉ');

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
