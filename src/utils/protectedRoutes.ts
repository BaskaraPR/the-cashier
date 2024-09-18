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
//   {
//     title: "Category",
//     path: "/admin/category",
//     regex: /\/admin\/category(\/|)[A-Za-z]?/i,
//     icon: `
//     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//     </svg>
//     `,
//     roles: ["ADMIN", "SUPERADMIN"],
//   },
//   {
//     title: "Stages",
//     path: "/admin/stage",
//     regex: /\/admin\/stage(\/|)[A-Za-z]?/i,
//     icon: `
//     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//     </svg>
//     `,
//     roles: ["ADMIN", "SUPERADMIN"],
//   },
//   {
//     title: "Announcements",
//     path: "/admin/announcement",
//     regex: /\/admin\/announcement(\/|)[A-Za-z]?/i,
//     icon: `
//     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//     </svg>
//     `,
//     roles: ["ADMIN", "SUPERADMIN"],
//   },
//   {
//     title: "Registration Batches",
//     path: "/admin/registration-batch",
//     regex: /\/admin\/registration-batch(\/|)[A-Za-z]?/i,
//     icon: `
//     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M20 8.75V18.5C20 21.5 18.21 22.5 16 22.5H8C5.79 22.5 4 21.5 4 18.5V8.75C4 5.5 5.79 4.75 8 4.75C8 5.37 8.24997 5.93 8.65997 6.34C9.06997 6.75 9.63 7 10.25 7H13.75C14.99 7 16 5.99 16 4.75C18.21 4.75 20 5.5 20 8.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M16 4.75C16 5.99 14.99 7 13.75 7H10.25C9.63 7 9.06997 6.75 8.65997 6.34C8.24997 5.93 8 5.37 8 4.75C8 3.51 9.01 2.5 10.25 2.5H13.75C14.37 2.5 14.93 2.75 15.34 3.16C15.75 3.57 16 4.13 16 4.75Z" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 13.5H12" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//       <path d="M8 17.5H16" stroke="#E04E4E" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
//     </svg>
//     `,
//     roles: ["ADMIN", "SUPERADMIN"],
//   },
];
