import { H2, P } from "@/app/_components/global/text";
import { findTransaksis } from "@/query/transaksi.query";
import TransaksiTable from "./table";
import { transaksiWithUsersAndMejas } from "@/types/relation";

export default async function Transaksis() {
  const transaksiRaw: transaksiWithUsersAndMejas[] = await findTransaksis({});
  const transaksis: transaksiWithUsersAndMejas[] = transaksiRaw.map(
    (transaksi) => ({
      ...transaksi,
      details: transaksi.details.map((detail) => ({
        ...detail,
      })),
    })
  );
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Transaksi Records</H2>
          <P>Views Transaction and Print Receipt</P>
        </div>
      </div>
      <TransaksiTable data={transaksis} />
    </div>
  );
}
