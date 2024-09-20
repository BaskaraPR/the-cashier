import { Role } from "@prisma/client";

export interface ProtectedRoutes {
  title: string;
  path: string;
  regex: RegExp;
  roles: Role[] | "All";
}

export const protectedRoutes: ProtectedRoutes[] = [
  {
    title: "User Data",
    path: "/admin/user",
    regex: /\/admin\/user(\/|)[A-Za-z]?/i,
    roles: ["ADMIN"],
  },
  {
    title: "Meja Data",
    path: "/admin/meja",
    regex: /\/admin\/meja(\/|)[A-Za-z]?/i,
    roles: ["ADMIN"],
  },
  {
    title: "Menu Data",
    path: "/admin/menu",
    regex: /\/admin\/menu(\/|)[A-Za-z]?/i,
    roles: ["ADMIN"],
  },
  {
    title: "Transaksi",
    path: "/kasir/transaksi",
    regex: /\/kasir\/transaksi(\/|)[A-Za-z]?/i,
    roles: ["KASIR"],
  },
  {
    title: "Record",
    path: "/manajer/record",
    regex: /\/manajer\/record(\/|)[A-Za-z]?/i,
    roles: ["MANAJER"],
  },
];
