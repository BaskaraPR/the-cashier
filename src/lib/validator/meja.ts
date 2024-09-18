import { z } from "zod";

export const updateMejaFormSchema = z.object({
  nomor_meja: z
    .string()
    .min(1, { message: "Nomor Meja harus diisi!" })
    .max(3, { message: "Nomor Meja maximal 3 karakter!" }),
});

export const createMejaFormSchema = z.object({
  nomor_meja: z
    .string()
    .min(1, { message: "Nomor Meja harus diisi!" })
    .max(3, { message: "Nomor Meja maximal 3 karakter!" }),
});
