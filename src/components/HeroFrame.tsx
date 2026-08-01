import { Spiral, Squiggle } from "./Doodles";

/*
  The save-the-date's ornamental frame, rotated to LANDSCAPE and wrapped around
  the hero: four corner spirals, loop-de-loop squiggles down the sides, sweeping
  curves top & bottom, and a big horizontal oval. Children (the names + date)
  sit inside the oval.
*/

export default function HeroFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex aspect-[8/5] w-full max-w-4xl items-center justify-center">
      {/* oval + sweeping top/bottom curves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-ink/85"
        viewBox="0 0 800 500"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* landscape oval (slightly wobbly, hand-drawn) */}
        <path
          d="M400 60 C 648 56 790 150 790 250 C 790 350 645 444 400 440 C 155 444 10 350 10 250 C 10 150 152 64 400 60 Z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* sweeping curves connecting the corner spirals */}
        <path
          d="M78 96 C 280 58 520 58 722 96"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M78 404 C 280 442 520 442 722 404"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* corner spirals */}
      <Spiral className="absolute -left-2 -top-2 h-16 w-16 text-ink/85" />
      <Spiral className="absolute -right-2 -top-2 h-16 w-16 -scale-x-100 text-ink/85" />
      <Spiral className="absolute -bottom-2 -left-2 h-16 w-16 -scale-y-100 text-ink/85" />
      <Spiral className="absolute -bottom-2 -right-2 h-16 w-16 -scale-100 text-ink/85" />

      {/* vertical loop-de-loop squiggles down each side */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90">
        <Squiggle loops={6} className="h-6 w-64 text-ink/85" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90">
        <Squiggle loops={6} className="h-6 w-64 text-ink/85" />
      </div>

      {/* content inside the oval */}
      <div className="relative z-10 px-16 text-center">{children}</div>
    </div>
  );
}
