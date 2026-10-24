"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Copper, Glass, Metal } from "../materials";
import { Part } from "../Part";
import { useViewer } from "../viewer-context";

const PRIMARY_TURNS = 9;
const SECONDARY_TURNS = 11;

function coil(turns: number, radius: number, x: number, color: string) {
  return Array.from({ length: turns }, (_, index) => {
    const y = -1.05 + (index / (turns - 1)) * 2.1;
    return (
      <mesh key={`${x}-turn-${index}`} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.085, 10, 40]} />
        <Copper color={color} />
      </mesh>
    );
  });
}

function FluxPath() {
  const { playing, reducedMotion } = useViewer();
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const object = group.current;
    if (!object) return;
    const pulse =
      playing && !reducedMotion ? 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(clock.elapsedTime * 2.6)) : 0.6;
    object.traverse((child) => {
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (material?.emissive) {
        material.emissiveIntensity = pulse;
        material.opacity = 0.35 + pulse * 0.65;
      }
    });
  });

  const arrows = [
    { position: [-0.95, -0.25, 0] as const, rotation: 0 },
    { position: [-0.2, 1.35, 0] as const, rotation: -Math.PI / 2 },
    { position: [0.95, 0.25, 0] as const, rotation: Math.PI },
    { position: [0.2, -1.35, 0] as const, rotation: Math.PI / 2 },
  ];

  return (
    <group ref={group}>
      {arrows.map((arrow, index) => (
        <group key={`flux-${index}`} position={arrow.position} rotation={[0, 0, arrow.rotation]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.6, 10]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.1, 0.22, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.9}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Schematic core-type single-phase transformer. Static: no rotor, shaft or
 * bearings. Flux arrows are conceptual and do not simulate a field solution.
 */
export function TransformerModel() {
  return (
    <group>
      <Part id="core">
        {[-1, 1].map((side) => (
          <mesh key={`limb-${side}`} position={[side * 0.95, 0, 0]}>
            <boxGeometry args={[0.55, 2.7, 0.78]} />
            <Metal color="#7d8fa4" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={`yoke-${side}`} position={[0, side * 1.35, 0]}>
            <boxGeometry args={[2.45, 0.55, 0.78]} />
            <Metal color="#7d8fa4" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
        {/* Lamination hint: thin darker bands on the visible limb faces. */}
        {[-0.3, 0, 0.3].map((z) =>
          [-0.95, 0.95].map((x) => (
            <mesh key={`lamination-${x}-${z}`} position={[x, 0, z]}>
              <boxGeometry args={[0.5, 2.72, 0.02]} />
              <Metal color="#64758a" metalness={0.55} roughness={0.5} />
            </mesh>
          )),
        )}
      </Part>

      <Part id="primary-winding">{coil(PRIMARY_TURNS, 0.52, -0.95, "#c9793f")}</Part>
      <Part id="secondary-winding">{coil(SECONDARY_TURNS, 0.6, 0.95, "#b06a3b")}</Part>

      <Part id="primary-terminals">
        {[-1.24, -0.66].map((x) => (
          <group key={`primary-terminal-${x}`} position={[x, 1.66, 0]}>
            <mesh>
              <cylinderGeometry args={[0.075, 0.075, 0.26, 14]} />
              <Metal color="#d6b25e" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, -0.17, 0]}>
              <boxGeometry args={[0.14, 0.1, 0.14]} />
              <Metal color="#b08e45" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </Part>

      <Part id="secondary-terminals">
        {[0.66, 1.24].map((x) => (
          <group key={`secondary-terminal-${x}`} position={[x, 1.66, 0]}>
            <mesh>
              <cylinderGeometry args={[0.075, 0.075, 0.26, 14]} />
              <Metal color="#d6b25e" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, -0.17, 0]}>
              <boxGeometry args={[0.14, 0.1, 0.14]} />
              <Metal color="#b08e45" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </Part>

      <Part id="insulation">
        {[-0.95, 0.95].map((x) => (
          <mesh key={`insulation-${x}`} position={[x, 0, 0]}>
            <boxGeometry args={[1.16, 2.42, 1.16]} />
            <Glass color="#f59e0b" opacity={0.09} />
          </mesh>
        ))}
      </Part>

      <Part id="bobbin-former">
        {[-0.95, 0.95].map((x) => (
          <mesh key={`bobbin-${x}`} position={[x, 0, 0]}>
            <boxGeometry args={[1.22, 2.5, 1.22]} />
            <meshStandardMaterial
              color="#cbd5e1"
              transparent
              opacity={0.28}
              wireframe
              depthWrite={false}
            />
          </mesh>
        ))}
      </Part>

      <Part id="clamps">
        {[-1, 1].map((side) => (
          <mesh key={`clamp-${side}`} position={[0, side * 1.73, 0]}>
            <boxGeometry args={[3.0, 0.12, 0.92]} />
            <Metal color="#4f647c" metalness={0.6} roughness={0.45} />
          </mesh>
        ))}
      </Part>

      <FluxPath />
    </group>
  );
}
