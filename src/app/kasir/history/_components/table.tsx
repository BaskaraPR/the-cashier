"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaReceipt } from "react-icons/fa";
import ReceiptMaker from "./printPdf";
import { transaksiWithUsersAndMejas } from "@/types/relation";
import { stringifyCompleteDate } from "@/utils/stringifyDate";
import { transaksi } from "@prisma/client";
import SearchInput from "@/app/_components/global/searchBar";
import Edit from "./editModal";

export default function TransaksiTable({
  data,
}: {
  data: transaksiWithUsersAndMejas[];
}) {
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<transaksi | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [receiptData, setReceiptData] =
    useState<transaksiWithUsersAndMejas | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);

  function editStatus(data: transaksi) {
    setEditModalData(data);
    setIsEditModalOpen(true);
  }

  function openReceiptModal(row: transaksiWithUsersAndMejas) {
    setReceiptData(row);
    setIsModalOpen(true);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter(
      (transaksi) =>
        transaksi.nama_pelanggan
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaksi.meja.nomor_meja.toString().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const filteredData = filteredUsers.filter((transaksi) =>
    statusFilter ? transaksi.status === statusFilter : true
  );

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
      selector: (row) => row.meja.nomor_meja,
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
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All</option>
        <option value="LUNAS">Lunas</option>
        <option value="BELUM_BAYAR">Belum Bayar</option>
      </select>
      <div className="rounded-md bg-white p-2">
        <SearchInput
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
        />
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
