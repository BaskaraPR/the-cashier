"use server";

import {
  createUser,
  findUser,
  removeUser,
  updateUser,
} from "@/query/user.query";
import { generateHash } from "@/lib/bcrypt";
import { getServerSession } from "@/lib/next-auth";
import { ServerActionResponse } from "@/types/action";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function upsertUser(
  id_user: string | undefined | null,
  data: { username?: string; name?: string; role?: Role; password?: string }
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    const currentUserRole = session?.user?.role;

    if (data.role && currentUserRole !== "ADMIN")
      return { success: false, message: "Forbidden" };

    if (!id_user) {
      const { username, name, role, password } = data;
      if (!username || !name || !role || !password)
        return { success: false, message: "Bad request" };

      const checknameExistence = await findUser({ name });
      if (checknameExistence) return { success: false, message: "Forbidden" };

      await createUser({
        username,
        name,
        role,
        password: generateHash(password),
      });

      return { success: true, message: "Sukses membuat user!" };
    }

    const userToUpdate = await findUser({ id_user });
    if (!userToUpdate)
      return { success: false, message: "User tidak ditemukan!" };

    await updateUser({ id_user }, data);

    revalidatePath("/admin/user");
    return { success: true, message: "Sukses meng-update user!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteUser(
  id_user: string
): Promise<ServerActionResponse> {
  try {
    const session = await getServerSession();
    if (session?.user?.role !== "ADMIN")
      return { success: false, message: "Forbidden" };

    const userToDelete = await findUser({ id_user });
    if (!userToDelete)
      return { success: false, message: "User tidak ditemukan!" };

    await removeUser({ id_user });

    return { success: true, message: "Berhasil menghapus user!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Terjadi kesalahan!" };
  }
}
