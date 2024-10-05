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
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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

  const isWithinDateRange = (tgl_transaksi: Date) => {
    const date = new Date(tgl_transaksi);
    const start = startDate ? new Date(startDate) : null;
    let end: Date | null = endDate ? new Date(endDate) : null;
    if (end instanceof Date && !isNaN(end.getTime())) {
      end.setHours(23, 59, 59, 999);
    }

    if (start && end) {
      return date >= start && date <= end;
    } else if (start) {
      return date >= start;
    } else if (end) {
      return date <= end;
    }

    return true;
  };

  useEffect(() => {
    const filtered = data
      .filter(
        (transaksi) =>
          transaksi.nama_pelanggan
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaksi.meja.nomor_meja.toString().includes(searchTerm)
      )
      .filter((transaksi) =>
        statusFilter ? transaksi.status === statusFilter : true
      )
      .filter((transaksi) => isWithinDateRange(transaksi.tgl_transaksi));

    setFilteredUsers(filtered);
  }, [data, searchTerm, statusFilter, startDate, endDate]);

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
      <div className="inline-block mr-2">
        <label className="block mb-1">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="LUNAS">Lunas</option>
          <option value="BELUM_BAYAR">Belum Bayar</option>
        </select>
      </div>
      <div className="inline-block mr-2">
        <label className="block mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="inline-block">
        <label className="block mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="rounded-md bg-white p-2">
        <SearchInput
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
        <DataTable
          columns={columns}
          data={filteredUsers}
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
