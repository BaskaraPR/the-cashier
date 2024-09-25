import { H2, P } from "@/app/_components/global/text";
import { findTransaksis } from "@/query/transaksi.query";
import TransaksiTable from "./_components/table";

export default async function Transaksis() {
  const users = await findTransaksis({});

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">User Managements</H2>
          <P>Change users roles and permission</P>
        </div>
      </div>
      <TransaksiTable data={users} />
    </div>
  );
}
