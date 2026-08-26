"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Squiggle } from "@/components/Doodles";

export default function PasswordGate({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "wrong">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!password.trim()) return;
    setStatus("checking");

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.replace(next);
      router.refresh();
    } else {
      setStatus("wrong");
      setPassword("");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sage px-6 py-20 text-center">
      <h1 className="display-caps leading-[1.12] text-ivory text-[clamp(1.75rem,9vw,3.5rem)]">
        Madeleine
        <span className="my-1 block font-light text-[clamp(0.9rem,4vw,1.5rem)]">
          &amp;
        </span>
        Brian
      </h1>

      <p className="label-caps mt-4 text-ivory/80 text-[clamp(0.58rem,2.4vw,0.8rem)]">
        June 5, 2027&nbsp;&nbsp;·&nbsp;&nbsp;Napa Valley
      </p>

      <div className="my-8 flex justify-center text-ivory/70">
        <Squiggle loops={6} className="h-6 w-56 max-w-[70vw]" />
      </div>

      <p className="max-w-sm text-lg text-ivory">
        Please enter the password from your save the date.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row"
      >
        <label htmlFor="site-password" className="sr-only">
          Password
        </label>
        <input
          id="site-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (status === "wrong") setStatus("idle");
          }}
          className="w-full rounded-full border border-ivory/40 bg-white px-5 py-3 text-center text-sage outline-none placeholder:text-sage/40 focus:border-ivory sm:flex-1 sm:text-left"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={status === "checking"}
          className="label-caps w-full rounded-full border border-ivory bg-transparent px-6 py-3 text-[0.82rem] text-ivory transition-colors hover:bg-ivory hover:text-sage disabled:opacity-60 sm:w-auto"
        >
          {status === "checking" ? "…" : "Enter"}
        </button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className="mt-4 h-5 text-base text-ivory/90"
      >
        {status === "wrong" ? "That's not it — try again?" : ""}
      </p>
    </main>
  );
}
