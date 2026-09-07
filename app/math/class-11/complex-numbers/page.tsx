"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroComplexNumber from "@/components/complex/IntroComplexNumber";
import ArgandDiagram3D, { ArgandVariant } from "@/components/complex/ArgandDiagram3D";
import PolarDiagram3D, { PolarVariant } from "@/components/complex/PolarDiagram3D";

const ARGAND_VARIANTS: ArgandVariant[] = ["modulus", "argument", "conjugate", "negative", "addition", "multiplication"];
const POLAR_VARIANTS: PolarVariant[] = ["rect-to-polar", "plot", "euler", "multiply", "divide", "de-moivre"];

export default function ComplexNumbersPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs text-muted">Math / Class XI</p>
        <h1 className="mt-2 font-serif text-3xl text-paper">Complex Numbers</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          A complex number is a point on a plane, not a trick of algebra. Every
          diagram below is live — change the numbers and the geometry updates
          with it.
        </p>

        {/* Intro */}
        <section className="mt-10">
          <IntroComplexNumber />
        </section>

        {/* Argand diagrams */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl italic text-paper">Argand diagram</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The Argand plane is where a complex number's geometry actually
            lives — its size, its direction, and how it behaves when combined
            with another complex number.
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {ARGAND_VARIANTS.map((v) => (
              <ArgandDiagram3D key={v} variant={v} />
            ))}
          </div>
        </section>

        {/* Polar form diagrams */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl italic text-paper">Polar form</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The same complex number, described by a radius and an angle
            instead of two coordinates — this is where multiplication,
            division and powers stop being algebra and start being geometry.
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {POLAR_VARIANTS.map((v) => (
              <PolarDiagram3D key={v} variant={v} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}