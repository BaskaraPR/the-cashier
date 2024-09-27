"use server";

import {
  createMeja,
  findMeja,
  removeMeja,
  updateMeja,
} from "@/query/meja.query";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { revalidatePath } from "next/cache";

export async function upsertMeja(
  id_meja: string | undefined | null,
  data: { nomor_meja: number }
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    if (!id_meja) {
      const { nomor_meja } = data;
      if (!nomor_meja) return { success: false, message: "Bad request" };

      const checknameExistence = await findMeja({ nomor_meja });
      if (checknameExistence) return { success: false, message: "Forbidden" };

      await createMeja({
        nomor_meja,
      });

      return { success: true, message: "Sukses membuat Meja!" };
    }

    const MejaToUpdate = await findMeja({ id_meja });
    if (!MejaToUpdate)
      return { success: false, message: "Meja tidak ditemukan!" };

    await updateMeja({ id_meja }, data);

    revalidatePath("/admin/meja");
    return { success: true, message: "Sukses meng-update Meja!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteMeja(
  id_meja: string
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN")
      return { success: false, message: "Forbidden" };

    const MejaToDelete = await findMeja({ id_meja });
    if (!MejaToDelete)
      return { success: false, message: "Meja tidak ditemukan!" };

    await removeMeja({ id_meja });

    return { success: true, message: "Berhasil menghapus Meja!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
