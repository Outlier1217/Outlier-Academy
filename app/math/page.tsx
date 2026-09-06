import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CLASSES = [
  { name: "Class X", href: "#", live: false },
  { name: "Class XI", href: "/math/class-11", live: true },
  { name: "Class XII", href: "#", live: false },
];

export default function MathPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs text-muted">Math</p>
        <h1 className="mt-2 font-serif text-3xl text-paper">Pick a class</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          Every simulation here is tied to an NCERT class syllabus. Class XI is
          live first, starting with relations and functions.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {CLASSES.map((c) => {
            const card = (
              <div
                className={`rounded-lg border p-6 text-center transition-colors ${
                  c.live
                    ? "border-border bg-surface hover:border-amber"
                    : "border-border/60 bg-surface/40"
                }`}
              >
                <span className={`font-serif text-xl ${c.live ? "text-paper" : "text-muted"}`}>
                  {c.name}
                </span>
                {!c.live && (
                  <p className="mt-2 text-[11px] text-muted">Coming soon</p>
                )}
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
