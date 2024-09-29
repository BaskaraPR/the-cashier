"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteMenu } from "../actions";

import { Button } from "@/app/_components/global/button";
import { menu } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import Image from "next/image";

export default function MenuTable({ data }: { data: menu[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<menu | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [jenisFilter, setJenisFilter] = useState<string>("");
  const router = useRouter();

  const columns: TableColumn<menu>[] = [
    {
      name: "Nama Menu",
      selector: (row) => row.nama_menu,
      sortable: false,
    },
    {
      name: "Jenis",
      selector: (row) => row.jenis,
      sortable: false,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: false,
    },
    {
      name: "Gambar",
      selector: (row) => row.gambar,
      sortable: false,
      cell: (row) => (
        <Image
          src={`/menu/${row.gambar}`}
          alt={`Gambar ${row.nama_menu}`}
          width={52}
          height={52}
          layout="responsive"
          unoptimized
        />
      ),
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => editMenu(row)}
            title="Edit Menu"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => deleteAction(row.id_menu)}
            title="Delete Menu"
            className="me-2 rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all hover:bg-red-700 hover:text-white"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  function editMenu(data: menu) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  function createMenu() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteMenu(id);

    if (!deleteResponse.success)
      return toast.error(deleteResponse.message, { id: toastId });

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  const filteredData = jenisFilter
    ? data.filter((menu) => menu.jenis === jenisFilter)
    : data;

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <div className="">
      <Button
        variant={"primary"}
        onClick={() => {
          createMenu();
        }}
      >
        Add Menu
      </Button>
      <select
        value={jenisFilter}
        onChange={(e) => setJenisFilter(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All</option>
        <option value="MAKANAN">Makanan</option>
        <option value="MINUMAN">Minuman</option>
      </select>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal setIsOpenModal={setIsEditModalOpen} data={editModalData} />
        )}
        {isCreateModalOpen && (
          <Modal setIsOpenModal={setIsCreateModalOpen} data={null} />
        )}

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
}
