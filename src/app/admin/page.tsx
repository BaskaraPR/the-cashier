import { FaTable, FaUser } from "react-icons/fa";
import { Display } from "../_components/global/text";
import StatsCard from "./_components/stats-card";
import prisma from "@/lib/prisma";
import { IoFastFood } from "react-icons/io5";
import { FaBottleDroplet } from "react-icons/fa6";
import { getServerSession } from "@/lib/next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  const [kasirsCount] = await prisma.$transaction([
    prisma.user.count({
      where: { AND: [{ role: "KASIR" }, { unalived: false }] },
    }),
  ]);
  const [adminsCount] = await prisma.$transaction([
    prisma.user.count({
      where: { AND: [{ role: "ADMIN" }, { unalived: false }] },
    }),
  ]);
  const [manajersCount] = await prisma.$transaction([
    prisma.user.count({
      where: { AND: [{ role: "MANAJER" }, { unalived: false }] },
    }),
  ]);
  const [mejaCount] = await prisma.$transaction([prisma.meja.count()]);
  const [minumanCount] = await prisma.$transaction([
    prisma.menu.count({
      where: { AND: [{ jenis: "MINUMAN" }, { isPerished: false }] },
    }),
  ]);
  const [makananCount] = await prisma.$transaction([
    prisma.menu.count({
      where: { AND: [{ jenis: "MAKANAN" }, { isPerished: false }] },
    }),
  ]);

  return (
    <>
      <Display>
        Hello There,{" "}
        <span className="text-purple-400">
          {session?.user?.name.split(" ")[0]}
        </span>
        !
      </Display>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard title="Kasir" count={kasirsCount} Icon={FaUser} />
        <StatsCard title="Admin" count={adminsCount} Icon={FaUser} />
        <StatsCard title="Manajer" count={manajersCount} Icon={FaUser} />
      </div>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard title="Meja" count={mejaCount} Icon={FaTable} />
      </div>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard title="Makanan" count={makananCount} Icon={IoFastFood} />
        <StatsCard
          title="Minuman"
          count={minumanCount}
          Icon={FaBottleDroplet}
        />
      </div>
    </>
  );
}
