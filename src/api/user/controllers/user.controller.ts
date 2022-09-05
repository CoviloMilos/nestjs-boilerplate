import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserDTO } from '../../../dto';
import { USER_SERVICE } from '../../../utils/constants';
import { IUserService } from '../services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUserService,
  ) {}

  @Get('/:id')
  @ApiResponse({ type: UserDTO })
  findUser(@Param('id') id: string): Promise<UserDTO> {
    return this._userService.findUser(id);
  }
}
