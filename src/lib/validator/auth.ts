import { z } from "zod";

export const loginFormSchema = z.object({
  password: z.string().min(7, { message: "Password minimal 7 karakter!" }),
  username: z
    .string()
    .min(1, { message: "Username harus diisi!" })
    .max(70, { message: "Username maximal 70 karakter!" }),
});
