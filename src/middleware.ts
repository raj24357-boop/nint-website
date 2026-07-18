import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const protectedPrefixes = {
  CUSTOMER: "/dashboard",
  WORKER: "/worker",
  ADMIN: "/admin",
};

export default auth(async (req: NextRequest) => {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  if (!session?.user) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/worker") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const role = session.user.role as string | undefined;
  if (role === "CUSTOMER" && pathname.startsWith(protectedPrefixes.WORKER)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (role === "WORKER" && pathname.startsWith(protectedPrefixes.CUSTOMER)) {
    return NextResponse.redirect(new URL("/worker/dashboard", req.url));
  }
  if (role === "ADMIN" && pathname.startsWith(protectedPrefixes.CUSTOMER)) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (role === "CUSTOMER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (role === "WORKER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/worker/dashboard", req.url));
  }
  if (role === "ADMIN" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/worker/:path*", "/admin/:path*", "/login", "/register"],
};
