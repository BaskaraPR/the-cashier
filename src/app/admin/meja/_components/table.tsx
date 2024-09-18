"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteMeja } from "../actions";

import { Button } from "@/app/_components/global/button";
import { meja } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "./modal";

export default function MejaTable({ data }: { data: meja[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<meja | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const columns: TableColumn<meja>[] = [
    {
      name: "Nomor Meja",
      selector: (row) => row.nomor_meja,
      sortable: false,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => editMeja(row)}
            title="Edit Meja"
            className="me-2 rounded bg-blue-100 p-2.5 text-xs font-medium text-blue-800 transition-all hover:bg-blue-700 hover:text-white"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => deleteAction(row.id_meja)}
            title="Delete Meja"
            className="me-2 rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all hover:bg-red-700 hover:text-white"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  function editMeja(data: meja) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  function createMeja() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus meja ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteMeja(id);

    if (!deleteResponse.success)
      return toast.error(deleteResponse.message, { id: toastId });

    toast.success(deleteResponse.message, { id: toastId });
    router.refresh();
  }

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <Button
        variant={"primary"}
        onClick={() => {
          createMeja();
        }}
      >
        Add Meja
      </Button>
      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal setIsOpenModal={setIsEditModalOpen} data={editModalData} />
        )}
        {isCreateModalOpen && (
          <Modal setIsOpenModal={setIsCreateModalOpen} data={null} />
        )}

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
