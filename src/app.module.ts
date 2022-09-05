import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './api/health/health.module';
import { UserModule } from './api/user/user.module';

import { DatabaseModule, envConfig } from './config';
import { RequestMiddleware } from './middleware';

const MODULES = [
  ConfigModule.forRoot(envConfig()),
  DatabaseModule,
  HealthModule,
  UserModule,
];

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .exclude('health')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
