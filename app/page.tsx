import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    name: "Math",
    href: "/math",
    live: true,
    blurb: "Relations, functions, calculus — built as things you can drag, break and rebuild.",
  },
  { name: "Physics", href: "#", live: false, blurb: "Mechanics and waves, simulated from first principles." },
  { name: "Programming", href: "#", live: false, blurb: "Data structures and algorithms you can step through." },
  { name: "Finance", href: "#", live: false, blurb: "Interest, risk and markets, modeled instead of memorized." },
  { name: "Blogs", href: "#", live: false, blurb: "Notes from building this, in public." },
  { name: "Stories", href: "#", live: false, blurb: "The long way round — hackathons, failures, restarts." },
  { name: "Contact Us", href: "#", live: false, blurb: "Reach out with a question, a bug or an idea." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="max-w-lg font-serif text-4xl leading-[1.15] text-paper sm:text-5xl">
              Math stops being abstract once you can pull its levers yourself.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Outlier Academy turns syllabus topics into simulations you control —
              type a number, drag a point, watch the rule respond. Starting with
              relations and functions for Class XI, built in the open.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/math"
                className="rounded-md bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
              >
                Start with Math
              </Link>
              <a
                href="https://github.com/Outlier1217"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-muted transition-colors hover:text-paper"
              >
                View the code on GitHub
              </a>
            </div>
          </div>

          {/* Function-machine motif: the one deliberate visual moment on this page */}
          <div className="relative rounded-lg border border-border bg-surface p-8">
            <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="A function machine mapping an input to an output">
              <text x="10" y="30" className="fill-muted font-mono text-[11px]">x = 3</text>
              <circle cx="30" cy="55" r="14" fill="none" stroke="#4FD1C5" strokeWidth="2" />
              <text x="24" y="60" className="fill-teal font-mono text-[12px]">3</text>
              <line x1="46" y1="55" x2="110" y2="55" stroke="#2A323D" strokeWidth="2" markerEnd="url(#arrow)" />

              <rect x="112" y="30" width="96" height="50" rx="6" fill="#1B222B" stroke="#E8B84B" strokeWidth="1.5" />
              <text x="128" y="60" className="fill-amber font-mono text-[13px]">f(x)=2x+3</text>

              <line x1="210" y1="55" x2="274" y2="55" stroke="#2A323D" strokeWidth="2" markerEnd="url(#arrow)" />
              <circle cx="294" cy="55" r="14" fill="none" stroke="#4FD1C5" strokeWidth="2" />
              <text x="286" y="60" className="fill-teal font-mono text-[12px]">9</text>

              <text x="200" y="20" className="fill-muted font-mono text-[11px]">the rule</text>

              <line x1="20" y1="120" x2="300" y2="120" stroke="#2A323D" strokeWidth="1" />
              <text x="10" y="145" className="fill-muted text-[12px]">
                Domain: every input the rule is allowed to take.
              </text>
              <text x="10" y="168" className="fill-muted text-[12px]">
                Range: every output the rule can actually produce.
              </text>

              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#2A323D" />
                </marker>
              </defs>
            </svg>
          </div>
        </section>

        {/* Section grid */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="font-serif text-2xl italic text-paper">What's here</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((s) => {
              const content = (
                <div
                  className={`h-full rounded-lg border p-5 transition-colors ${
                    s.live
                      ? "border-border bg-surface hover:border-amber"
                      : "border-border/60 bg-surface/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-serif text-lg ${s.live ? "text-paper" : "text-muted"}`}>
                      {s.name}
                    </span>
                    {!s.live && (
                      <span className="rounded-full border border-border bg-surface2 px-2 py-0.5 text-[10px] text-muted">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted">{s.blurb}</p>
                </div>
              );

              return s.live ? (
                <Link key={s.name} href={s.href}>
                  {content}
                </Link>
              ) : (
                <div key={s.name} aria-disabled="true">
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
