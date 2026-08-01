"use client";

import { useState } from "react";

type Attending = "yes" | "no" | "";

const EVENTS = [
  { id: "welcome", label: "Welcome Party · Fri, June 4" },
  { id: "wedding", label: "The Wedding · Sat, June 5" },
];

const MEALS = ["Chicken", "Fish", "Vegetarian", "Vegan"];

export default function RsvpForm() {
  const [attending, setAttending] = useState<Attending>("");
  const [events, setEvents] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [savedName, setSavedName] = useState("");

  function toggleEvent(id: string) {
    setEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      attending,
      guests: data.get("guests"),
      events,
      meal: data.get("meal"),
      dietary: data.get("dietary"),
      song: data.get("song"),
      note: data.get("note"),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setSavedName(String(payload.name || ""));
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  // ── Success screen ──────────────────────────────────────────
  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <h3 className="display-caps text-3xl text-moss">Thank you</h3>
        <p className="mt-4 text-lg text-stone">
          {attending === "yes"
            ? `We've got your RSVP, ${savedName.split(" ")[0]} — we can't wait to celebrate with you in Napa!`
            : `Thanks for letting us know, ${savedName.split(" ")[0]}. We'll miss you, but we understand — sending love.`}
        </p>
        <p className="mt-6 text-sm text-stone/80">
          Need to change something? Just submit the form again or email us.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-mist bg-ivory px-4 py-3 text-ink placeholder:text-stone/50 outline-none transition focus:border-sage-deep focus:ring-2 focus:ring-sage/50";
  const labelCls = "label-caps mb-2 block text-[0.68rem] text-moss";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-2xl border border-mist bg-white/70 p-6 shadow-sm sm:p-9"
    >
      {/* Name */}
      <div className="mb-5">
        <label htmlFor="name" className={labelCls}>
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="First & last name"
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className={inputCls}
        />
      </div>

      {/* Attending toggle */}
      <div className="mb-5">
        <span className={labelCls}>Will you be joining us?</span>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              ["yes", "Joyfully accept"],
              ["no", "Regretfully decline"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setAttending(val)}
              className={`rounded-lg border px-4 py-3 text-sm transition ${
                attending === val
                  ? "border-moss bg-moss text-ivory"
                  : "border-mist bg-ivory text-ink hover:border-sage-deep"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional details when attending */}
      {attending === "yes" && (
        <div className="space-y-5 border-t border-mist pt-5">
          {/* Guests */}
          <div>
            <label htmlFor="guests" className={labelCls}>
              Total in your party (including you)
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={12}
              defaultValue={1}
              className={inputCls}
            />
          </div>

          {/* Which events */}
          <div>
            <span className={labelCls}>Which events will you attend?</span>
            <div className="space-y-2">
              {EVENTS.map((ev) => (
                <label
                  key={ev.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                    events.includes(ev.id)
                      ? "border-sage-deep bg-sage-soft"
                      : "border-mist bg-ivory hover:border-sage-deep"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={events.includes(ev.id)}
                    onChange={() => toggleEvent(ev.id)}
                    className="h-4 w-4 accent-moss"
                  />
                  {ev.label}
                </label>
              ))}
            </div>
          </div>

          {/* Meal */}
          <div>
            <label htmlFor="meal" className={labelCls}>
              Dinner preference
            </label>
            <select id="meal" name="meal" className={inputCls} defaultValue="">
              <option value="" disabled>
                Choose one…
              </option>
              {MEALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary */}
          <div>
            <label htmlFor="dietary" className={labelCls}>
              Dietary restrictions or allergies
            </label>
            <input
              id="dietary"
              name="dietary"
              type="text"
              placeholder="Optional"
              className={inputCls}
            />
          </div>

          {/* Song */}
          <div>
            <label htmlFor="song" className={labelCls}>
              A song that'll get you on the dance floor
            </label>
            <input
              id="song"
              name="song"
              type="text"
              placeholder="Optional — song & artist"
              className={inputCls}
            />
          </div>
        </div>
      )}

      {/* Note (always shown once a choice is made) */}
      {attending && (
        <div className="mt-5">
          <label htmlFor="note" className={labelCls}>
            A note for Madeleine & Brian
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            placeholder="Optional"
            className={inputCls}
          />
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-clay/10 px-4 py-3 text-sm text-clay">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!attending || status === "saving"}
        className="mt-7 w-full rounded-full bg-moss px-6 py-4 text-ivory transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="label-caps text-[0.72rem]">
          {status === "saving" ? "Sending…" : "Send RSVP"}
        </span>
      </button>
      <p className="mt-3 text-center text-xs text-stone/70">
        Kindly respond by April 1, 2027
      </p>
    </form>
  );
}
