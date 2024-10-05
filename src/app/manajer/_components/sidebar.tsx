import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { protectedRoutes } from "@/utils/protectedRoutes";
type SidebarProps = {
  nav: boolean;
  session: Session | null;
};

export default function Sidebar({ nav, session }: SidebarProps) {
  const pathname = usePathname();

  const allowedRoutes = protectedRoutes.filter((item) => {
    const userRole = session?.user?.role;

    return item.roles == "All" || (userRole && item.roles.includes(userRole));
  });

  return (
    <aside
      id="sidebar"
      className={`fixed ${
        nav ? "w-80" : "w-0 opacity-0"
      } left-0 top-0 z-20 hidden h-full flex-shrink-0 bg-white transition-all duration-300 lg:flex lg:w-80 lg:opacity-100`}
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white px-4 pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
          <div className="flex-1 space-y-1 bg-white px-3">
            <Link href={"/"} className="block"></Link>
            <ul className="space-y-4 pb-2">
              <P className="font-semibold">Manajer Menu</P>

              <Button
                variant={"primary"}
                onClick={() =>
                  signOut({ callbackUrl: "/auth/login", redirect: true })
                }
                className="w-full"
              >
                Log Out
              </Button>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
