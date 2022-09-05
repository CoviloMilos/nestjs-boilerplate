import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../../dto';
import { IUserService } from '../iuser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../entities';
import { Repository } from 'typeorm';
import { mapToClass } from '../../../../utils';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}
  async findUser(id: string): Promise<UserDTO> {
    const user = await this._userRepo.findOneBy({ id });
    return mapToClass(user, UserDTO);
  }
}
