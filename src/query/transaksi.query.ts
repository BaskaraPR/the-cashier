import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function findTransaksis(filter?: Prisma.transaksiWhereInput) {
  const transaksis = await prisma.transaksi.findMany({
    where: filter,
    include: { transaksiBy: true , meja:true,},
  });
  return transaksis;
}

export async function findTransaksi(filter: Prisma.transaksiWhereUniqueInput) {
  const transaksi = await prisma.transaksi.findUnique({ where: filter });
  return transaksi;
}

export async function createTransaksi(data: Prisma.transaksiCreateInput) {
  const createdtransaksi = await prisma.transaksi.create({ data });
  return createdtransaksi;
}

export async function updateTransaksi(
  filter: Prisma.transaksiWhereUniqueInput,
  data: Prisma.transaksiUpdateInput
) {
  const updatedtransaksi = await prisma.transaksi.update({
    where: filter,
    data,
  });
  return updatedtransaksi;
}

export async function removeTransaksi(
  filter: Prisma.transaksiWhereUniqueInput
) {
  const deletedtransaksi = await prisma.transaksi.delete({ where: filter });
  return deletedtransaksi;
}
