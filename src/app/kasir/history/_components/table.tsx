"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "sonner";
import { stringifyCompleteDate } from "@/utils/stringifyDate";
import { transaksi } from "@prisma/client";
import { useRouter } from "next/navigation";
import TransaksiModal from "@/app/kasir/transaksi/_components/modal";

export default function TransaksiTable({ data }: { data: transaksi[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<transaksi | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const columns: TableColumn<transaksi>[] = [
    {
      name: "Nama Pelanggan",
      selector: (row) => row.nama_pelanggan,
      sortable: false,
    },
    {
      name: "Tanggal Transaksi",
      selector: (row) => stringifyCompleteDate(row.tgl_transaksi),
      sortable: false,
    },
    {
      name: "Meja",
      selector: (row) => row.id_meja,

      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,

      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => editUser(row)}
            title="Edit User"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaPencilAlt />
          </button>
        </div>
      ),
    },
  ];

  function editUser(data: transaksi) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <div className="rounded-md bg-white p-2">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
