import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function findMenus(filter?: Prisma.menuWhereInput) {
  const menus = await prisma.menu.findMany({ where: filter });
  return menus;
}

export async function findMenu(filter: Prisma.menuWhereUniqueInput) {
  const menu = await prisma.menu.findUnique({ where: filter });
  return menu;
}

export async function createMenu(data: Prisma.menuCreateInput) {
  const createdmenu = await prisma.menu.create({ data });
  return createdmenu;
}

export async function updateMenu(
  filter: Prisma.menuWhereUniqueInput,
  data: Prisma.menuUpdateInput,
) {
  const updatedmenu = await prisma.menu.update({ where: filter, data });
  return updatedmenu;
}

export async function removeMenu(filter: Prisma.menuWhereUniqueInput) {
  const deletedmenu = await prisma.menu.delete({ where: filter });
  return deletedmenu;
}
