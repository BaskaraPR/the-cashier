import { findMenus } from "@/query/menu.query";
import { findMejas } from "@/query/meja.query";
import { H2, P } from "@/app/_components/global/text";
import MenuCard from "./_components/card";
import ButtTemp from "./_components/trButt";

export default async function Page() {
  const menus = await findMenus({});
  const mejas = await findMejas();
  return (  
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Make Transaction</H2>
          <P>Click cart icon to add the item to cart and quantity</P>
          <P>Click complete transaction to submit the whole item</P>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {" "}
        {/* Flex container for menu cards */}
        {menus.map((menu) => (
          <MenuCard key={menu.id_menu} menuData={menu} />
        ))}
      </div>
      <ButtTemp data={mejas} />
    </div>
  );
}
