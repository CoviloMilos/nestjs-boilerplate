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
