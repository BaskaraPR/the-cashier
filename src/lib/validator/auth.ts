import { z } from "zod";

export const loginFormSchema = z.object({
  name: z.string().min(1, { message: "Nama User harus diisi!" }),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Nama User harus diisi!" }),
  username: z
    .string()
    .min(1, { message: "Username harus diisi!" })
    .max(70, { message: "Username maximal 70 karakter!" }),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});
