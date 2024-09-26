import { z } from "zod";

export const updateTransaksiFormSchema = z.object({
  tgl_transaksi: z.string().transform((value) => new Date(value)),
  nama_pelanggan: z.string().min(1, { message: "Nama Pelanggan harus diisi!" }),
  id_user: z
    .string({ message: "User harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  id_meja: z
    .string({ message: "Meja harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
});

export const createTransaksiFormSchema = z.object({
  tgl_transaksi: z.string().transform((value) => new Date(value)),
  nama_pelanggan: z.string().min(1, { message: "Nama Pelanggan harus diisi!" }),
  id_user: z
    .string({ message: "User harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  id_meja: z
    .string({ message: "Meja harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  status: z.enum(["BELUM_BAYAR", "LUNAS"]),
});

export const statusUpdateSchema = z.object({
  status: z.enum(["BELUM_BAYAR", "LUNAS"]),
});
