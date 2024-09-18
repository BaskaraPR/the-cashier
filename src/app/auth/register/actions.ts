"use server";

import { createUser, findUser } from "@/query/user.query";
import { generateHash } from "@/lib/bcrypt";
import { ServerActionResponse } from "@/types/action";

export async function registerUser(data: {
  name: string;
  username: string;
  password: string;
}): Promise<ServerActionResponse> {
  try {
    const { name, username, password } = data;

    const checknameExistence = await findUser({ name });
    if (checknameExistence)
      return { success: false, message: "name telah digunakan!" };

    const createdUser = await createUser({
      name,
      username,
      password: generateHash(password as string),
    });

    return {
      success: true,
      message: "Berhasil mendaftarkan user!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Gagal mendaftarkan user!" };
  }
}
