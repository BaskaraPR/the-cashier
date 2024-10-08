"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { protectedRoutes } from "@/utils/protectedRoutes";

import { DashboardIcon, HamburgerIcon } from "./icon";

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const allowedRoutes = protectedRoutes.filter((item) => {
    const userRole = session?.user?.role;

    return item.roles == "All" || (userRole && item.roles.includes(userRole));
  });

  return (
    <nav className="fixed z-[999] mx-auto flex w-full flex-col lg:hidden xl:relative">
      <div className="z-[999] flex w-full justify-between bg-white px-5 py-4 xl:max-w-[1192px] xl:bg-transparent xl:py-0">
        <Link href={"/"} className="block xl:mt-8">
          Home
        </Link>
        <button
          className="block xl:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        className={`z-[800] block w-full overflow-y-auto bg-white py-3 transition-all duration-500 xl:hidden ${
          isExpanded ? "mt-0" : "-mt-[1000px]"
        }`}
      >
        <div className="mx-5 my-[21px] flex flex-col items-start justify-start gap-8 text-start">
          <ul className="w-full space-y-4 pb-2">
            <li>
              <Link
                href={"/admin"}
                className="group flex items-center rounded-lg p-2 text-base font-normal text-purple-400 transition-all hover:bg-purple-100"
              >
                <DashboardIcon />
                <P className="ml-3 whitespace-nowrap font-semibold text-purple-400">
                  Dashboard
                </P>
              </Link>
            </li>
            <P className="font-semibold">Menu</P>
            {allowedRoutes.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  onClick={() => setIsExpanded(false)}
                  className={
                    (pathname.includes(item.path) ? "bg-purple-100 " : "") +
                    "group flex items-center rounded-lg p-2 text-base font-normal text-purple-400 transition-all hover:bg-purple-200"
                  }
                >
                  <div />
                  <P className="ml-3 whitespace-nowrap font-semibold text-purple-400">
                    {item.title}
                  </P>
                </Link>
              </li>
            ))}
            <Button
              variant={"primary"}
              onClick={() =>
                signOut({ callbackUrl: "/auth/login", redirect: true })
              }
              className="w-full justify-center"
            >
              Log Out
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
}
