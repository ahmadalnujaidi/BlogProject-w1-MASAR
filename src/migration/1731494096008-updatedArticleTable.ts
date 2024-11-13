import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedArticleTable1731494096008 implements MigrationInterface {
    name = 'UpdatedArticleTable1731494096008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
