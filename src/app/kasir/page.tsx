import { Display } from "../_components/global/text";
import StatsCard from "../admin/_components/stats-card";
import { GiArchiveRegister, GiTakeMyMoney } from "react-icons/gi";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/next-auth";

export default async function kasirDashboard() {
  const session = await getServerSession();
  const currentUserId = session?.user?.id_user;
  const [trDoneCount] = await prisma.$transaction([
    prisma.transaksi.count({
      where: { status: "LUNAS", id_user: currentUserId },
    }),
  ]);
  const [ngutankamun] = await prisma.$transaction([
    prisma.transaksi.count({
      where: { status: "BELUM_BAYAR", id_user: currentUserId },
    }),
  ]);
  return (
    <div>
      <Display>
        <span>{session?.user?.name.split(" ")[0]}&#39;s </span>
        Transactions Data
      </Display>
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
