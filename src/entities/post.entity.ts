import { CustomBaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({ name: 'posts' })
export class PostEntity extends CustomBaseEntity {
  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  body: string;
}

// npx typeorm-ts-node-esm migration:generate ./src/config/database/migrations/update-post-table -d ./src/config/database/dataSource.ts
