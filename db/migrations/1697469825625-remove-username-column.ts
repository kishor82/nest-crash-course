import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUsernameColumn1697469825625 implements MigrationInterface {
  name = 'RemoveUsernameColumn1697469825625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
  }
}
