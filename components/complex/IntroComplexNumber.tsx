"use client";

import { useMemo, useState } from "react";
import ArgandScene from "./ArgandScene";
import SimulatorCard, { NumberField, ReadoutLine, HintLine } from "./SimulatorCard";
import { formatComplex, rectToPolar } from "@/lib/complexMath";

const RANGE = 6;

export default function IntroComplexNumber() {
  const [re, setRe] = useState("3");
  const [im, setIm] = useState("4");

  const reN = Number(re);
  const imN = Number(im);
  const valid = re.trim() !== "" && im.trim() !== "" && Number.isFinite(reN) && Number.isFinite(imN);

  const { r, thetaDeg } = useMemo(
    () => (valid ? rectToPolar({ re: reN, im: imN }) : { r: 0, thetaDeg: 0 }),
    [valid, reN, imN]
  );

  return (
    <SimulatorCard
      title="A complex number is just a point"
      formula="z = a + bi"
      note="Every complex number is a pair of real numbers plotted on a plane — the real part sideways, the imaginary part upward. Nothing more mysterious than an (x, y) point."
      scene={
        <ArgandScene
          range={RANGE}
          vectors={valid ? [{ to: [reN, imN], color: "#4FD1C5", label: "z", guides: true }] : []}
        />
      }
      sidebar={
        <>
          <NumberField label="Real part (a)" value={re} onChange={setRe} />
          <NumberField label="Imaginary part (b)" value={im} onChange={setIm} />
          {valid ? (
            <>
              <ReadoutLine>z = {formatComplex({ re: reN, im: imN })}</ReadoutLine>
              <HintLine>
                |z| = {r.toFixed(3)}, arg(z) ≈ {thetaDeg.toFixed(1)}°
              </HintLine>
            </>
          ) : (
            <HintLine>Type both parts to plot z.</HintLine>
          )}
          <HintLine>Drag to orbit the plane.</HintLine>
        </>
      }
    />
  );
}