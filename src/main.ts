import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configureApp from './config/app.config';
import { Logger } from './config/logger';

const startupVars = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const serviceName = configService.get<string>('app.serviceName');
  const host = configService.get<string>('app.host');

  return { port, serviceName, host, configService };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, serviceName, host, configService } = startupVars(app);

  app.useLogger(new Logger(configService));

  configureApp(app, configService);

  await app.listen(port);

  console.log(`${serviceName} running on ${host}:${port}`);
}

bootstrap();
