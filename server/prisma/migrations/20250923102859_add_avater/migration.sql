-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `hasNewNotifications` BOOLEAN NOT NULL DEFAULT false;
