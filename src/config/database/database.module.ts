import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfig from './typeormConfig.service';

const typeOrm = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfig,
  inject: [ConfigService],
});

@Module({
  imports: [typeOrm],
  providers: [TypeOrmConfig],
  exports: [typeOrm],
})
export class DatabaseModule {}
