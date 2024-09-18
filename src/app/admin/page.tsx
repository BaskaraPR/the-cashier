import { getServerSession } from "@/lib/next-auth";
import { FaTrophy, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Display } from "../_components/global/text";
import StatsCard from "./_components/stats-card";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession();
  const [kasirsCount] = await prisma.$transaction([
    prisma.user.count({ where: { role: "KASIR" } }),
  ]);
  const [adminsCount] = await prisma.$transaction([
    prisma.user.count({ where: { role: "ADMIN" } }),
  ]);
  const [manajersCount] = await prisma.$transaction([
    prisma.user.count({ where: { role: "MANAJER" } }),
  ]);

  return (
    <>
      <Display>Hello There, !</Display>
      <div className="mt-5 flex items-center gap-10">
        <StatsCard title="Kasir" count={kasirsCount} Icon={FaUser} />
        <StatsCard title="Admin" count={adminsCount} Icon={FaUser} />
        <StatsCard title="Manajer" count={manajersCount} Icon={FaUser} />
      </div>
    </>
  );
}
