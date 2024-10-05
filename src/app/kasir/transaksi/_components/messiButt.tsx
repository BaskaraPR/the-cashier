"use client";
import { useState, useEffect } from "react";
import TransaksiModal from "./modal";
import { meja } from "@prisma/client";
import { Button } from "@/app/_components/global/button";

export default function ButtTemp({ data }: { data: meja[] }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [detailCount, setDetailCount] = useState(0);

  const updateDetailCount = () => {
    const amba = localStorage.getItem("cart");
    const tukam = amba ? JSON.parse(amba) : [];
    setDetailCount(tukam.length);
  };

  useEffect(() => {
    updateDetailCount();

    window.addEventListener("storage", updateDetailCount);

    return () => {
      window.removeEventListener("storage", updateDetailCount);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-[-0.75rem] right-1 ">
        {detailCount > 0 && (
          <span className=" top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {detailCount}
          </span>
        )}
      </div>

      <Button variant={"primary"} onClick={() => setIsOpenModal(true)}>
        Complete Transaction
      </Button>

      {isOpenModal && (
        <TransaksiModal setIsOpenModal={setIsOpenModal} mejaData={data} />
      )}
    </div>
  );
}
