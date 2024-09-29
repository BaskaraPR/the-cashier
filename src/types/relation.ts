import { Prisma, Status, Role, Jenis } from "@prisma/client";

export type detailWithMenusAndTransaksis = Prisma.detail_transaksiGetPayload<{
  include: { menu: true; transaksi: true };
}>;

export type transaksiWithUsersAndMejas = {
  id_transaksi: string;
  tgl_transaksi: Date;
  id_user: string;
  id_meja: string;
  nama_pelanggan: string;
  status: Status;

  user: {
    id_user: string;
    name: string;
    username: string;
    password: string; // Ensure this is handled securely
    role: Role;
  };

  meja: {
    id_meja: string;
    nomor_meja: number;
  };

  details: Array<{
    id_detail_transaksi: string;
    id_transaksi: string;
    id_menu: string;
    harga: number;
    qty: number;
    totalHarga: BigInt;
    menu: {
      id_menu: string;
      nama_menu: string;
      jenis: Jenis;
      deskripsi: string;
      gambar: string;
      harga: number;
    };
  }>;
};
