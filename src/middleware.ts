import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { protectedRoutes } from "./utils/protectedRoutes";

export default withAuth(function middleware(req) {
  const { token } = req.nextauth;
  const { pathname } = req.nextUrl;

  const baseUrl = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", baseUrl));
  }

  if (token.role === "ADMIN" && !pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", baseUrl));
  }

  if (token.role === "KASIR" && !pathname.startsWith("/kasir")) {
    return NextResponse.redirect(new URL("/kasir", baseUrl));
  } 

  if (token.role === "MANAJER" && !pathname.startsWith("/manajer")) {
    return NextResponse.redirect(new URL("/manajer", baseUrl));
  }
  const route = protectedRoutes.find((route) => route.regex.test(pathname));

  const hasAccess =
    route && (route.roles == "All" || route.roles.includes(token.role));

  if (route && !hasAccess) {
    return NextResponse.rewrite(new URL("/unauthorized", baseUrl), {
      status: 403,
    });
  }
});

export const config = {
  matcher: ["/admin/:path*", "/admin", "/kasir/:path*", "/kasir","/manajer/:path*","/manajer"],
};
