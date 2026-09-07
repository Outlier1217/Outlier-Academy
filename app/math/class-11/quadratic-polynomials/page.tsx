"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuadraticDiagram3D, { QuadraticVariant } from "@/components/quadratic/QuadraticDiagram3D";

const VARIANTS: QuadraticVariant[] = ["shape", "vertex", "roots", "y-intercept", "sum-product", "sign"];

export default function QuadraticPolynomialsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs text-muted">Math / Class XI</p>
        <h1 className="mt-2 font-serif text-3xl text-paper">Graph of a Quadratic Polynomial</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          y = ax² + bx + c always draws a parabola — every fact you learn
          about roots, vertices and signs is really a fact about this one
          curve. Change a, b and c below and watch each idea move with it.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {VARIANTS.map((v) => (
            <QuadraticDiagram3D key={v} variant={v} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}