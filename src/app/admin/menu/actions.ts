"use server";

import {
  createMenu,
  findMenu,
  removeMenu,
  updateMenu,
} from "@/query/menu.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Jenis, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  handleImageUpload,
  handleImageDelete,
} from "@/app/global-action/fileUpload";

export async function upsertMenu(
  id_menu: string | undefined | null,
  actionData: FormData
): Promise<ServerActionResponse> {
  const data = {
    nama_menu: actionData.get("nama_menu") as string,
    jenis: actionData.get("jenis") as Jenis,
    deskripsi: actionData.get("deskripsi") as string,
    harga: Number(actionData.get("harga")),
    gambar: actionData.get("gambar") as File | undefined,
  };
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    const payload: Prisma.menuUpdateInput = {
      nama_menu: data.nama_menu,
      jenis: data.jenis,
      gambar: undefined,
      deskripsi: data.deskripsi,
      harga: data.harga,
    };

    if (data.gambar instanceof File) {
      const imgBuffer = await handleImageUpload(data.gambar);
      payload.gambar = imgBuffer;
    }

    if (!id_menu) {
      const { nama_menu, jenis, gambar, deskripsi, harga } = payload;
      if (!nama_menu || !deskripsi || !gambar || !jenis || !harga)
        return { success: false, message: "Bad request" };

      await createMenu(payload as Prisma.menuCreateInput);

      return { success: true, message: "Menu created successfully!" };
    }

    const menuToUpdate = await findMenu({ id_menu });
    if (!menuToUpdate) return { success: false, message: "Menu not found!" };

    await updateMenu({ id_menu }, payload);

    revalidatePath("/admin/menu");
    return { success: true, message: "Menu updated successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteMenu(
  id_menu: string
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN")
      return { success: false, message: "Forbidden" };

    const userToDelete = await findMenu({ id_menu });
    if (!userToDelete)
      return { success: false, message: "User tidak ditemukan!" };

    await removeMenu({ id_menu });

    return { success: true, message: "Berhasil menghapus user!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
