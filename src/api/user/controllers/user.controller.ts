import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { USER_SERVICE } from '../../../utils/constants';
import { IUserService } from '../services';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../../../dto/response';
import { CreateUserDTO } from '../../../dto/request';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUserService,
  ) {}

  @Get('')
  @ApiResponse({ type: UserDTO, isArray: true })
  findWeekOldUsers(): Promise<UserDTO[]> {
    return this._userService.findWeekOldUsers();
  }

  @Get('/:id')
  @ApiResponse({ type: UserDTO })
  findUser(@Param('id') id: string): Promise<UserDTO> {
    return this._userService.findUser(id);
  }

  @Post('')
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ type: UserDTO })
  createUser(@Body() user: CreateUserDTO): Promise<UserDTO> {
    return this._userService.createUser(user);
  }
}
