import { NextResponse, type NextRequest } from "next/server";
import {
  COOKIE_NAME,
  safeEqual,
  sitePassword,
  unlockToken,
} from "@/lib/site-password";

/**
 * Guards every page behind the shared guest password. (In Next 16 this file
 * convention is `proxy`, formerly `middleware`.)
 */
export const config = {
  matcher: [
    // Everything except the unlock endpoint, Next's own assets, and static
    // files in public/ — the gate page needs its own artwork to load.
    "/((?!api/unlock|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico)$).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const password = sitePassword();

  // No password configured (env var missing on a deploy). Leave the site open
  // rather than locking every guest out of an otherwise working site.
  if (!password) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/password") return NextResponse.next();

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (cookie && safeEqual(cookie, await unlockToken(password))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/password";
  url.search = "";
  // Send them on to wherever they were headed once they're in. Internal paths
  // only — `//evil.com` is a protocol-relative URL, not a path on this site.
  if (pathname !== "/" && !pathname.startsWith("//")) {
    url.searchParams.set("next", pathname + request.nextUrl.search);
  }
  return NextResponse.redirect(url);
}
