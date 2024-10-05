"use client";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

import { deleteUser } from "../actions";

import { Button } from "@/app/_components/global/button";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import SearchInput from "@/app/_components/global/searchBar";

export default function UserTable({ data }: { data: user[] }) {
  const [loader, setLoader] = useState(true);
  const [editModalData, setEditModalData] = useState<user | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);

  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, data]);

  const columns: TableColumn<user>[] = [
    {
      name: "Nama User",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: false,
    },
    {
      name: "Role",
      selector: (row) => row.role,
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
          <button
            onClick={() => deleteAction(row.id_user)}
            title="Delete User"
            className="me-2 rounded bg-red-100 p-2.5 text-xs font-medium text-red-800 transition-all hover:bg-red-700 hover:text-white"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  // Edit user function
  function editUser(data: user) {
    setEditModalData(data);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(true);
  }

  // Create user function
  function createUser() {
    setEditModalData(null);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(true);
  }

  // Delete user function
  async function deleteAction(id: string) {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;

    const toastId = toast.loading("Loading...");
    const deleteResponse = await deleteUser(id);

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
      <div className="mb-4 flex items-center gap-4">
        <Button
          variant={"primary"}
          onClick={() => {
            createUser();
          }}
        >
          Add user
        </Button>
      </div>

      <div className="rounded-md bg-white p-2">
        {isEditModalOpen && (
          <Modal setIsOpenModal={setIsEditModalOpen} data={editModalData} />
        )}
        {isCreateModalOpen && (
          <Modal setIsOpenModal={setIsCreateModalOpen} data={null} />
        )}

        <SearchInput
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearch={() => {}}
        />
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
        />
      </div>
    </>
  );
}
