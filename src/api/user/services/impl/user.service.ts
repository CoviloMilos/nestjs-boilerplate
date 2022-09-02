import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../../models';
import { IUserService } from '../iuser.service';

@Injectable()
export class UserService implements IUserService {
  findUser(): Promise<UserDTO> {
    return Promise.resolve({
      id: '1234',
      name: 'Milos',
      email: 'milos.covilo@mvpworkshop.co',
    });
  }
}
