import { z } from "zod";

export const updateDetailFormSchema = z.object({
  id_transaksi: z
    .string({ message: "Transaksi harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  id_menu: z
    .string({ message: "Menu harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  harga: z.string().min(1, { message: "Nama Pelanggan harus diisi!" }),
  qty: z.number().min(1),
  totalHarga: z.string().min(1),
});

export const createDetailFormSchema = z.object({
  id_transaksi: z
    .string({ message: "Transaksi harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  id_menu: z
    .string({ message: "Menu harus diisi!" })
    .uuid("Stage ID harus berupa UUID"),
  harga: z.string().min(1, { message: "Nama Pelanggan harus diisi!" }),
  qty: z.number().min(1),
  totalHarga: z.string().min(1),
});
