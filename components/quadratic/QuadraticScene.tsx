"use client";

import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

export type CurvePoint = [number, number, number];

export type QuadPoint = {
  at: [number, number];
  color: string;
  label?: string;
};

export type SignSegment = {
  from: number;
  to: number;
  color: string;
};

function Axes({ xMin, xMax, yMin, yMax }: { xMin: number; xMax: number; yMin: number; yMax: number }) {
  return (
    <group>
      <Line points={[[xMin, 0, 0], [xMax, 0, 0]]} color="#8B93A1" lineWidth={1.2} />
      <Line points={[[0, yMin, 0], [0, yMax, 0]]} color="#8B93A1" lineWidth={1.2} />
      <Text position={[xMax + 0.4, 0, 0]} fontSize={0.4} color="#8B93A1">x</Text>
      <Text position={[0, yMax + 0.4, 0]} fontSize={0.4} color="#8B93A1">y</Text>
      <mesh position={[0, (yMin + yMax) / 2, -0.02]}>
        <planeGeometry args={[xMax - xMin, yMax - yMin]} />
        <meshBasicMaterial color="#1B222B" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export type QuadraticSceneProps = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  curve: CurvePoint[];
  curveColor: string;
  points?: QuadPoint[];
  verticalLine?: { x: number; color: string; label?: string };
  signSegments?: SignSegment[];
};

export default function QuadraticScene({
  xMin,
  xMax,
  yMin,
  yMax,
  curve,
  curveColor,
  points = [],
  verticalLine,
  signSegments = [],
}: QuadraticSceneProps) {
  return (
    <Canvas camera={{ position: [xMax * 0.8, yMax * 0.9, Math.max(xMax, yMax) * 1.4 + 4], fov: 45 }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      <Axes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />

      {curve.length > 1 && <Line points={curve} color={curveColor} lineWidth={2.5} />}

      {signSegments.map((s, i) => (
        <Line key={i} points={[[s.from, 0, 0.05], [s.to, 0, 0.05]]} color={s.color} lineWidth={5} />
      ))}

      {verticalLine && (
        <group>
          <Line
            points={[[verticalLine.x, yMin, 0], [verticalLine.x, yMax, 0]]}
            color={verticalLine.color}
            dashed
            dashSize={0.15}
            gapSize={0.1}
          />
          {verticalLine.label && (
            <Text position={[verticalLine.x + 0.3, yMax - 0.4, 0]} fontSize={0.35} color={verticalLine.color}>
              {verticalLine.label}
            </Text>
          )}
        </group>
      )}

      {points.map((p, i) => (
        <group key={i}>
          <mesh position={[p.at[0], p.at[1], 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.4} />
          </mesh>
          {p.label && (
            <Text position={[p.at[0] + 0.3, p.at[1] + 0.3, 0]} fontSize={0.35} color={p.color}>
              {p.label}
            </Text>
          )}
        </group>
      ))}

      <OrbitControls enablePan={false} minDistance={2} maxDistance={40} />
    </Canvas>
  );
}