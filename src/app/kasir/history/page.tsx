import { H2, P } from "@/app/_components/global/text";
import { findTransaksis } from "@/query/transaksi.query";
import { findMejas } from "@/query/meja.query";
import TransaksiTable from "./_components/table";
import { transaksiWithUsersAndMejas } from "@/types/relation";

export default async function Transaksis() {
  const transaksiRaw: transaksiWithUsersAndMejas[] = await findTransaksis({});
  const mejas = await findMejas({});
  const transaksis: transaksiWithUsersAndMejas[] = transaksiRaw.map(
    (transaksi) => ({
      ...transaksi,
      details: transaksi.details.map((detail) => ({
        ...detail,
        // Add additional mapping logic if necessary
      })),
    })
  );
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">User Managements</H2>
          <P>Change users roles and permission</P>
        </div>
      </div>
      <TransaksiTable data={transaksis} mejaData={mejas} />
    </div>
  );
}
