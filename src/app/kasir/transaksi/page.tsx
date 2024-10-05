import { findMenus } from "@/query/menu.query";
import { findMejas } from "@/query/meja.query";
import { H2 } from "@/app/_components/global/text";
import MenuCard from "./_components/card";
import ButtTemp from "./_components/messiButt";

export default async function Page() {
  const menus = await findMenus();
  const mejas = await findMejas({ isVacant: true });
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Make Transaction</H2>
        </div>
        <ButtTemp data={mejas} />
      </div>
      <div className="flex flex-wrap gap-4">
        {menus.map((menu) => (
          <MenuCard key={menu.id_menu} menuData={menu} />
        ))}
      </div>
    </div>
  );
}
