"use client";

import { useMemo, useState } from "react";
import ArgandScene from "./ArgandScene";
import SimulatorCard, { NumberField, ReadoutLine, HintLine } from "./SimulatorCard";
import { formatComplex, normalizeDeg, polarToRect, rectToPolar } from "@/lib/complexMath";

export type PolarVariant = "rect-to-polar" | "plot" | "euler" | "multiply" | "divide" | "de-moivre";

const RANGE = 6;
const TEAL = "#4FD1C5";
const AMBER = "#E8B84B";
const SKY = "#7DD3FC";

const TITLES: Record<PolarVariant, { title: string; formula: string; note: string }> = {
  "rect-to-polar": {
    title: "1. Rectangular to polar form",
    formula: "z = a + bi  →  (r, θ)",
    note: "Any point you can plot as (a, b) can equally be described by how far it is from the origin and at what angle — that's all polar form is.",
  },
  plot: {
    title: "2. Plotting from polar form",
    formula: "z = r(cos θ + i sin θ)",
    note: "Given a radius and an angle instead, walk that far along that direction from the origin — the dashed circle shows every point that shares this radius.",
  },
  euler: {
    title: "3. Euler's exponential form",
    formula: "z = r·e^(iθ)",
    note: "e^(iθ) is just a name for 'rotate to angle θ on the unit direction' — multiplying by r stretches that rotated direction out to length r. As θ sweeps a full turn, z traces the whole circle.",
  },
  multiply: {
    title: "4. Multiplying in polar form",
    formula: "z₁z₂ = r₁r₂ · (cos(θ₁+θ₂) + i sin(θ₁+θ₂))",
    note: "In polar form, multiplication is simple bookkeeping: multiply the radii, add the angles. No expansion needed.",
  },
  divide: {
    title: "5. Dividing in polar form",
    formula: "z₁/z₂ = (r₁/r₂) · (cos(θ₁−θ₂) + i sin(θ₁−θ₂))",
    note: "Division mirrors multiplication: divide the radii, subtract the angles.",
  },
  "de-moivre": {
    title: "6. De Moivre's theorem",
    formula: "zⁿ = rⁿ(cos nθ + i sin nθ)",
    note: "Raising z to a power scales the radius by that power and multiplies the angle by it — repeated rotation and repeated stretching, done in one step.",
  },
};

const needsTwo = (v: PolarVariant) => v === "multiply" || v === "divide";
const needsPower = (v: PolarVariant) => v === "de-moivre";
const startsFromRect = (v: PolarVariant) => v === "rect-to-polar";

export default function PolarDiagram3D({ variant }: { variant: PolarVariant }) {
  const [re, setRe] = useState("3");
  const [im, setIm] = useState("3");
  const [r1, setR1] = useState("3");
  const [theta1, setTheta1] = useState("45");
  const [r2, setR2] = useState("2");
  const [theta2, setTheta2] = useState("30");
  const [n, setN] = useState("3");

  const { title, formula, note } = TITLES[variant];
  const two = needsTwo(variant);
  const power = needsPower(variant);
  const fromRect = startsFromRect(variant);

  const reN = Number(re);
  const imN = Number(im);
  const r1N = Number(r1);
  const t1N = Number(theta1);
  const r2N = Number(r2);
  const t2N = Number(theta2);
  const nN = Number(n);

  const validRect = re.trim() !== "" && im.trim() !== "" && Number.isFinite(reN) && Number.isFinite(imN);
  const validR1 = r1.trim() !== "" && theta1.trim() !== "" && Number.isFinite(r1N) && Number.isFinite(t1N);
  const validR2 = r2.trim() !== "" && theta2.trim() !== "" && Number.isFinite(r2N) && Number.isFinite(t2N);
  const validN = !power || (n.trim() !== "" && Number.isFinite(nN));

  const baseValid = fromRect ? validRect : validR1 && (!two || validR2) && validN;

  // domain guard specific to division: r2 = 0 means dividing by the complex number 0
  const divisionError = variant === "divide" && validR2 && r2N === 0;
  const valid = baseValid && !divisionError;

  const scene = useMemo(() => {
    if (!valid) return { vectors: [] as any[], arc: undefined as any, circle: undefined as any };

    if (fromRect) {
      const { r, thetaDeg } = rectToPolar({ re: reN, im: imN });
      const clean = normalizeDeg(thetaDeg);
      return {
        vectors: [{ to: [reN, imN] as [number, number], color: TEAL, label: "z", guides: true }],
        arc: { radius: RANGE * 0.3, fromDeg: 0, toDeg: clean, color: AMBER, label: `${clean.toFixed(1)}°` },
        circle: undefined,
      };
    }

    if (variant === "plot" || variant === "euler") {
      const p = polarToRect({ r: r1N, thetaDeg: t1N });
      return {
        vectors: [{ to: [p.re, p.im] as [number, number], color: TEAL, label: "z" }],
        arc: { radius: RANGE * 0.3, fromDeg: 0, toDeg: t1N, color: AMBER, label: `${t1N.toFixed(1)}°` },
        circle: variant === "euler" ? { radius: r1N, color: "#2A323D" } : undefined,
      };
    }

    if (variant === "multiply" || variant === "divide") {
      const z1 = polarToRect({ r: r1N, thetaDeg: t1N });
      const z2 = polarToRect({ r: r2N, thetaDeg: t2N });
      const resultR = variant === "multiply" ? r1N * r2N : r1N / r2N;
      const resultTheta = variant === "multiply" ? t1N + t2N : t1N - t2N;
      const result = polarToRect({ r: resultR, thetaDeg: resultTheta });
      return {
        vectors: [
          { to: [z1.re, z1.im] as [number, number], color: TEAL, label: "z₁" },
          { to: [z2.re, z2.im] as [number, number], color: SKY, label: "z₂" },
          { to: [result.re, result.im] as [number, number], color: AMBER, label: "result" },
        ],
        arc: undefined,
        circle: undefined,
      };
    }

    // de-moivre
    const z = polarToRect({ r: r1N, thetaDeg: t1N });
    const resultR = Math.pow(r1N, nN);
    const resultTheta = t1N * nN;
    const result = polarToRect({ r: resultR, thetaDeg: resultTheta });
    return {
      vectors: [
        { to: [z.re, z.im] as [number, number], color: TEAL, label: "z" },
        { to: [result.re, result.im] as [number, number], color: AMBER, label: "zⁿ" },
      ],
      arc: undefined,
      circle: undefined,
    };
  }, [valid, fromRect, variant, reN, imN, r1N, t1N, r2N, t2N, nN]);

  let readout: string[] = [];
  if (valid) {
    if (fromRect) {
      const { r, thetaDeg } = rectToPolar({ re: reN, im: imN });
      readout = [`r = ${r.toFixed(3)}, θ ≈ ${normalizeDeg(thetaDeg).toFixed(2)}°`];
    } else if (variant === "plot" || variant === "euler") {
      const p = polarToRect({ r: r1N, thetaDeg: t1N });
      readout = [`z = ${formatComplex(p)}`];
    } else if (variant === "multiply") {
      readout = [`r₁r₂ = ${(r1N * r2N).toFixed(3)}`, `θ₁+θ₂ = ${normalizeDeg(t1N + t2N).toFixed(2)}°`];
    } else if (variant === "divide") {
      readout = [`r₁/r₂ = ${(r1N / r2N).toFixed(3)}`, `θ₁−θ₂ = ${normalizeDeg(t1N - t2N).toFixed(2)}°`];
    } else if (variant === "de-moivre") {
      readout = [`rⁿ = ${Math.pow(r1N, nN).toFixed(3)}`, `nθ = ${normalizeDeg(t1N * nN).toFixed(2)}°`];
    }
  }

  return (
    <SimulatorCard
      title={title}
      formula={formula}
      note={note}
      scene={<ArgandScene range={RANGE} vectors={scene.vectors} arc={scene.arc} circle={scene.circle} />}
      sidebar={
        <>
          {fromRect ? (
            <>
              <NumberField label="Real part (a)" value={re} onChange={setRe} />
              <NumberField label="Imaginary part (b)" value={im} onChange={setIm} />
            </>
          ) : (
            <>
              <NumberField label={two || power ? "Radius (r₁)" : "Radius (r)"} value={r1} onChange={setR1} />
              <NumberField label={two || power ? "Angle in degrees (θ₁)" : "Angle in degrees (θ)"} value={theta1} onChange={setTheta1} />
              {two && (
                <>
                  <NumberField label="Radius (r₂)" value={r2} onChange={setR2} />
                  <NumberField label="Angle in degrees (θ₂)" value={theta2} onChange={setTheta2} />
                </>
              )}
              {power && <NumberField label="Power (n)" value={n} onChange={setN} />}
            </>
          )}

          {divisionError && (
            <div className="rounded-md border border-error/50 bg-error/10 px-3 py-2 text-sm text-error">
              r₂ = 0 means dividing by the complex number 0 — that's undefined, so nothing plots.
            </div>
          )}
          {!valid && !divisionError && <HintLine>Type valid numbers to see the diagram.</HintLine>}
          {valid && readout.map((line, i) => <ReadoutLine key={i}>{line}</ReadoutLine>)}
          <HintLine>Drag to orbit the plane.</HintLine>
        </>
      }
    />
  );
}