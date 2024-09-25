import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function findDetailTransaksis(
  filter?: Prisma.detail_transaksiWhereInput
) {
  const detailtransaksis = await prisma.detail_transaksi.findMany({
    where: filter,
    include: { menu: true , transaksi:true},
  });
  return detailtransaksis;
}

export async function findDetailTransaksi(
  filter: Prisma.detail_transaksiWhereUniqueInput
) {
  const detailtransaksi = await prisma.detail_transaksi.findUnique({
    where: filter,
  });
  return detailtransaksi;
}

export async function createDetailTransaksi(
  data: Prisma.detail_transaksiCreateInput
) {
  const createddetailtransaksi = await prisma.detail_transaksi.create({ data });
  return createddetailtransaksi;
}

export async function updateDetailTransaksi(
  filter: Prisma.detail_transaksiWhereUniqueInput,
  data: Prisma.detail_transaksiUpdateInput
) {
  const updateddetailtransaksi = await prisma.detail_transaksi.update({
    where: filter,
    data,
  });
  return updateddetailtransaksi;
}

export async function removeDetailTransaksi(
  filter: Prisma.detail_transaksiWhereUniqueInput
) {
  const deleteddetailtransaksi = await prisma.detail_transaksi.delete({
    where: filter,
  });
  return deleteddetailtransaksi;
}
