import { Controller, Get, Inject } from '@nestjs/common';
import { UserDTO } from '../../../models';
import { USER_SERVICE } from '../../../utils/constants';
import { IUserService } from '../services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUserService,
  ) {}

  @Get('')
  @ApiResponse({ type: UserDTO })
  findUser(): Promise<UserDTO> {
    return this._userService.findUser();
  }
}
