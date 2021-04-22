import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  env: process.env.APP_ENV || 'development',
  name: process.env.APP_NAME || 'bn-node-api',
  url: process.env.APP_URL || 'localhost',
  port: process.env.SERVER_PORT || '7500',
  cookieOptions: {
    secure: false, // http
    httpOnly: true,
  },
}));
