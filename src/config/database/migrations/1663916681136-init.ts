import { MigrationInterface, QueryRunner } from "typeorm";

export class init1663916681136 implements MigrationInterface {
    name = 'init1663916681136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
