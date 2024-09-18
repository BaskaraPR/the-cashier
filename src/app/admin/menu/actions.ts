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
import { uploadImage} from "@/app/global-action/fileUpload";

export async function upsertMenu(
  id_menu: string | undefined | null,
  actionData: FormData
): Promise<ServerActionResponse> {
  const data = {
    nama_menu: actionData.get("nama_menu") as string,
    jenis: actionData.get("jenis") as Jenis | undefined,
    deskripsi: actionData.get("deskripsi") as string | undefined,
    gambar: actionData.get("gambar") as File | undefined,
    harga: actionData.get("harga") ? parseInt(actionData.get("harga") as string, 10) : undefined,
  };

  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    let gambarUrl: string | undefined;

    if (data.gambar) {
      gambarUrl = await uploadImage(data.gambar);
      if (gambarUrl === undefined) {
        return { success: false, message: "Image upload failed" };
      }
    }


    if (!id_menu) {
      const { nama_menu, deskripsi, gambar  , jenis, harga } = data;
      if (!nama_menu || !deskripsi || !gambar || !jenis || !harga)
        return { success: false, message: "Bad request" };

      const checkNameExistence = await findMenu({ nama_menu });
      if (checkNameExistence) return { success: false, message: "Menu already exists" };

      await createMenu({ nama_menu, deskripsi, gambar:gambarUrl, jenis, harga });

      return { success: true, message: "Menu created successfully!" };
    }

    const menuToUpdate = await findMenu({ id_menu });
    if (!menuToUpdate)
      return { success: false, message: "Menu not found!" };

    // Ensure that data is compatible with Prisma's expected input
    await updateMenu({ id_menu }, {
      nama_menu: data.nama_menu, // Make sure this matches the expected type
      deskripsi: data.deskripsi,
      gambar: data.gambar,
      jenis: data.jenis,
      harga: data.harga,
    });

    revalidatePath("/admin/menu");
    return { success: true, message: "Menu updated successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteUser(
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
