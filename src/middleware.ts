import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isLoginApi = request.nextUrl.pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session")?.value;
  const isValidSession = session === process.env.ADMIN_PASSWORD;

  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isWriteApi =
    request.nextUrl.pathname.startsWith("/api/tour-dates") &&
    request.method !== "GET";

  if ((isAdminPage || isWriteApi) && !isValidSession) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/tour-dates/:path*"],
};