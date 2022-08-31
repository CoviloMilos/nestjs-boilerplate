import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config';

const MODULES = [ConfigModule.forRoot(envConfig())];

@Module({
  imports: [...MODULES],
  controllers: [],
  providers: [],
})
export class AppModule {}
