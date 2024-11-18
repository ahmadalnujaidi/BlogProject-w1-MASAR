import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFollowers1731916937673 implements MigrationInterface {
    name = 'CreateTableFollowers1731916937673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_followers" ("id" SERIAL NOT NULL, "followerId" integer, "followingId" integer, CONSTRAINT "UQ_fb5cff70c10f57282caec64ecf0" UNIQUE ("followerId", "followingId"), CONSTRAINT "PK_ee6ca6c8db6c5e06db7727f08d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_b319cdc26936df06bca3feb3bc2" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_b319cdc26936df06bca3feb3bc2"`);
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278"`);
        await queryRunner.query(`DROP TABLE "user_followers"`);
    }

}
