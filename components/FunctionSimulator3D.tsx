"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import FullscreenPanel from "@/components/FullscreenPanel";

export type FunctionSimulatorProps = {
  title: string;
  equationLabel: string;
  fn: (x: number) => number;
  domainCheck: (x: number) => boolean;
  domainDescription: string;
  codomainDescription: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  accent: string; // hex, used for the curve and valid-state marker
  defaultInput: number;
  /** When true, draws a horizontal test-line at the current output height so the
   *  student can see, by eye, how many domain points share that output. */
  showHorizontalLineTest?: boolean;
};

function sampleCurve(
  fn: (x: number) => number,
  domainCheck: (x: number) => boolean,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  steps = 400
) {
  // Group consecutive valid samples into segments, so gaps in the domain
  // (e.g. x < 1 for a square root) show up as real gaps in the curve.
  const segments: [number, number, number][][] = [];
  let current: [number, number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    if (domainCheck(x)) {
      const y = fn(x);
      if (Number.isFinite(y) && y >= yMin - (yMax - yMin) && y <= yMax + (yMax - yMin)) {
        current.push([x, y, 0]);
        continue;
      }
    }
    if (current.length > 1) segments.push(current);
    current = [];
  }
  if (current.length > 1) segments.push(current);
  return segments;
}

function Axes({ xMin, xMax, yMin, yMax }: { xMin: number; xMax: number; yMin: number; yMax: number }) {
  return (
    <group>
      <Line points={[[xMin, 0, 0], [xMax, 0, 0]]} color="#E06C5C" lineWidth={1.5} />
      <Line points={[[0, yMin, 0], [0, yMax, 0]]} color="#4FD1C5" lineWidth={1.5} />
      <Text position={[xMax + 0.4, 0, 0]} fontSize={0.4} color="#8B93A1">x</Text>
      <Text position={[0, yMax + 0.4, 0]} fontSize={0.4} color="#8B93A1">y</Text>
      {/* faint depth plane so the scene reads as genuinely 3D once orbited */}
      <mesh position={[0, (yMin + yMax) / 2, -0.02]} rotation={[0, 0, 0]}>
        <planeGeometry args={[xMax - xMin, yMax - yMin]} />
        <meshBasicMaterial color="#1B222B" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene(props: {
  segments: [number, number, number][][];
  point: { x: number; y: number; valid: boolean };
  accent: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  showHorizontalLineTest?: boolean;
}) {
  const { segments, point, accent, xMin, xMax, yMin, yMax, showHorizontalLineTest } = props;

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />
      <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />

      {segments.map((seg, i) => (
        <Line key={i} points={seg} color={accent} lineWidth={2.5} />
      ))}

      {point.valid && (
        <>
          <mesh position={[point.x, point.y, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
          </mesh>
          {/* dashed guide lines back to each axis, so domain/range read clearly */}
          <Line points={[[point.x, 0, 0], [point.x, point.y, 0]]} color="#8B93A1" dashed dashSize={0.15} gapSize={0.1} />
          <Line points={[[0, point.y, 0], [point.x, point.y, 0]]} color="#8B93A1" dashed dashSize={0.15} gapSize={0.1} />

          {showHorizontalLineTest && (
            <Line points={[[xMin, point.y, 0], [xMax, point.y, 0]]} color="#E8B84B" lineWidth={1.5} dashed dashSize={0.2} gapSize={0.12} />
          )}
        </>
      )}

      {!point.valid && (
        <mesh position={[Math.max(xMin, Math.min(xMax, point.x)), 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#E06C5C" />
        </mesh>
      )}

      <OrbitControls enablePan={false} minDistance={4} maxDistance={20} />
    </>
  );
}

/** Count, by sampling, how many domain points map to (approximately) the same
 *  output as the current input — a numeric stand-in for the horizontal line test. */
function countPreimages(
  fn: (x: number) => number,
  domainCheck: (x: number) => boolean,
  xMin: number,
  xMax: number,
  targetY: number,
  steps = 2000
) {
  let count = 0;
  let lastSign: number | null = null;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    if (!domainCheck(x)) {
      lastSign = null;
      continue;
    }
    const diff = fn(x) - targetY;
    const sign = diff === 0 ? 0 : diff > 0 ? 1 : -1;
    if (lastSign !== null && sign !== lastSign) count++;
    lastSign = sign;
  }
  return Math.max(count, 1);
}

export default function FunctionSimulator3D({
  title,
  equationLabel,
  fn,
  domainCheck,
  domainDescription,
  codomainDescription,
  xMin,
  xMax,
  yMin,
  yMax,
  accent,
  defaultInput,
  showHorizontalLineTest,
}: FunctionSimulatorProps) {
  const [raw, setRaw] = useState(String(defaultInput));

  const x = Number(raw);
  const isNumber = raw.trim() !== "" && Number.isFinite(x);
  const valid = isNumber && domainCheck(x);
  const y = valid ? fn(x) : NaN;

  const segments = useMemo(
    () => sampleCurve(fn, domainCheck, xMin, xMax, yMin, yMax),
    [fn, domainCheck, xMin, xMax, yMin, yMax]
  );

  const preimages = useMemo(
    () => (valid && showHorizontalLineTest ? countPreimages(fn, domainCheck, xMin, xMax, y) : null),
    [valid, showHorizontalLineTest, fn, domainCheck, xMin, xMax, y]
  );

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg text-paper">{title}</h3>
        <span className="font-mono text-sm text-amber">{equationLabel}</span>
      </div>

      <p className="mt-2 text-sm text-muted">
        Domain: {domainDescription} · Codomain: {codomainDescription}
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="h-72 overflow-hidden rounded-md border border-border/70 bg-ink sm:h-80">
<FullscreenPanel className="h-72 overflow-hidden rounded-md border border-border/70 bg-ink sm:h-80">
  <Canvas camera={{ position: [xMax * 0.9, yMax * 0.9, 8], fov: 45 }}>
    <Scene
      segments={segments}
      point={{ x: isNumber ? x : 0, y, valid }}
      accent={accent}
      xMin={xMin}
      xMax={xMax}
      yMin={yMin}
      yMax={yMax}
      showHorizontalLineTest={showHorizontalLineTest}
    />
  </Canvas>
</FullscreenPanel>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs text-muted" htmlFor={`${title}-input`}>
            Try an input value
          </label>
          <input
            id={`${title}-input`}
            type="number"
            step="any"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="rounded-md border border-border bg-surface2 px-3 py-2 font-mono text-sm text-paper outline-none focus-visible:border-teal"
            placeholder="x = ?"
          />

          {!isNumber && (
            <p className="text-sm text-muted">Type a number to test it against the domain.</p>
          )}

          {isNumber && !valid && (
            <div className="rounded-md border border-error/50 bg-error/10 px-3 py-2 text-sm text-error">
              x = {x} is outside the domain ({domainDescription}). The function has no output
              to give here — that's why nothing plots on the curve.
            </div>
          )}

          {valid && (
            <div className="rounded-md border border-border bg-surface2 px-3 py-2 font-mono text-sm text-paper">
              f({x}) = {Number(y.toFixed(4))}
            </div>
          )}

          {valid && showHorizontalLineTest && preimages !== null && (
            <p className="text-sm text-muted">
              The dashed line at y = {Number(y.toFixed(2))} meets the curve at{" "}
              <span className="text-paper">{preimages}</span>{" "}
              {preimages === 1 ? "point" : "points"} in this domain —{" "}
              {preimages === 1
                ? "consistent with one input giving this output."
                : "so this output comes from more than one input."}
            </p>
          )}

          <p className="text-xs text-muted">Drag to orbit the graph.</p>
        </div>
      </div>
    </div>
  );
}
