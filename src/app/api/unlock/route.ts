import { NextResponse } from "next/server";
import {
  COOKIE_MAX_AGE,
  COOKIE_NAME,
  normalize,
  sitePassword,
  unlockToken,
} from "@/lib/site-password";

export async function POST(request: Request) {
  const password = sitePassword();

  // Site isn't password-protected right now — nothing to unlock.
  if (!password) return NextResponse.json({ ok: true });

  let submitted = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") submitted = body.password;
  } catch {
    // Malformed body counts as a wrong answer.
  }

  if (normalize(submitted) !== normalize(password)) {
    // Small pause so the password can't be guessed at full speed.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: await unlockToken(password),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}
