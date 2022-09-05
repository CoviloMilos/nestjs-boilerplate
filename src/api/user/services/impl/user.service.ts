import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../../dto';
import { IUserService } from '../iuser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../entities';
import { Repository, MoreThan } from 'typeorm';
import { mapToClass, QueryFilter } from '../../../../utils';
import { DateHelper } from '../../../../utils/helpers';

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

  async findWeekOldUsers(): Promise<UserDTO[]> {
    const condition: QueryFilter = {
      createdAt: MoreThan(DateHelper.getWeekAgoDate()),
    };
    const users = await this._userRepo.find({ where: condition });

    return users.map((user) => mapToClass(user, UserDTO));
  }
}
