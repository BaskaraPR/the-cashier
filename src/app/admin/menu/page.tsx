import { H2, P } from "@/app/_components/global/text";
import { findMenus } from "@/query/menu.query";
import MenuTable from "./_components/table";

export default async function Users() {
  const menus = await findMenus({});

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Menu Managements</H2>
          <P>Manage Menu Data</P>
        </div>
      </div>
      <MenuTable data={menus} />
    </div>
  );
}
