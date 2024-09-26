import { H2, P } from "@/app/_components/global/text";
import { findMejas } from "@/query/meja.query";
import MejaTable from "./_components/table";

export default async function Mejas() {
  const mejas = await findMejas({});

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Meja Managements</H2>
          <P>Change Meja</P>
        </div>
      </div>
      <MejaTable data={mejas} />
    </div>
  );
}
