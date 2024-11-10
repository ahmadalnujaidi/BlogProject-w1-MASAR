import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedArticlestable1731235021009 implements MigrationInterface {
    name = 'UpdatedArticlestable1731235021009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "content" TO "contents"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "contents" TO "content"`);
    }

}
