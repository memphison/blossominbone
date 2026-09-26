import { NextRequest, NextResponse } from "next/server";

async function makeSessionToken() {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.SESSION_SECRET!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(process.env.ADMIN_PASSWORD!)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isLoginApi = request.nextUrl.pathname === "/api/admin/login";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session")?.value;
  const expectedToken = await makeSessionToken();
  const isValidSession = session === expectedToken;

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
