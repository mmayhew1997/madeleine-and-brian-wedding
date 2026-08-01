/*
  Hand-drawn line-art motifs — the visual signature carried over from the
  save-the-date: loop-de-loop squiggles, corner spirals, a wobbly oval frame,
  and daisies (a nod to the wedding florals). All pure SVG so they stay crisp
  at any size and inherit color via `currentColor`.
*/

type SvgProps = React.SVGProps<SVGSVGElement>;

// ── Loop-de-loop squiggle ────────────────────────────────────────────────
// A prolate-cycloid coil: the pen advances right while looping over itself,
// exactly like the hand-drawn springs framing the save-the-date.
function coilPath(loops: number, width: number, amp: number): string {
  const a = width / (2 * Math.PI); // horizontal advance per radian
  const b = amp; // loop radius (b > a makes it cross into a loop)
  const steps = loops * 36;
  const total = loops * 2 * Math.PI;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * total;
    const x = a * t - b * Math.sin(t);
    const y = -b * Math.cos(t);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M " + pts.join(" L ");
}

export function Squiggle({
  loops = 7,
  className,
  ...props
}: { loops?: number } & SvgProps) {
  const width = 46;
  const amp = 15;
  const a = width / (2 * Math.PI);
  const totalW = a * (loops * 2 * Math.PI);
  const pad = amp + 4;
  return (
    <svg
      viewBox={`-${pad} -${pad} ${totalW + pad * 2} ${amp * 2 + pad}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={coilPath(loops, width, amp)} />
    </svg>
  );
}

// ── Corner spiral ────────────────────────────────────────────────────────
function spiralPath(turns: number, gap: number): string {
  const steps = turns * 48;
  const total = turns * 2 * Math.PI;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * total;
    const r = gap * t;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M " + pts.join(" L ");
}

export function Spiral({
  turns = 2.4,
  className,
  ...props
}: { turns?: number } & SvgProps) {
  const gap = 3.2;
  const maxR = gap * turns * 2 * Math.PI;
  const pad = 4;
  return (
    <svg
      viewBox={`-${maxR + pad} -${maxR + pad} ${(maxR + pad) * 2} ${(maxR + pad) * 2}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={spiralPath(turns, gap)} />
    </svg>
  );
}

// ── Wobbly hand-drawn oval frame ─────────────────────────────────────────
export function OvalFrame({ className, ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* slightly irregular ellipse so it reads as hand-drawn, not machined */}
      <path d="M150 8 C 232 6 288 92 289 200 C 290 306 230 393 150 391 C 68 393 11 305 10 199 C 9 93 70 10 150 8 Z" />
    </svg>
  );
}

// ── Daisy (filled) ───────────────────────────────────────────────────────
export function Daisy({
  petals = 9,
  className,
  petalColor = "#ffffff",
  centerColor = "var(--color-daisy)",
  stroke = "var(--color-ink)",
  ...props
}: {
  petals?: number;
  petalColor?: string;
  centerColor?: string;
  stroke?: string;
} & SvgProps) {
  const petalEls = Array.from({ length: petals }, (_, i) => {
    const angle = (i / petals) * 360;
    return (
      <ellipse
        key={i}
        cx="50"
        cy="24"
        rx="7.5"
        ry="18"
        fill={petalColor}
        stroke={stroke}
        strokeWidth={1.6}
        transform={`rotate(${angle} 50 50)`}
      />
    );
  });
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {petalEls}
      <circle
        cx="50"
        cy="50"
        r="12"
        fill={centerColor}
        stroke={stroke}
        strokeWidth={1.6}
      />
    </svg>
  );
}

// ── Daisy (line-art only) — matches the black-ink save-the-date style ─────
export function DaisyLine({ className, ...props }: SvgProps) {
  return (
    <Daisy
      petalColor="none"
      centerColor="none"
      stroke="currentColor"
      className={className}
      {...props}
    />
  );
}
