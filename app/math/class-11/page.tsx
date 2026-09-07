import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CHAPTERS = [
  {
    name: "Relations and Functions",
    href: "/math/class-11/relations-and-functions",
    live: true,
    blurb: "One-one, onto and bijective mappings — as a machine you feed numbers into.",
  },
  { name: "Trigonometric Functions", href: "#", live: false, blurb: "" },
  {
  name: "Complex Numbers",
  href: "/math/class-11/complex-numbers",
  live: true,
  blurb: "Argand diagrams and polar form, with every diagram driven by numbers you type in.",
},
  { name: "Linear Inequalities", href: "#", live: false, blurb: "" },
  { name: "Permutations and Combinations", href: "#", live: false, blurb: "" },
  { name: "Sequences and Series", href: "#", live: false, blurb: "" },
];

export default function ClassXIPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs text-muted">Math / Class XI</p>
        <h1 className="mt-2 font-serif text-3xl text-paper">Chapters</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          One chapter is live right now. The rest follow the same simulation-first approach.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CHAPTERS.map((c) => {
            const card = (
              <div
                className={`h-full rounded-lg border p-5 transition-colors ${
                  c.live
                    ? "border-border bg-surface hover:border-amber"
                    : "border-border/60 bg-surface/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-serif text-lg ${c.live ? "text-paper" : "text-muted"}`}>
                    {c.name}
                  </span>
                  {!c.live && (
                    <span className="rounded-full border border-border bg-surface2 px-2 py-0.5 text-[10px] text-muted">
                      Soon
                    </span>
                  )}
                </div>
                {c.blurb && <p className="mt-2 text-sm text-muted">{c.blurb}</p>}
              </div>
            );
            return c.live ? (
              <Link key={c.name} href={c.href}>
                {card}
              </Link>
            ) : (
              <div key={c.name} aria-disabled="true">
                {card}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
