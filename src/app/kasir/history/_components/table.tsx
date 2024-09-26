"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaReceipt } from "react-icons/fa";
import { toast } from "sonner";
import ReceiptMaker from "./printPdf";
import { transaksiWithUsersAndMejas } from "@/types/relation";
import { stringifyCompleteDate } from "@/utils/stringifyDate";
import { transaksi, meja } from "@prisma/client";
import { useRouter } from "next/navigation";
import Edit from "./editModal";

export default function TransaksiTable({
  data,
  mejaData,
}: {
  data: transaksiWithUsersAndMejas[];
  mejaData: meja[];
}) {
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<transaksi | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [receiptData, setReceiptData] =
    useState<transaksiWithUsersAndMejas | null>(null); // To store selected transaction data for the receipt
  const router = useRouter();

  const getMejaNumber = (id_meja: string) => {
    const meja = mejaData.find((m) => m.id_meja === id_meja);
    return meja ? meja.nomor_meja : "Unknown Table";
  };

  function editStatus(data: transaksi) {
    setEditModalData(data);
    setIsEditModalOpen(true);
  }

  function openReceiptModal(row: transaksiWithUsersAndMejas) {
    setReceiptData(row); // Store the selected transaction data for the receipt
    setIsModalOpen(true);
  }

  const columns: TableColumn<transaksiWithUsersAndMejas>[] = [
    {
      name: "Nama Pelanggan",
      selector: (row) => row.nama_pelanggan,
      sortable: false,
    },
    {
      name: "Tanggal Transaksi",
      selector: (row) => stringifyCompleteDate(row.tgl_transaksi),
      sortable: true,
    },
    {
      name: "Nomor Meja",
      selector: (row) => getMejaNumber(row.id_meja),
      sortable: false,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: false,
    },
    {
      name: "Update Status",
      cell: (row) => (
        <button
          onClick={() => editStatus(row)}
          title="Edit Status"
          className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
        >
          <FaPencilAlt />
        </button>
      ),
    },
    {
      name: "Details",
      cell: (row) => (
        <button
          onClick={() => openReceiptModal(row)}
          title="Receipt"
          className="me-2 flex rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
        >
          <FaReceipt /> More..
        </button>
      ),
    },
  ];

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <div className="rounded-md bg-white p-2">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>

      {isEditModalOpen && (
        <Edit setIsOpenModal={setIsEditModalOpen} data={editModalData} />
      )}

      {isModalOpen && receiptData && (
        <ReceiptMaker
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          transaksiData={receiptData}
        />
      )}
    </>
  );
}
