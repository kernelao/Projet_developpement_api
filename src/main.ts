import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ Ajoute les headers de sécurité standard
  app.use(helmet());

  // 🚫 Limite les requêtes abusives
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Max 100 requêtes par IP
      message: 'Trop de requêtes depuis cette IP, réessaie plus tard.',
    }),
  );

  // ✅ Validation globale des DTOs
  app.useGlobalPipes(new ValidationPipe());

  // 🌐 Active CORS (à restreindre plus tard en prod)
  app.enableCors();

  // 🔗 Préfixe toutes les routes par /api
  app.setGlobalPrefix('api');
  console.log('✅ PREFIX /api ACTIVÉ');

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
