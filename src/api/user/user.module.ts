import { Module } from '@nestjs/common';
import { USER_SERVICE } from '../../utils/constants';
import { UserController } from './controllers';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';

const SERVICES = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

const CONTROLLERS = [UserController];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...SERVICES],
  controllers: [...CONTROLLERS],
})
export class UserModule {}
