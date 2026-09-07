"use client";

import { useMemo, useState } from "react";
import ArgandScene from "./ArgandScene";
import SimulatorCard, { NumberField, ReadoutLine, HintLine } from "./SimulatorCard";
import { addRect, formatComplex, multiplyRect, normalizeDeg, rectToPolar } from "@/lib/complexMath";

export type ArgandVariant = "modulus" | "argument" | "conjugate" | "negative" | "addition" | "multiplication";

const RANGE = 6;
const TEAL = "#4FD1C5";
const AMBER = "#E8B84B";
const SKY = "#7DD3FC";

const TITLES: Record<ArgandVariant, { title: string; formula: string; note: string }> = {
  modulus: {
    title: "1. Modulus of a complex number",
    formula: "|z| = √(a² + b²)",
    note: "The modulus is just the length of the vector from the origin to z — the pillar rising in the third dimension shows that length as a literal height.",
  },
  argument: {
    title: "2. Argument of a complex number",
    formula: "arg(z) = tan⁻¹(b / a)",
    note: "The argument is the angle the vector makes with the positive real axis, measured the way a protractor would — counter-clockwise is positive.",
  },
  conjugate: {
    title: "3. Conjugate of a complex number",
    formula: "z̄ = a − bi",
    note: "Conjugation flips the sign of the imaginary part only — geometrically, it's a mirror reflection across the real axis.",
  },
  negative: {
    title: "4. Negative of a complex number",
    formula: "−z = −a − bi",
    note: "Negation flips both signs — geometrically, it's a point reflection through the origin, the vector now pointing the opposite way.",
  },
  addition: {
    title: "5. Addition of two complex numbers",
    formula: "z₁ + z₂",
    note: "Complex addition follows the parallelogram law: place z₂'s vector at the tip of z₁, and the sum is the vector to where you land.",
  },
  multiplication: {
    title: "6. Multiplication of two complex numbers",
    formula: "z₁ × z₂",
    note: "Multiplying complex numbers multiplies their moduli and adds their arguments — the product vector is both longer/shorter and rotated.",
  },
};

const needsTwo = (v: ArgandVariant) => v === "addition" || v === "multiplication";

export default function ArgandDiagram3D({ variant }: { variant: ArgandVariant }) {
  const [re1, setRe1] = useState("3");
  const [im1, setIm1] = useState("2");
  const [re2, setRe2] = useState("1");
  const [im2, setIm2] = useState("3");

  const a1 = Number(re1);
  const b1 = Number(im1);
  const a2 = Number(re2);
  const b2 = Number(im2);
  const valid1 = re1.trim() !== "" && im1.trim() !== "" && Number.isFinite(a1) && Number.isFinite(b1);
  const valid2 = re2.trim() !== "" && im2.trim() !== "" && Number.isFinite(a2) && Number.isFinite(b2);
  const two = needsTwo(variant);
  const valid = two ? valid1 && valid2 : valid1;

  const z1 = { re: a1, im: b1 };
  const z2 = { re: a2, im: b2 };
  const { r: r1, thetaDeg: theta1 } = useMemo(() => (valid1 ? rectToPolar(z1) : { r: 0, thetaDeg: 0 }), [valid1, a1, b1]);

  const { title, formula, note } = TITLES[variant];

  let vectors: { to: [number, number]; color: string; label?: string; guides?: boolean }[] = [];
  let guideLines: { from: [number, number]; to: [number, number]; color: string; dashed?: boolean }[] = [];
  let arc: { radius: number; fromDeg: number; toDeg: number; color: string; label?: string } | undefined;
  let pillar: { at: [number, number]; height: number; color: string; label?: string } | undefined;
  let readout: string[] = [];

  if (valid) {
    if (variant === "modulus") {
      vectors = [{ to: [a1, b1], color: TEAL, label: "z", guides: true }];
      pillar = { at: [a1, b1], height: r1, color: AMBER, label: `|z| = ${r1.toFixed(2)}` };
      readout = [`|z| = √(${a1}² + ${b1}²) = ${r1.toFixed(3)}`];
    } else if (variant === "argument") {
      const clean = normalizeDeg(theta1);
      vectors = [{ to: [a1, b1], color: TEAL, label: "z" }];
      arc = { radius: RANGE * 0.3, fromDeg: 0, toDeg: clean, color: AMBER, label: `${clean.toFixed(1)}°` };
      readout = [`arg(z) ≈ ${clean.toFixed(2)}° (${(clean * (Math.PI / 180)).toFixed(3)} rad)`];
    } else if (variant === "conjugate") {
      vectors = [
        { to: [a1, b1], color: TEAL, label: "z" },
        { to: [a1, -b1], color: AMBER, label: "z̄" },
      ];
      guideLines = [{ from: [a1, b1], to: [a1, -b1], color: "#8B93A1", dashed: true }];
      readout = [`z̄ = ${formatComplex({ re: a1, im: -b1 })}`];
    } else if (variant === "negative") {
      vectors = [
        { to: [a1, b1], color: TEAL, label: "z" },
        { to: [-a1, -b1], color: AMBER, label: "−z" },
      ];
      readout = [`−z = ${formatComplex({ re: -a1, im: -b1 })}`];
    } else if (variant === "addition") {
      const sum = addRect(z1, z2);
      vectors = [
        { to: [a1, b1], color: TEAL, label: "z₁" },
        { to: [a2, b2], color: SKY, label: "z₂" },
        { to: [sum.re, sum.im], color: AMBER, label: "z₁+z₂" },
      ];
      guideLines = [
        { from: [a1, b1], to: [sum.re, sum.im], color: "#8B93A1", dashed: true },
        { from: [a2, b2], to: [sum.re, sum.im], color: "#8B93A1", dashed: true },
      ];
      readout = [`z₁ + z₂ = ${formatComplex(sum)}`];
    } else if (variant === "multiplication") {
      const prod = multiplyRect(z1, z2);
      const { r: rp, thetaDeg: thetap } = rectToPolar(prod);
      vectors = [
        { to: [a1, b1], color: TEAL, label: "z₁" },
        { to: [a2, b2], color: SKY, label: "z₂" },
        { to: [prod.re, prod.im], color: AMBER, label: "z₁×z₂" },
      ];
      readout = [
        `z₁ × z₂ = ${formatComplex(prod)}`,
        `|z₁×z₂| = ${rp.toFixed(2)}, arg = ${normalizeDeg(thetap).toFixed(1)}°`,
      ];
    }
  }

  return (
    <SimulatorCard
      title={title}
      formula={formula}
      note={note}
      scene={<ArgandScene range={RANGE} vectors={vectors} guideLines={guideLines} arc={arc} pillar={pillar} />}
      sidebar={
        <>
          <NumberField label={two ? "Real part (z₁)" : "Real part (a)"} value={re1} onChange={setRe1} />
          <NumberField label={two ? "Imaginary part (z₁)" : "Imaginary part (b)"} value={im1} onChange={setIm1} />
          {two && (
            <>
              <NumberField label="Real part (z₂)" value={re2} onChange={setRe2} />
              <NumberField label="Imaginary part (z₂)" value={im2} onChange={setIm2} />
            </>
          )}
          {!valid && <HintLine>Type valid numbers to see the diagram.</HintLine>}
          {valid && readout.map((line, i) => <ReadoutLine key={i}>{line}</ReadoutLine>)}
          <HintLine>Drag to orbit the plane.</HintLine>
        </>
      }
    />
  );
}