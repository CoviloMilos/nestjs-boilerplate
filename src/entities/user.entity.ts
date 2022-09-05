import { CustomBaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends CustomBaseEntity {
  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  email: string;
}
