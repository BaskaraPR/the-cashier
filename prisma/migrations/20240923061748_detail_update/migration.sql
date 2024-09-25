/*
  Warnings:

  - Added the required column `qty` to the `Detail Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalHarga` to the `Detail Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail transaksi` ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `totalHarga` BIGINT NOT NULL;
