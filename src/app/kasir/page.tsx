import { Display } from "../_components/global/text";
import StatsCard from "../admin/_components/stats-card";
import { GiArchiveRegister, GiTakeMyMoney } from "react-icons/gi";
import prisma from "@/lib/prisma";

export default async function kasirDashboard() {
  const [trDoneCount] = await prisma.$transaction([
    prisma.transaksi.count({ where: { status: "LUNAS" } }),
  ]);
  const [ngutankamun] = await prisma.$transaction([
    prisma.transaksi.count({ where: { status: "BELUM_BAYAR" } }),
  ]);
  return (
    <div>
      <Display>Ligma</Display>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard
          title="Transaction Complete"
          count={trDoneCount}
          Icon={GiArchiveRegister}
        />
        <StatsCard
          title="Ngutankamun"
          count={ngutankamun}
          Icon={GiTakeMyMoney}
        />
      </div>
    </div>
  );
}
