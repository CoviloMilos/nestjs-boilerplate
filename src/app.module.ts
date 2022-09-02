import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './api/health/health.module';
import { UserModule } from './api/user/user.module';

import { envConfig } from './config';

const MODULES = [ConfigModule.forRoot(envConfig()), HealthModule, UserModule];

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: [],
})
export class AppModule {}
