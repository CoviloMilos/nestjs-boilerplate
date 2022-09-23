import { MigrationInterface, QueryRunner } from 'typeorm';
import { posts, users } from '../seed';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class seeder1663916835481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users', Object.keys(users[0]))
      .values(users)
      .returning('id')
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('posts', Object.keys(posts[0]))
      .values(posts)
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('posts')
      .execute();
  }
}
