import { z } from "zod";

export const updateUserFormSchema = z.object({
  name: z.string().min(1, { message: "Nama User minimal 1 karakter!" }),
  username: z
    .string()
    .min(1, { message: "Username minimal 1 karakter!" })
    .max(70, { message: "Username maximal 70 karakter!" }),
  role: z.enum(["KASIR", "ADMIN", "MANAJER"]),
  password: z
    .string()
    .min(7, { message: "Password minimal 7 karakter!" })
    .optional()
    .or(z.literal("")),
});

export const createUserFormSchema = z.object({
  name: z.string().min(1, { message: "Nama User harus diisi!" }),
  username: z
    .string()
    .min(1, { message: "Username harus diisi!" })
    .max(70, { message: "Username maximal 70 karakter!" }),
  role: z.enum(["KASIR", "ADMIN", "MANAJER"]),
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
});
