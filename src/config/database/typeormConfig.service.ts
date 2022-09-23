import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import entities from '../../entities';

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
  readonly name: string;

  readonly host: string;

  readonly port: number;

  readonly username: string;

  readonly password: string;

  readonly synchronize: boolean;

  constructor(private config: ConfigService) {
    this.name = this.config.get<string>('db.name');
    this.host = this.config.get<string>('db.host');
    this.port = this.config.get<number>('db.port');
    this.username = this.config.get<string>('db.username');
    this.password = this.config.get<string>('db.password');
    this.synchronize = this.config.get<string>('app.env') === 'local';
  }

  createTypeOrmOptions = (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.name,
      synchronize: this.synchronize,
      logging: false,
      entities,
    };
  };
}
