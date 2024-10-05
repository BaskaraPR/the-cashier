import { z } from "zod";

export const updateMejaFormSchema = z.object({
  nomor_meja: z
    .number()
    .min(1, { message: "Nomor Meja harus diisi!" })
    .max(999, { message: "Nomor Meja maximal 3 karakter!" })
    .positive({ message: "Nomor Harus Positif" }),
});

export const createMejaFormSchema = z.object({
  nomor_meja: z
    .number()
    .min(1, { message: "Nomor Meja harus diisi!" })
    .max(999, { message: "Nomor Meja maximal 3 karakter!" })
    .positive({ message: "Nomor Harus Positif" }),
});
