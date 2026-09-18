import { ConfigService } from '@nestjs/config';
import { SessionOptions } from 'express-session';

export const sessionConfig = (
  configService: ConfigService,
): SessionOptions => ({
  secret: configService.getOrThrow<string>('SESSION_SECRET'),
  name: configService.getOrThrow<string>('SESSION_NAME'),
  resave: true,
  saveUninitialized: false,
  cookie: {
    domain: configService.getOrThrow<string>('SESSION_DOMAIN'),
    maxAge: configService.getOrThrow<number>('SESSION_MAX_AGE'),
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
});
