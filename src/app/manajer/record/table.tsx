"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaReceipt } from "react-icons/fa";
import { transaksiWithUsersAndMejas } from "@/types/relation";
import { stringifyCompleteDate } from "@/utils/stringifyDate";
import ReceiptMaker from "@/app/kasir/history/_components/printPdf";
import SearchInput from "@/app/_components/global/searchBar";

export default function TransaksiTable({
  data,
}: {
  data: transaksiWithUsersAndMejas[];
}) {
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] =
    useState<transaksiWithUsersAndMejas | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  function openReceiptModal(row: transaksiWithUsersAndMejas) {
    setReceiptData(row);
    setIsModalOpen(true);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = data.filter((transaksi) =>
      transaksi.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const isWithinDateRange = (tgl_transaksi: Date) => {
    const date = new Date(tgl_transaksi);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return date >= start && date <= end;
    } else if (start) {
      return date >= start;
    } else if (end) {
      return date <= end;
    }


    return true;
  };

  const filteredData = filteredUsers
    .filter((transaksi) =>
      statusFilter ? transaksi.status === statusFilter : true
    )
    .filter((transaksi) => isWithinDateRange(transaksi.tgl_transaksi));

  const columns: TableColumn<transaksiWithUsersAndMejas>[] = [
    {
      name: "Transaksi By",
      selector: (row) => row.user.name,
      sortable: false,
    },
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
      <div className="flex">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="End Date"
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
          data={filteredData}
          pagination
          highlightOnHover
        />
      </div>
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
