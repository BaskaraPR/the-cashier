import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 5_000_000;

export const createMenuFormSchema = z.object({
  nama_menu: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(100, { message: "Nama maximal 100 karakter!" }),
  jenis: z.enum(["MAKANAN", "MINUMAN"]),
  deskripsi: z.string(),
  gambar: z
    .any()
    .refine((files: FileList) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    }, `Ukuran maksimal file adalah 5MB`)
    .refine((files: FileList) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "File harus menggunakan ekstensi .jpg, .jpeg, .png."),
  harga: z.number().min(1, { message: "Harga harus diisi!" }),
});

export const updateMenuFormSchema = z.object({
  nama_menu: z
    .string()
    .min(1, { message: "Nama harus diisi!" })
    .max(100, { message: "Nama maximal 100 karakter!" }),
  jenis: z.enum(["MAKANAN", "MINUMAN"]),
  deskripsi: z.string(),
  gambar: z
    .any()
    .refine((files: FileList) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    }, `Ukuran maksimal file adalah 5MB`)
    .refine((files: FileList) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "File harus menggunakan ekstensi .jpg, .jpeg, .png."),
  harga: z.number().min(1, { message: "Harga harus diisi!" }),
});
