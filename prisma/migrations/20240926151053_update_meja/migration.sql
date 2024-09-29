/*
  Warnings:

  - You are about to alter the column `nomor_meja` on the `meja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `meja` MODIFY `nomor_meja` BIGINT NOT NULL;
