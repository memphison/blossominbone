import { NextResponse } from "next/server";
import { createHmac } from "crypto";

function makeSessionToken() {
  return createHmac("sha256", process.env.SESSION_SECRET!)
    .update(process.env.ADMIN_PASSWORD!)
    .digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
