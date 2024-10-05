import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
export async function findMejas(filter?: Prisma.mejaWhereInput) {
  const mejas = await prisma.meja.findMany({
    where: { ...filter, destructed: false },
  });
  return mejas;
}

export async function findMeja(filter: Prisma.mejaWhereUniqueInput) {
  const meja = await prisma.meja.findUnique({
    where: { ...filter, destructed: false },
  });
  return meja;
}

export async function createMeja(data: Prisma.mejaCreateInput) {
  const createdmeja = await prisma.meja.create({ data });
  return createdmeja;
}

export async function updateMeja(
  filter: Prisma.mejaWhereUniqueInput,
  data: Prisma.mejaUpdateInput
) {
  const updatedmeja = await prisma.meja.update({
    where: { ...filter, destructed: false },
    data,
  });
  return updatedmeja;
}

export async function removeMeja(filter: Prisma.mejaWhereUniqueInput) {
  const deletedmeja = await prisma.meja.update({
    where: filter,
    data: { destructed: true },
  });
  return deletedmeja;
}
