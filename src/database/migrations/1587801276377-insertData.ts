import {MigrationInterface, QueryRunner} from "typeorm";

export class insertData1587801276377 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO `user` (`id`,`nick`,`password`,`email`,`phone`,`role`,`created_at`,`updated_at`) VALUES ( (SELECT UUID()),\'$2b$13$AqtkEPN5UUnQQaWOMB6xke4/c9iUPutGKPBgneefoFIOBNHvpsAgm\',\'Ernesto Castillo\',\'ernesstocm@gmail.com\',\'664163653\',\'role_superadmin\',\'2020/04/15 11:58:00.000000\', \'2020/04/15 11:51 8:00.000000\');');
        await queryRunner.query('INSERT INTO `task` (`id`, `start_date`, `end_date`, `name`, `description`, `state`, `finished`, `deleted`, `created_at`, `updated_at`) VALUES ((SELECT UUID()), \'2020-04-25 09:48:31\', \'2020-04-30 09:48:31\', \'prueba\', \'esto es una prueba de migración\', \'pending\', \'0\', \'0\', \'2020-04-25 09:59:31.000000\', \'2020-04-25 09:59:31.000000\');')
        await queryRunner.query('UPDATE `task` SET task.user_responsible_id	 = (select id from user where user.email = \'ernesstocm@gmail.com\');');
    };

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `user`;')
        await queryRunner.query('DROP TABLE `task`;')
    }
}
