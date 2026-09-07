"use client";

import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { toRad } from "@/lib/complexMath";

export type SceneVector = {
  to: [number, number];
  color: string;
  label?: string;
  guides?: boolean; // dashed projection lines onto Re/Im axes
};

export type SceneGuideLine = {
  from: [number, number];
  to: [number, number];
  color: string;
  dashed?: boolean;
};

export type SceneArc = {
  radius: number;
  fromDeg: number;
  toDeg: number;
  color: string;
  label?: string;
};

export type ScenePillar = {
  at: [number, number];
  height: number;
  color: string;
  label?: string;
};

export type SceneCircle = {
  radius: number;
  color: string;
};

function arcPoints(radius: number, fromDeg: number, toDeg: number): [number, number, number][] {
  const steps = 48;
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const deg = fromDeg + ((toDeg - fromDeg) * i) / steps;
    const rad = toRad(deg);
    pts.push([radius * Math.cos(rad), radius * Math.sin(rad), 0]);
  }
  return pts;
}

function circlePoints(radius: number): [number, number, number][] {
  return arcPoints(radius, 0, 360);
}

function Axes({ range }: { range: number }) {
  return (
    <group>
      <Line points={[[-range, 0, 0], [range, 0, 0]]} color="#8B93A1" lineWidth={1.2} />
      <Line points={[[0, -range, 0], [0, range, 0]]} color="#8B93A1" lineWidth={1.2} />
      <Text position={[range + 0.5, 0, 0]} fontSize={0.4} color="#8B93A1">Re</Text>
      <Text position={[0, range + 0.5, 0]} fontSize={0.4} color="#8B93A1">Im</Text>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[range * 2, range * 2]} />
        <meshBasicMaterial color="#1B222B" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Vector({ v }: { v: SceneVector }) {
  const [x, y] = v.to;
  const len = Math.sqrt(x * x + y * y) || 1;
  const angle = Math.atan2(y, x);
  const headLen = Math.min(0.28, len * 0.18);

  return (
    <group>
      <Line points={[[0, 0, 0], [x, y, 0]]} color={v.color} lineWidth={2.5} />
      <mesh position={[x, y, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
        <coneGeometry args={[headLen * 0.5, headLen, 12]} />
        <meshStandardMaterial color={v.color} emissive={v.color} emissiveIntensity={0.3} />
      </mesh>
      {v.guides && (
        <>
          <Line points={[[x, 0, 0], [x, y, 0]]} color="#8B93A1" dashed dashSize={0.12} gapSize={0.08} />
          <Line points={[[0, y, 0], [x, y, 0]]} color="#8B93A1" dashed dashSize={0.12} gapSize={0.08} />
        </>
      )}
      {v.label && (
        <Text position={[x + 0.35, y + 0.35, 0]} fontSize={0.38} color={v.color}>
          {v.label}
        </Text>
      )}
    </group>
  );
}

export type ArgandSceneProps = {
  range: number;
  vectors?: SceneVector[];
  guideLines?: SceneGuideLine[];
  arc?: SceneArc;
  pillar?: ScenePillar;
  circle?: SceneCircle;
};

export default function ArgandScene({ range, vectors = [], guideLines = [], arc, pillar, circle }: ArgandSceneProps) {
  return (
    <Canvas camera={{ position: [range * 0.9, range * 0.9, range * 1.1], fov: 45 }}>
      <ambientLight intensity={0.9} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />

      <Axes range={range} />

      {circle && <Line points={circlePoints(circle.radius)} color={circle.color} lineWidth={1.5} dashed dashSize={0.15} gapSize={0.1} />}

      {vectors.map((v, i) => (
        <Vector key={i} v={v} />
      ))}

      {guideLines.map((g, i) => (
        <Line
          key={i}
          points={[[g.from[0], g.from[1], 0], [g.to[0], g.to[1], 0]]}
          color={g.color}
          dashed={g.dashed}
          dashSize={0.12}
          gapSize={0.08}
        />
      ))}

      {arc && (
        <group>
          <Line points={arcPoints(arc.radius, arc.fromDeg, arc.toDeg)} color={arc.color} lineWidth={2} />
          {arc.label && (
            <Text
              position={[
                arc.radius * 1.35 * Math.cos(toRad((arc.fromDeg + arc.toDeg) / 2)),
                arc.radius * 1.35 * Math.sin(toRad((arc.fromDeg + arc.toDeg) / 2)),
                0,
              ]}
              fontSize={0.35}
              color={arc.color}
            >
              {arc.label}
            </Text>
          )}
        </group>
      )}

      {pillar && (
        <group>
          <Line points={[[pillar.at[0], pillar.at[1], 0], [pillar.at[0], pillar.at[1], pillar.height]]} color={pillar.color} lineWidth={2.5} />
          <mesh position={[pillar.at[0], pillar.at[1], pillar.height]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color={pillar.color} emissive={pillar.color} emissiveIntensity={0.4} />
          </mesh>
          {pillar.label && (
            <Text position={[pillar.at[0] + 0.3, pillar.at[1], pillar.height]} fontSize={0.35} color={pillar.color}>
              {pillar.label}
            </Text>
          )}
        </group>
      )}

      <OrbitControls enablePan={false} minDistance={2} maxDistance={30} />
    </Canvas>
  );
}