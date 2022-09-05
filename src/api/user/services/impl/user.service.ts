import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../../../dto/response';
import { IUserService } from '../iuser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../entities';
import { Repository, MoreThan } from 'typeorm';
import { mapToClass, QueryFilter } from '../../../../utils';
import { DateHelperService } from '../../../../utils/helpers';
import {
  ResourceNotFoundException,
  UserAlreadyExistException,
} from '../../../../exception-handling';
import { Resources } from '../../../../utils/enums';
import { CreateUserDTO } from '../../../../dto/request';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<UserDTO> {
    const exists = await this._userRepo.findOneBy({ email: user.email });

    if (exists) throw new UserAlreadyExistException(user.email);

    const result = await this._userRepo.save(this._userRepo.create(user));

    return mapToClass(result, UserDTO);
  }

  async findUser(id: string): Promise<UserDTO> {
    const user = await this._userRepo.findOneBy({ id });
    if (!user) throw new ResourceNotFoundException(Resources.USER);
    return mapToClass(user, UserDTO);
  }

  async findWeekOldUsers(): Promise<UserDTO[]> {
    const condition: QueryFilter = {
      createdAt: MoreThan(DateHelperService.getWeekAgoDate()),
    };
    const users = await this._userRepo.find({ where: condition });

    return users.map((user) => mapToClass(user, UserDTO));
  }
}
