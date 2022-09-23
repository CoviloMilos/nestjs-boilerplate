import { Repository } from 'typeorm';
import { CustomBaseEntity } from '../entities';
import { ResourceNotFoundException } from '../exception-handling';
import { Resources } from '../utils/enums';

export abstract class BaseRepository<
  T extends CustomBaseEntity,
> extends Repository<T> {
  constructor(repository: Repository<T>, readonly resource: Resources) {
    super(repository.target, repository.manager);
  }

  async findOneById(id: string): Promise<T> {
    const entity = await this.createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (!entity) throw new ResourceNotFoundException(this.resource);

    return entity;
  }
}
