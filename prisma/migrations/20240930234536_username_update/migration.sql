/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Transaksi_nama_pelanggan_key` ON `transaksi`;

-- DropIndex
DROP INDEX `User_name_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
