import { Module } from '@nestjs/common';
import { USER_SERVICE } from '../../utils/constants';
import { UserController } from './controllers';
import { UserService } from './services';

const SERVICES = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

const CONTROLLERS = [UserController];

@Module({
  providers: [...SERVICES],
  controllers: [...CONTROLLERS],
  exports: [...SERVICES],
})
export class UserModule {}
