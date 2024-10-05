-- AlterTable
ALTER TABLE `meja` ADD COLUMN `destructed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `unalived` BOOLEAN NOT NULL DEFAULT false;
