import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { PUBLIC_ROUTES, LOGIN, PROTECTED_SUB_ROUTES } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  console.log(isPublicRoute);

  if (nextUrl.pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    } else {
      return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }
  }

  if (
    isAuthenticated &&
    (nextUrl.pathname === "/auth/login" ||
      nextUrl.pathname === "/auth/register")
  ) {
    const redirectUrl = request.headers.get("referer") || "/";
    return NextResponse.redirect(new URL(redirectUrl, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
