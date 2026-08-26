import type { Metadata } from "next";
import PasswordGate from "@/components/PasswordGate";

export const metadata: Metadata = {
  title: "Madeleine & Brian",
  robots: { index: false, follow: false },
};

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  // Only ever bounce to a path on this site.
  const target =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  return <PasswordGate next={target} />;
}
