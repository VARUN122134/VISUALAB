"use client";

import type { ReactNode } from "react";
import * as THREE from "three";

export function Metal({
  color = "#94a3b8",
  metalness = 0.65,
  roughness = 0.38,
}: {
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />;
}

export function Copper({ color = "#c2703c" }: { color?: string }) {
  return <meshStandardMaterial color={color} metalness={0.85} roughness={0.28} />;
}

export function Glass({
  color = "#7dd3fc",
  opacity = 0.16,
  children,
}: {
  color?: string;
  opacity?: number;
  children?: ReactNode;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.1}
      roughness={0.15}
      transparent
      opacity={opacity}
      depthWrite={false}
      side={THREE.DoubleSide}
    >
      {children}
    </meshStandardMaterial>
  );
}

/** Arrow shaft plus cone head pointing along +Y before rotation. */
export function Arrow({
  length = 0.7,
  color = "#38bdf8",
  width = 0.035,
}: {
  length?: number;
  color?: string;
  width?: number;
}) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={[width, width, length, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, length + 0.1, 0]}>
        <coneGeometry args={[width * 2.6, 0.22, 14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}
