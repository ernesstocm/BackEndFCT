import {MigrationInterface, QueryRunner} from "typeorm";

export class createDatabase1587801242678 implements MigrationInterface {
    name = 'createDatabase1587801242678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `nick` varchar(255) NOT NULL, `password` varchar(100) NULL, `request_token` varchar(999) NULL, `reset_password_token` varchar(20) NULL, `reset_password_expires` datetime NULL, `email` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `url_image` varchar(255) NULL, `role` enum ('role_superadmin', 'role_user', 'role_administration') NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` tinyint NOT NULL DEFAULT 0, INDEX `IDX_5b494fc54a2e3d122f17b39359` (`reset_password_token`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `task` (`id` varchar(36) NOT NULL, `start_date` datetime NOT NULL, `end_date` datetime NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `state` enum ('pending', 'in_progress', 'paused', 'finished', 'cancelled', 'rejected') NOT NULL, `finished` tinyint NOT NULL DEFAULT 0, `deleted` tinyint NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_responsible_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `task` ADD CONSTRAINT `FK_2e278c124a385b080f1ddf10e97` FOREIGN KEY (`user_responsible_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `task` DROP FOREIGN KEY `FK_2e278c124a385b080f1ddf10e97`", undefined);
        await queryRunner.query("DROP TABLE `task`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5b494fc54a2e3d122f17b39359` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
