import { H2, P } from "@/app/_components/global/text";
import { findTransaksis } from "@/query/transaksi.query";
import TransaksiTable from "./_components/table";
import { transaksiWithUsersAndMejas } from "@/types/relation";
import { getServerSession } from "@/lib/next-auth";

export default async function Transaksis() {
  const session = await getServerSession();
  const currentUserId = session?.user?.id_user;
  const transaksiRaw: transaksiWithUsersAndMejas[] = await findTransaksis({});
  const transaksis: transaksiWithUsersAndMejas[] = transaksiRaw
    .filter((transaksi) => transaksi.id_user === currentUserId)
    .map((transaksi) => ({
      ...transaksi,
      details: transaksi.details.map((detail) => ({
        ...detail,
      })),
    }));
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Transaksi Managements</H2>
          <P>Print Receipt and Update Payment Status</P>
        </div>
      </div>
      <TransaksiTable data={transaksis} />
    </div>
  );
}
