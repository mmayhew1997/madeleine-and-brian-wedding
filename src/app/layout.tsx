import type { Metadata } from "next";
import { Caveat, Jost } from "next/font/google";
import "./globals.css";

// Clean geometric sans — the primary display + body face (Option B)
const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Playful handwriting — kept for a single signature accent only
const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Madeleine & Brian · June 2027 · Napa, California",
  description:
    "Join us as we celebrate the marriage of Madeleine and Brian in the Napa Valley, June 2027. Find event details, travel information, and RSVP here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
