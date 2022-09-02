import { Controller, Get, Inject } from '@nestjs/common';
import { UserDTO } from '../../../models';
import { USER_SERVICE } from '../../../utils/constants';
import { IUserService } from '../services';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUserService,
  ) {}

  @Get('')
  findUser(): Promise<UserDTO> {
    return this._userService.findUser();
  }
}
