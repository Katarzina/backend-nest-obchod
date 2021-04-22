import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

const corsConfiguration = {
  origin: [
    `${process.env.FRONT_URL}`,
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get('ConfigService');
  app.enableCors(corsConfiguration);

  app.use(cookieParser());
  app.use(helmet());

  await app.listen(config.get<number>('app.port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

process.on('unhandledRejection', function handleUnhandledRejection(
    err: Error,
): void {
  const logger = new Logger(handleUnhandledRejection.name);
  logger.error(err.stack);
});

