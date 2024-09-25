"use client";
import { useState } from "react";
import TransaksiModal from "./modal";
import { meja } from "@prisma/client";
import { Button } from "@/app/_components/global/button";

export default function ButtTemp({ data }: { data: meja[] }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button variant={"primary"} onClick={() => setIsOpenModal(true)}>
        Complete Transaction
      </Button>
      {isOpenModal && <TransaksiModal setIsOpenModal={setIsOpenModal} mejaData={data}/>}
    </div>
  );
}
