import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { sessionConfig } from './config/session.config';
import passport from 'passport';
import { GlobalFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(session(sessionConfig(config)));

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalFilters(new GlobalFilter());

  app.enableCors({
    origin: config.getOrThrow<string>('CLIENT_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(config.getOrThrow<string>('PORT'));
}
bootstrap();
