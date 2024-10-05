"use client";

import ModalWrapper from "@/app/_components/global/modal-wrapper";
import { updateStatus } from "../../transaksi/action";

import { Status, transaksi } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { FaX } from "react-icons/fa6";

import { Button } from "@/app/_components/global/button";
import { H3 } from "@/app/_components/global/text";
import { useZodForm } from "@/app/hooks/useZodForm";
import { statusUpdateSchema } from "@/lib/validator/transaksi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SelectFieldController } from "@/app/_components/global/input-controller";
import { fetchData } from "next-auth/client/_utils";

export default function Edit({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>; // Needed for closing the modal
  data?: transaksi | null;
}) {
  const [loading, setLoading] = useState(false);
  const form = useZodForm({
    defaultValues: {
      status: data?.status,
    },
    schema: statusUpdateSchema,
  });
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    if (!data?.id_transaksi) {
      toast.error("Transaction data is not available.");
      return;
    }

    const toastId = toast.loading("Loading...");
    const result = await updateStatus(data.id_transaksi, values, data.id_meja);

    if (!result.success) {
      setLoading(false);
      return toast.error(result.message, { id: toastId });
    }

    toast.success(result.message, { id: toastId });

    router.refresh();
    setIsOpenModal(false);
    setLoading(false);
  });

  return (
    <ModalWrapper>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between border-b p-4 md:p-5">
          <H3>Update Transaction Status</H3>
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setIsOpenModal(false)}
            type="button"
          >
            <FaX size={16} />
          </button>
        </div>
        <div className="space-y-4 p-4 md:p-5">
          <SelectFieldController
            name="status"
            control={form.control}
            label="Select Status"
            options={Object.values(Status).map((status) => ({
              label: status,
              value: status,
            }))}
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
