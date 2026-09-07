"use client";

import { useMemo, useState } from "react";
import QuadraticScene, { CurvePoint, QuadPoint, SignSegment } from "./QuadraticScene";
import SimulatorCard, { NumberField, ReadoutLine, HintLine } from "@/components/complex/SimulatorCard";
import { discriminant, evaluate, productOfRoots, realRoots, sumOfRoots, vertex } from "@/lib/quadraticMath";

export type QuadraticVariant = "shape" | "vertex" | "roots" | "y-intercept" | "sum-product" | "sign";

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -8;
const Y_MAX = 8;

const TEAL = "#4FD1C5";
const AMBER = "#E8B84B";
const SKY = "#7DD3FC";
const ERR = "#E06C5C";

const TITLES: Record<QuadraticVariant, { title: string; formula: string; note: string }> = {
  shape: {
    title: "1. Shape of the curve",
    formula: "y = ax² + bx + c",
    note: "Every quadratic polynomial graphs as a parabola. The sign of a decides everything about which way it opens: positive a opens upward, negative a opens downward.",
  },
  vertex: {
    title: "2. Vertex and axis of symmetry",
    formula: "Vertex = (−b/2a, f(−b/2a))",
    note: "The vertex is the turning point of the parabola — a minimum when a > 0, a maximum when a < 0. The dashed line through it is the axis of symmetry: the graph is a mirror image on either side of it.",
  },
  roots: {
    title: "3. Roots (zeroes) of the polynomial",
    formula: "D = b² − 4ac",
    note: "The discriminant decides how many times the curve touches the x-axis: two crossings when D > 0, one touch when D = 0, and none at all when D < 0.",
  },
  "y-intercept": {
    title: "4. y-intercept",
    formula: "y-intercept = (0, c)",
    note: "Setting x = 0 kills the ax² and bx terms outright, so the curve always crosses the y-axis exactly at c — no calculation needed, just read it off the equation.",
  },
  "sum-product": {
    title: "5. Sum and product of roots",
    formula: "sum = −b/a,  product = c/a",
    note: "These two formulas connect the roots straight back to the coefficients, without ever solving the equation. They hold even when the roots aren't real.",
  },
  sign: {
    title: "6. Where the polynomial is positive or negative",
    formula: "sign of ax² + bx + c",
    note: "The roots split the x-axis into intervals. On each interval the polynomial keeps one constant sign — it can only change sign by crossing zero.",
  },
};

function sampleQuadratic(a: number, b: number, c: number): CurvePoint[] {
  const steps = 300;
  const pts: CurvePoint[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = X_MIN + ((X_MAX - X_MIN) * i) / steps;
    const y = a * x * x + b * x + c;
    // clip extreme y so a steep parabola doesn't dominate the view
    const clamped = Math.max(Y_MIN - 2, Math.min(Y_MAX + 2, y));
    pts.push([x, clamped, 0]);
  }
  return pts;
}

export default function QuadraticDiagram3D({ variant }: { variant: QuadraticVariant }) {
  const [aStr, setAStr] = useState("1");
  const [bStr, setBStr] = useState("-2");
  const [cStr, setCStr] = useState("-3");

  const a = Number(aStr);
  const b = Number(bStr);
  const c = Number(cStr);
  const numbersOk = [aStr, bStr, cStr].every((s) => s.trim() !== "") && [a, b, c].every(Number.isFinite);
  const isQuadratic = numbersOk && a !== 0;

  const { title, formula, note } = TITLES[variant];

  const curve = useMemo(() => (isQuadratic ? sampleQuadratic(a, b, c) : []), [isQuadratic, a, b, c]);

  const points: QuadPoint[] = [];
  const signSegments: SignSegment[] = [];
  let verticalLine: { x: number; color: string; label?: string } | undefined;
  const readout: string[] = [];

  if (isQuadratic) {
    const q = { a, b, c };
    const roots = realRoots(q);
    const D = discriminant(q);

    if (variant === "shape") {
      readout.push(a > 0 ? "a > 0 — the parabola opens upward" : "a < 0 — the parabola opens downward");
    }

    if (variant === "vertex") {
      const v = vertex(q);
      points.push({ at: [v.x, v.y], color: AMBER, label: "Vertex" });
      verticalLine = { x: v.x, color: AMBER, label: "axis of symmetry" };
      readout.push(`Vertex = (${v.x.toFixed(2)}, ${v.y.toFixed(2)})`);
      readout.push(a > 0 ? "This is a minimum (a > 0)." : "This is a maximum (a < 0).");
    }

    if (variant === "roots") {
      readout.push(`D = ${D.toFixed(2)}`);
      if (D > 0) {
        points.push({ at: [roots[0], 0], color: AMBER, label: `x = ${roots[0].toFixed(2)}` });
        points.push({ at: [roots[1], 0], color: AMBER, label: `x = ${roots[1].toFixed(2)}` });
        readout.push("D > 0 — two distinct real roots.");
      } else if (D === 0) {
        points.push({ at: [roots[0], 0], color: AMBER, label: `x = ${roots[0].toFixed(2)}` });
        readout.push("D = 0 — one repeated real root; the curve just touches the x-axis.");
      } else {
        readout.push("D < 0 — no real roots; the curve never touches the x-axis.");
      }
    }

    if (variant === "y-intercept") {
      points.push({ at: [0, c], color: SKY, label: `(0, ${c})` });
      readout.push(`y-intercept = (0, ${c})`);
    }

    if (variant === "sum-product") {
      const s = sumOfRoots(q);
      const p = productOfRoots(q);
      readout.push(`sum of roots = −b/a = ${s.toFixed(3)}`);
      readout.push(`product of roots = c/a = ${p.toFixed(3)}`);
      if (roots.length === 2) {
        points.push({ at: [roots[0], 0], color: AMBER, label: `x₁ = ${roots[0].toFixed(2)}` });
        points.push({ at: [roots[1], 0], color: AMBER, label: `x₂ = ${roots[1].toFixed(2)}` });
        readout.push(`Check: x₁ + x₂ = ${(roots[0] + roots[1]).toFixed(3)}, x₁·x₂ = ${(roots[0] * roots[1]).toFixed(3)}`);
      } else if (roots.length === 1) {
        points.push({ at: [roots[0], 0], color: AMBER, label: `x₁ = x₂ = ${roots[0].toFixed(2)}` });
      } else {
        readout.push("The roots here are complex, not real — nothing to mark on this graph, but the two formulas above still hold algebraically.");
      }
    }

    if (variant === "sign") {
      if (roots.length === 2) {
        const [r1, r2] = roots;
        const outsideColor = a > 0 ? TEAL : ERR;
        const insideColor = a > 0 ? ERR : TEAL;
        signSegments.push({ from: X_MIN, to: r1, color: outsideColor });
        signSegments.push({ from: r1, to: r2, color: insideColor });
        signSegments.push({ from: r2, to: X_MAX, color: outsideColor });
        points.push({ at: [r1, 0], color: SKY }, { at: [r2, 0], color: SKY });
        const posLabel = a > 0 ? `x < ${r1.toFixed(2)} or x > ${r2.toFixed(2)}` : `${r1.toFixed(2)} < x < ${r2.toFixed(2)}`;
        const negLabel = a > 0 ? `${r1.toFixed(2)} < x < ${r2.toFixed(2)}` : `x < ${r1.toFixed(2)} or x > ${r2.toFixed(2)}`;
        readout.push(`f(x) > 0 for ${posLabel}`);
        readout.push(`f(x) < 0 for ${negLabel}`);
      } else {
        const constColor = a > 0 ? TEAL : ERR;
        signSegments.push({ from: X_MIN, to: X_MAX, color: constColor });
        readout.push(a > 0 ? "f(x) ≥ 0 for every real x." : "f(x) ≤ 0 for every real x.");
      }
    }
  }

  return (
    <SimulatorCard
      title={title}
      formula={formula}
      note={note}
      scene={
        <QuadraticScene
          xMin={X_MIN}
          xMax={X_MAX}
          yMin={Y_MIN}
          yMax={Y_MAX}
          curve={curve}
          curveColor={TEAL}
          points={points}
          verticalLine={verticalLine}
          signSegments={signSegments}
        />
      }
      sidebar={
        <>
          <NumberField label="a (coefficient of x²)" value={aStr} onChange={setAStr} />
          <NumberField label="b (coefficient of x)" value={bStr} onChange={setBStr} />
          <NumberField label="c (constant term)" value={cStr} onChange={setCStr} />

          {numbersOk && !isQuadratic && (
            <div className="rounded-md border border-error/50 bg-error/10 px-3 py-2 text-sm text-error">
              a = 0 means this isn't a quadratic anymore — it's a straight line, so there's no parabola to draw.
            </div>
          )}
          {!numbersOk && <HintLine>Type all three coefficients to see the graph.</HintLine>}
          {isQuadratic && readout.map((line, i) => <ReadoutLine key={i}>{line}</ReadoutLine>)}
          <HintLine>Drag to orbit. Use the fullscreen icon for a bigger view.</HintLine>
        </>
      }
    />
  );
}