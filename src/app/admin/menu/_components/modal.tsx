"use client";
import { menu, Jenis } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField, FileField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  createMenuFormSchema,
  updateMenuFormSchema,
  ACCEPTED_IMAGE_TYPES,
} from "@/lib/validator/menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertMenu } from "../actions";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: menu | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      nama_menu: data?.nama_menu,
      jenis: data?.jenis,
      deskripsi: data?.deskripsi,
      gambar: undefined,
      harga: data?.harga.toString(),
    },
    schema: data === null ? createMenuFormSchema : updateMenuFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const gambarFile = (values.gambar as FileList)[0];
    const actionData = new FormData();
    actionData.append("nama_menu", values.nama_menu);
    actionData.append("jenis", values.jenis);
    actionData.append("deskripsi", values.deskripsi);
    actionData.append("harga", values.harga);
    actionData.append("gambar", gambarFile);

    console.log("gambar : ", gambarFile);
    const result = await upsertMenu(data?.id_menu, actionData);

    if (!result.success) {
      setLoading(false);
      return toast.error(result.message, { id: toastId });
    }

    toast.success(result.message, { id: toastId });
    setIsOpenModal(false);
    setLoading(false);
    router.refresh();
  });

  return (
    <ModalWrapper>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b p-4 md:p-5">
          <H3>Menu Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-purple-200 p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Nama Menu"
            placeholder="Food or Drink"
            errorMessage={form.formState.errors.nama_menu?.message}
            {...form.register("nama_menu")}
          />
          <SelectFieldController
            name="jenis"
            control={form.control}
            label="Select Jenis"
            options={Object.values(Jenis).map((jenis) => ({
              label: jenis,
              value: jenis,
            }))}
          />
          <FileField
            name="gambar"
            label="Gambar"
            register={form.register}
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            errorMessage={form.formState.errors.gambar?.message?.toString()}
          />
          <TextField
            type="text"
            label="Deskripsi"
            placeholder="...."
            errorMessage={form.formState.errors.deskripsi?.message}
            {...form.register("deskripsi")}
          />
          <TextField
            type="number"
            label="Harga"
            placeholder="Rp"
            min={1}
            errorMessage={form.formState.errors.harga?.message}
            {...form.register("harga")}
          />
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-black-300 p-4 md:p-5">
          <Button variant={"primary"} type="submit" disabled={loading}>
            Kirim
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
