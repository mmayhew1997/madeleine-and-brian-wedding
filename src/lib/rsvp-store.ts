/*
  RSVP storage layer.

  Two backends, chosen automatically:
   • If Supabase env vars are set (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY),
     RSVPs are inserted into a hosted Postgres table called `rsvps`.
     This is what we'll use in production so responses persist and Madeleine
     can view them in the Supabase dashboard.
   • Otherwise (local development), RSVPs are appended to data/rsvps.json so
     the whole flow works today with zero setup.

  Switching from local → Supabase is just adding the env vars; no code change.
*/

import { promises as fs } from "fs";
import path from "path";

export type Rsvp = {
  id: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  events: string[]; // e.g. ["welcome", "wedding"]
  meal?: string;
  dietary?: string;
  song?: string;
  note?: string;
  submittedAt: string; // ISO timestamp
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const usingSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

const LOCAL_FILE = path.join(process.cwd(), "data", "rsvps.json");

async function readLocal(): Promise<Rsvp[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw) as Rsvp[];
  } catch {
    return [];
  }
}

async function writeLocal(entry: Rsvp): Promise<void> {
  const all = await readLocal();
  all.push(entry);
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(all, null, 2), "utf8");
}

async function writeSupabase(entry: Rsvp): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rsvps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: entry.name,
      email: entry.email,
      attending: entry.attending,
      guests: entry.guests,
      events: entry.events,
      meal: entry.meal,
      dietary: entry.dietary,
      song: entry.song,
      note: entry.note,
      submitted_at: entry.submittedAt,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase insert failed (${res.status}): ${detail}`);
  }
}

export async function saveRsvp(entry: Rsvp): Promise<{ backend: string }> {
  if (usingSupabase) {
    await writeSupabase(entry);
    return { backend: "supabase" };
  }
  await writeLocal(entry);
  return { backend: "local" };
}

export function storageMode(): "supabase" | "local" {
  return usingSupabase ? "supabase" : "local";
}
