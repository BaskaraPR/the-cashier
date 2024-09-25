import { Prisma } from "@prisma/client";

export type detailWithMenusAndTransaksis = Prisma.detail_transaksiGetPayload<{
  include: { menu: true, transaksi:true };
}>;

export type transaksiWithUsersAndMejas = Prisma.transaksiGetPayload<{
    include: { user: true; meja: true };
  }>;
