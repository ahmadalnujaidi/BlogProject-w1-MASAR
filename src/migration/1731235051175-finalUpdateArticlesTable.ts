import { MigrationInterface, QueryRunner } from "typeorm";

export class FinalUpdateArticlesTable1731235051175 implements MigrationInterface {
    name = 'FinalUpdateArticlesTable1731235051175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "contents" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "content" TO "contents"`);
    }

}
