import Image from "next/image";
import Nav from "@/components/Nav";
import { Squiggle } from "@/components/Doodles";

/* ── Small building blocks ──────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-10 text-center">
      <div className="mb-8 flex justify-center text-sage/80">
        <Squiggle loops={16} className="h-7 w-[22rem] sm:w-[44rem]" />
      </div>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="label-caps text-2xl text-sage sm:text-3xl">{title}</h2>
    </div>
  );
}

// Pill link used for recommendation lists (hotels, things to do).
// `onGreen` gives a white fill so it pops on green sections; default is a green
// fill for white sections.
function Pill({
  href,
  label,
  onGreen = false,
}: {
  href: string;
  label: string;
  onGreen?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label-caps rounded-full border border-sage bg-white px-5 py-3 text-[0.82rem] text-sage transition-colors hover:bg-sage hover:text-white"
    >
      {label}
    </a>
  );
}

// Google-search link for a recommendation (reliable; swap for a direct URL anytime)
function searchLink(q: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

// Hand-drawn loop-de-loop divider between schedule events (from the save-the-date)
function SquiggleDivider({ small = false }: { small?: boolean }) {
  return (
    <div className="my-10 flex justify-center text-sage">
      <Squiggle
        loops={small ? 3 : 6}
        className={small ? "h-5 w-24" : "h-6 w-56"}
      />
    </div>
  );
}

// Hotel recommendations, grouped by town (closest to the venues first)
const STAYS = [
  {
    area: "St. Helena",
    hotels: [
      "Southbridge",
      "Meadowood",
      "Harvest Inn",
      "Alila Napa Valley",
      "Inn St. Helena",
      "Le Petit Pali",
    ],
  },
  { area: "Rutherford", hotels: ["Auberge du Soleil", "Rancho Caymus Inn"] },
  {
    area: "Yountville",
    hotels: ["Estate Yountville", "Hotel Yountville", "Sttupa Estate"],
  },
  {
    area: "Calistoga",
    hotels: [
      "Four Seasons",
      "Solage",
      "Indian Springs",
      "Calistoga Motor Lodge",
      "Dr. Wilkinson's",
    ],
  },
  {
    area: "Downtown Napa",
    hotels: ["Hotel Indigo Napa Valley", "Hampton Inn & Suites", "Airbnb"],
  },
];

// Direct official-site links per hotel (any not listed fall back to a search)
const STAY_LINKS: Record<string, string> = {
  // St. Helena
  "Alila Napa Valley": "https://www.alilahotels.com/napa-valley/",
  "Harvest Inn": "https://www.harvestinn.com/",
  "Inn St. Helena": "https://innsthelena.com/",
  "Le Petit Pali":
    "https://be.synxis.com/?chain=5154&hotel=95183&level=hotel&locale=en-US",
  Meadowood: "https://meadowood.com/",
  Southbridge: "https://www.southbridgenapavalley.com/",
  // Rutherford
  "Auberge du Soleil": "https://auberge.com/auberge-du-soleil/",
  "Rancho Caymus Inn": "https://www.ranchocaymusinn.com/",
  // Yountville
  "Estate Yountville": "https://www.theestateyountville.com/",
  "Hotel Yountville": "https://www.hotelyountville.com/",
  "Sttupa Estate": "https://sttupaestate.com/",
  // Calistoga
  "Calistoga Motor Lodge": "https://calistogamotorlodgeandspa.com/",
  "Dr. Wilkinson's": "https://www.drwilkinson.com/",
  "Four Seasons": "https://www.fourseasons.com/napavalley/",
  "Indian Springs": "https://www.indianspringscalistoga.com/",
  Solage: "https://auberge.com/solage/",
  // Downtown Napa
  "Hotel Indigo Napa Valley": "https://www.hotelindigonapa.com/",
  "Hampton Inn & Suites":
    "https://www.hilton.com/en/hotels/apcighx-hampton-suites-napa/",
  Airbnb: "https://www.airbnb.com/s/Napa-Valley--California/homes",
};

// Things to do, grouped by category
const THINGS = [
  {
    area: "Eats",
    items: [
      "Oakville Grocery",
      "Farmstead at Long Meadow Ranch",
      "Sam's General Store",
      "Model Bakery",
      "Ray-Ray's Tacos",
      "Mercato del Gusto",
      "Bouchon Bakery Yountville",
      "Sam's Social Club Calistoga",
    ],
  },
  {
    area: "Tasting",
    items: ["Wine Tours & Tastings", "Frog's Leap", "Nickel & Nickel"],
  },
  {
    area: "Explore",
    items: [
      "Hiking",
      "Petrified Forest",
      "Bike the Silverado Trail",
      "Napa Valley Wine Train",
    ],
  },
];

// Direct links for specific things to do (others fall back to a search)
const THING_LINKS: Record<string, string> = {
  "Wine Tours & Tastings": "https://www.visitnapavalley.com/wineries/",
  "Frog's Leap": "https://www.frogsleap.com/",
  "Nickel & Nickel": "https://nickelandnickel.com/",
  Hiking: "https://www.alltrails.com/us/california/st-helena--2",
};

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Nav />

      {/* ══ HERO — big names + squiggles on green (à la Abigail & Samuel) ══ */}
      <section
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sage px-4 py-20"
      >
        <div className="relative mx-auto w-full max-w-7xl">
          {/* Ornamental save-the-date frame — only wide enough screens show it */}
          <Image
            src="/std-frame-cream.png"
            alt="Madeleine and Brian — save the date — June 5, 2027, Napa Valley"
            width={1582}
            height={853}
            priority
            className="hidden h-auto w-full lg:block"
          />
          {/* Names: centered over the frame on lg+, a clean scaled banner below lg */}
          <div className="flex flex-col items-center justify-center py-10 text-center lg:absolute lg:inset-0 lg:py-0">
            <h1 className="display-caps text-[clamp(1.75rem,9vw,5.5rem)] leading-[1.12] text-ivory lg:text-7xl xl:text-8xl">
              Madeleine
              <span className="my-1 block text-[clamp(1rem,4vw,3rem)] font-light lg:text-4xl xl:text-5xl">
                &amp;
              </span>
              Brian
            </h1>
            <p className="label-caps mt-7 text-[clamp(0.6rem,2.8vw,1rem)] text-ivory/80 lg:absolute lg:inset-x-0 lg:bottom-[22%] lg:mt-0 lg:text-sm xl:text-base">
              June 5, 2027&nbsp;&nbsp;·&nbsp;&nbsp;Napa Valley
            </p>
          </div>
        </div>
      </section>

      {/* ══ BLACK & WHITE PHOTO ═══════════════════════════════════════════ */}
      <section className="section px-6">
        <p className="label-caps mb-6 text-center text-2xl text-sage sm:mb-7 sm:text-3xl">
          We&rsquo;re getting married!
        </p>
        <figure className="mx-auto max-w-3xl">
          <div className="overflow-hidden">
            <Image
              src="/photos/ring-reveal.jpeg"
              alt="Madeleine and Brian on a snowy mountain summit the day they got engaged"
              width={1086}
              height={724}
              className="w-full grayscale"
            />
          </div>
        </figure>
      </section>

      {/* ══ SCHEDULE ══════════════════════════════════════════════════════ */}
      <section id="schedule" className="section">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading title="Weekend Schedule" />

          <p className="mx-auto mb-10 max-w-xl text-center text-xl leading-relaxed text-sage">
            We&rsquo;re so excited to celebrate with you! We&rsquo;re still
            planning, but here&rsquo;s what we know so far.
          </p>

          <div>
            <SquiggleDivider />
            {/* Friday — Welcome Party */}
            <article className="text-center">
              <p className="label-caps text-base text-sage/80">
                Friday · June 4, 2027
              </p>
              <h3 className="label-caps mt-3 text-lg text-sage sm:text-xl">
                Welcome Dinner
              </h3>
              <p className="mt-2 text-base text-sage/80">6:00 &ndash; 9:00 PM</p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                Join us for dinner, drinks, and soft serve as we kick off the
                wedding weekend!
              </p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                Sundresses, jean jackets, button-downs, and khakis. Leave the
                blazers and ties on the East Coast &mdash; looking at you, Tim
                Mayhew!
              </p>
              <div className="mx-auto mt-6 max-w-xl">
                <Image
                  src="/photos/gotts-green.png"
                  alt="Hand-drawn illustration of Gott's Roadside in St. Helena, California"
                  width={1034}
                  height={484}
                  className="w-full"
                />
              </div>
              <p className="mt-6 text-lg font-medium text-sage">Gott&rsquo;s Roadside</p>
              <p className="text-lg">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gott%27s+Roadside+933+Main+St+St+Helena+CA+94574"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage underline decoration-sage/25 underline-offset-4 transition hover:text-sage hover:decoration-sage"
                >
                  933 Main St #29, St. Helena, CA 94574
                </a>
              </p>
            </article>

            <SquiggleDivider />
            {/* Saturday — The Wedding */}
            <article className="text-center">
              <p className="label-caps text-base text-sage/80">
                Saturday · June 5, 2027
              </p>
              <h3 className="label-caps mt-3 text-lg text-sage sm:text-xl">
                The Wedding
              </h3>
              <p className="mt-2 text-base text-sage/80">3:30 &ndash; 10:00 PM</p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                Ceremony followed by cocktails, dinner, and dancing.
              </p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                Black tie
              </p>

              <div className="mx-auto mt-6 max-w-lg">
                <Image
                  src="/photos/beaulieu-green.png"
                  alt="Hand-drawn illustration of Beaulieu Garden in Rutherford, California"
                  width={1318}
                  height={809}
                  className="w-full"
                />
              </div>

              <p className="mt-6 text-lg font-medium text-sage">Beaulieu Garden</p>
              <p className="text-lg">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Beaulieu+Garden+1901+St+Helena+Hwy+Rutherford+CA+94573"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage underline decoration-sage/25 underline-offset-4 transition hover:text-sage hover:decoration-sage"
                >
                  1901 St. Helena Hwy, Rutherford, CA 94573
                </a>
              </p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                The venue doesn&rsquo;t allow cars or rideshares, so we&rsquo;ll
                provide transportation to and from &mdash; details to follow.
              </p>
            </article>

            <SquiggleDivider small />
            {/* After Party — same night, set off with a shorter squiggle */}
            <article className="text-center">
              <h3 className="label-caps text-lg text-sage sm:text-xl">After Party</h3>
              <p className="mt-2 text-base text-sage/80">10:00 PM until late</p>
              <p className="mx-auto mt-4 max-w-md text-lg text-sage">
                Keep the celebration going.
              </p>
              <p className="mt-6 text-lg font-medium text-sage">
                Location TBD, but likely in St. Helena
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ══ TRAVEL & STAY ═════════════════════════════════════════════════ */}
      <section id="travel" className="section">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading title="Travel & Stay" />

          <h3 className="label-caps text-lg text-sage sm:text-xl">
            Getting There
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sage">
            Fly into SFO (San Francisco) or OAK (Oakland), both approximately an
            hour and fifteen minutes away; SMF (Sacramento), about an hour away;
            or STS (Sonoma County), the closest and smallest airport.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sage">
            Rideshare is available throughout the valley. Renting a car can be
            nice for guests who would like to explore, but it is not essential.
          </p>

          <h3 className="label-caps mt-12 text-lg text-sage sm:text-xl">
            Where to Stay
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sage">
            Napa Valley has no shortage of beautiful places to stay. Below are
            several recommended options across the valley, organized by town.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sage">
            Downtown Napa generally offers the most affordable accommodations,
            along with a wider selection of Airbnbs. It is approximately
            20&ndash;25 minutes from both Friday&rsquo;s Welcome Dinner and the
            wedding venue.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-sage">
            While we&rsquo;re still finalizing details, shuttles will likely be
            centered in St. Helena. We&rsquo;ll update this page once the schedule
            is confirmed.
          </p>

          {STAYS.map((group) => (
            <div key={group.area} className="mt-8">
              <p className="label-caps text-base font-semibold text-sage sm:text-lg">
                {group.area}
              </p>
              <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-3">
                {[...group.hotels]
                  .sort((a, b) => a.localeCompare(b))
                  .map((h) => (
                    <Pill
                      key={h}
                      href={STAY_LINKS[h] ?? searchLink(`${h} Napa Valley`)}
                      label={h}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THINGS TO DO ══════════════════════════════════════════════════ */}
      <section id="things" className="section">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeading title="Things to Do" />
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-sage">
            A few of our favorite spots around the valley &mdash; more to come.
          </p>

          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {THINGS.map((group) => (
              <div key={group.area}>
                <h3 className="label-caps text-lg text-sage sm:text-xl">
                  {group.area}
                </h3>
                <div className="mt-6 flex flex-col items-center gap-3">
                  {group.items.map((t) => (
                    <Pill
                      key={t}
                      href={THING_LINKS[t] ?? searchLink(`${t} Napa Valley`)}
                      label={t}
                      onGreen
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REGISTRY ══════════════════════════════════════════════════════ */}
      <section id="registry" className="section">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <SectionHeading title="Registry" />
          <p className="text-lg text-sage">
            Your presence in Napa is the greatest gift. For those who have asked,
            we&rsquo;ll add our registry here soon.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════ */}
      <footer className="relative py-16 text-center text-sage">
        <Squiggle loops={6} className="mx-auto h-7 w-64 text-sage" />
        <p className="display-caps mt-6 text-3xl sm:text-4xl">
          Madeleine &amp; Brian
        </p>
        <p className="label-caps mt-3 text-[0.7rem] text-sage">
          June 5, 2027 · Napa Valley
        </p>
        <p className="mt-6 text-sm text-sage">madeleineandbrian.com</p>
      </footer>
    </>
  );
}
