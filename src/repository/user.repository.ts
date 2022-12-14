import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { ResourceNotFoundException } from '../exception-handling';
import { Resources } from '../utils/enums';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository, Resources.USER);
  }

  async findByEmail(email: string) {
    const user = await this.findBy({ email });

    if (!user) throw new ResourceNotFoundException(this.resource);

    return user;
  }
}
