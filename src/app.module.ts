import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';

import { envConfig } from './config';

const MODULES = [ConfigModule.forRoot(envConfig()), UserModule];

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: [],
})
export class AppModule {}
