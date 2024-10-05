"use server";

import {
  findTransaksi,
  removeTransaksi,
  updateTransaksi,
} from "@/query/transaksi.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Prisma, Status } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { connect } from "http2";

export async function upsertTransaksi(
  id_transaksi: string | undefined | null,
  data: {
    nama_pelanggan: string;
    id_meja: string;
  }
): Promise<ServerActionResponse & { id_transaksi?: string }> {
  try {
    const session = await getServerSession();
    if (!session) return { success: false, message: "Not authenticated" };
    const currentUserRole = session?.user?.role;
    const currentUserId = session?.user?.id_user;

    if (currentUserRole !== "KASIR")
      return { success: false, message: "Forbidden" };

    const { id_meja, ...payloadData } = data;
    const payload: Prisma.transaksiUpdateInput = {
      ...payloadData,
      meja: { connect: { id_meja: id_meja } },
      user: { connect: { id_user: currentUserId } },
    };

    if (!id_transaksi) {
      const newTransaksi = await prisma.transaksi.create({
        data: {
          user: { connect: { id_user: currentUserId } },
          meja: { connect: { id_meja } },
          nama_pelanggan: data.nama_pelanggan,
        },
      });

      await prisma.meja.update({
        where: { id_meja },
        data: { isVacant: false },
      });

      return {
        success: true,
        message: "Sukses membuat Transaksi!",
        id_transaksi: newTransaksi.id_transaksi,
      };
    }

    const transaksiToUpdate = await findTransaksi({ id_transaksi });
    if (!transaksiToUpdate)
      return { success: false, message: "Transaksi tidak ditemukan!" };

    await updateTransaksi({ id_transaksi }, payload);

    revalidatePath("/kasir/transaksi");
    return { success: true, message: "Sukses meng-update Transaksi!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function insertDetail(
  id_transaksi: string | undefined | null,
  detailData: Array<{
    id_transaksi: string;
    id_menu: string;
    nama: string;
    harga: number;
    qty: number;
    totalHarga: number;
  }>
): Promise<ServerActionResponse> {
  try {
    if (!id_transaksi) {
      return { success: false, message: "id_transaksi is required!" };
    }

    await prisma.$transaction(async (prisma) => {
      for (const detail of detailData) {
        const { id_menu, harga, qty, totalHarga } = detail;
        await prisma.detail_transaksi.create({
          data: {
            transaksi: { connect: { id_transaksi } },
            menu: { connect: { id_menu } },
            harga,
            qty,
            totalHarga,
          },
        });
      }
    });

    revalidatePath(`/kasir/transaksi`);
    return { success: true, message: "Sukses membuat Detail Transaksi!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function updateStatus(
  id_transaksi: string,
  data: { status?: Status },
  id_meja: string
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "KASIR")
      return { success: false, message: "Forbidden" };
    const { status } = data;
    const transaksi = await findTransaksi({ id_transaksi });
    if (!transaksi) {
      return { success: false, message: "Transaction not found!" };
    }

    await prisma.transaksi.update({
      where: { id_transaksi },
      data: { status },
    });

    if (status === "LUNAS") {
      await prisma.meja.update({
        where: { id_meja },
        data: { isVacant: true },
      });
    }

    revalidatePath(`/kasir/history`);
    return {
      success: true,
      message: "Transaction status updated successfully!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}

export async function deleteTransaksi(
  id_transaksi: string
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "KASIR")
      return { success: false, message: "Forbidden" };

    const transaksiToDelete = await findTransaksi({ id_transaksi });
    if (!transaksiToDelete)
      return { success: false, message: "Transaksi tidak ditemukan!" };

    await removeTransaksi({ id_transaksi });

    revalidatePath("/kasir/transaksi");
    return { success: true, message: "Berhasil menghapus Transaksi!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
