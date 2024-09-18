"use client";
import { meja } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { TextField } from "@/app/_components/global/input";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import {
  createMejaFormSchema,
  updateMejaFormSchema,
} from "@/lib/validator/meja";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertMeja } from "../actions";
import ModalWrapper from "@/app/_components/global/modal-wrapper";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: meja | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      nomor_meja: data?.nomor_meja,
    },
    schema: data === null ? createMejaFormSchema : updateMejaFormSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    const result = await upsertMeja(data?.id_meja, values);

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
          <H3>Meja Data</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <TextField
            type="text"
            label="Nomor Meja"
            placeholder=" "
            errorMessage={form.formState.errors.nomor_meja?.message}
            {...form.register("nomor_meja")}
          />
        </div>
        <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4 md:p-5">
          <Button variant={"primary"} type="submit" disabled={loading}>
            Kirim
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
