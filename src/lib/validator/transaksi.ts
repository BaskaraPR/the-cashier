import { z } from "zod";

export const createTransaksiFormSchema = z.object({
  nama_pelanggan: z.string().min(3, { message: "Nama Pelanggan harus diisi!" }),
});

export const statusUpdateSchema = z.object({
  status: z.enum(["BELUM_BAYAR", "LUNAS"]),
});
