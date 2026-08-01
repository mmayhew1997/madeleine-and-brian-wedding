import { NextResponse } from "next/server";
import { saveRsvp, type Rsvp } from "@/lib/rsvp-store";

// Always run this fresh at request time (never cached).
export const dynamic = "force-dynamic";

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const attending = asString(body.attending);

  // ── Validation ──────────────────────────────────────────────
  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (attending !== "yes" && attending !== "no") {
    return NextResponse.json(
      { ok: false, error: "Please let us know if you can make it." },
      { status: 400 },
    );
  }

  const guestsRaw = Number(body.guests);
  const guests =
    Number.isFinite(guestsRaw) && guestsRaw >= 1 && guestsRaw <= 12
      ? Math.floor(guestsRaw)
      : 1;

  const events = Array.isArray(body.events)
    ? (body.events.filter((e) => typeof e === "string") as string[])
    : [];

  const entry: Rsvp = {
    id: crypto.randomUUID(),
    name,
    email,
    attending: attending as "yes" | "no",
    guests: attending === "yes" ? guests : 0,
    events: attending === "yes" ? events : [],
    meal: asString(body.meal) || undefined,
    dietary: asString(body.dietary) || undefined,
    song: asString(body.song) || undefined,
    note: asString(body.note) || undefined,
    submittedAt: new Date().toISOString(),
  };

  try {
    const { backend } = await saveRsvp(entry);
    return NextResponse.json({ ok: true, backend });
  } catch (err) {
    console.error("Failed to save RSVP:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your RSVP. Please try again." },
      { status: 500 },
    );
  }
}
