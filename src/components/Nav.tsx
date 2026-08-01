"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#schedule", label: "Schedule" },
  { href: "#travel", label: "Travel & Stay" },
  { href: "#things", label: "Things to Do" },
  { href: "#registry", label: "Registry" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-sage py-3 shadow-[0_2px_12px_rgba(38,37,31,0.18)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10">
          {/* Names — fade in only once you've scrolled past the save-the-date */}
          <a
            href="#top"
            className={`display-caps text-base text-ivory transition-opacity duration-300 sm:text-xl ${
              scrolled ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            Madeleine &amp; Brian
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="label-caps text-xl text-ivory transition-colors hover:text-cream sm:text-2xl"
          >
            Menu
          </button>
        </div>
      </header>

      {/* ── Full-screen menu overlay ──────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-sage">
          <div className="flex w-full items-center justify-between px-6 py-5 sm:px-10">
            <span className="display-caps text-base text-ivory sm:text-xl">
              Madeleine &amp; Brian
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="label-caps text-[0.72rem] text-ivory transition-colors hover:text-cream"
              aria-label="Close menu"
            >
              Close &times;
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-7 pb-16">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="display-caps text-2xl text-ivory transition-colors hover:text-cream sm:text-3xl"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
