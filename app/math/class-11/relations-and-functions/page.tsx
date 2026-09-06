import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FunctionSimulator3D from "@/components/FunctionSimulator3D";

export default function RelationsAndFunctionsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="font-mono text-xs text-muted">Math / Class XI</p>
        <h1 className="mt-2 font-serif text-3xl text-paper">Relations and Functions</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          A function is a machine: every input from its domain produces exactly
          one output. Whether that machine is one-one, onto, both or neither
          depends only on how inputs and outputs are matched up — not on how
          complicated the rule looks. Type a number into each simulator below
          and watch what the machine does with it.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          <section>
            <h2 className="font-serif text-xl text-paper">1. One-one, not onto</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              A function is <span className="text-paper">one-one (injective)</span> when
              no two different inputs ever share the same output. Here, every
              input to the left of another gives a strictly smaller output, so
              two inputs never collide — the horizontal test line below will
              always cross the curve at one point at most. But the outputs
              never go negative, so if the codomain is declared as all real
              numbers, this function is not onto.
            </p>
            <div className="mt-4">
              <FunctionSimulator3D
                title="One-one function"
                equationLabel="f(x) = √(x − 1)"
                fn={(x) => Math.sqrt(x - 1)}
                domainCheck={(x) => x >= 1}
                domainDescription="x ≥ 1"
                codomainDescription="all real numbers (R)"
                xMin={-2}
                xMax={10}
                yMin={-1}
                yMax={4}
                accent="#4FD1C5"
                defaultInput={5}
                showHorizontalLineTest
              />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-paper">2. Onto, not one-one</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              A function is <span className="text-paper">onto (surjective)</span> when
              every value in the codomain is actually hit by some input. Here
              the codomain is declared as [0, ∞), and squaring every real
              number does cover all of it — but it covers most of it twice:
              x and −x always give the same output, so the horizontal test
              line meets the curve at two points for any positive output.
            </p>
            <div className="mt-4">
              <FunctionSimulator3D
                title="Onto function"
                equationLabel="f(x) = x²"
                fn={(x) => x * x}
                domainCheck={() => true}
                domainDescription="all real numbers (R)"
                codomainDescription="[0, ∞)"
                xMin={-4}
                xMax={4}
                yMin={0}
                yMax={9}
                accent="#E8B84B"
                defaultInput={-2}
                showHorizontalLineTest
              />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-paper">3. One-one and onto (bijective)</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              A <span className="text-paper">bijective</span> function is both at
              once: every output belongs to exactly one input. A straight
              line with non-zero slope, defined on all of R with codomain R,
              always does this — the horizontal test line meets the curve at
              exactly one point, for every possible height you place it at.
            </p>
            <div className="mt-4">
              <FunctionSimulator3D
                title="Bijective function"
                equationLabel="f(x) = 2x + 3"
                fn={(x) => 2 * x + 3}
                domainCheck={() => true}
                domainDescription="all real numbers (R)"
                codomainDescription="all real numbers (R)"
                xMin={-5}
                xMax={5}
                yMin={-7}
                yMax={13}
                accent="#7DD3FC"
                defaultInput={2}
                showHorizontalLineTest
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
