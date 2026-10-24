"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Arrow, Copper, Glass, Metal } from "../materials";
import { Part } from "../Part";
import { useViewer } from "../viewer-context";

const SLOTS = 18;
const BARS = 14;

function around(count: number, radius: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return {
      angle,
      y: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
    };
  });
}

/**
 * Schematic cutaway of a three-phase squirrel-cage induction motor.
 * Built from primitives, not a CAD/GLB asset. Every selectable group id
 * matches the lesson content exactly.
 */
export function InductionMotorModel() {
  const { playing, exploded, reducedMotion } = useViewer();
  const rotor = useRef<THREE.Group>(null);
  const field = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    if (!playing || exploded || reducedMotion) return;
    if (rotor.current) rotor.current.rotation.x += step * 2.4;
    if (field.current) field.current.rotation.x += step * 1.2;
  });

  const statorSlots = around(SLOTS, 1.16);
  const rotorBars = around(BARS, 0.94);
  const fins = around(18, 1.63);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Frame: cutaway shell, cooling fins, feet and terminal box. */}
      <Part id="frame">
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.58, 1.58, 2.9, 64, 1, true, 1.83, 4.19]} />
          <Metal color="#5b7089" metalness={0.55} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.62, 1.62, 2.9, 64, 1, true, 1.83, 4.19]} />
          <Glass color="#334155" opacity={0.12} />
        </mesh>
        {fins.map((fin, index) => (
          <mesh
            key={`fin-${index}`}
            position={[0, fin.y, fin.z]}
            rotation={[fin.angle, 0, 0]}
          >
            <boxGeometry args={[2.8, 0.14, 0.06]} />
            <Metal color="#4c607a" metalness={0.5} roughness={0.55} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={`foot-${side}`} position={[side * 0.85, -1.72, 0]}>
            <boxGeometry args={[0.55, 0.28, 2.3]} />
            <Metal color="#4c607a" metalness={0.45} roughness={0.6} />
          </mesh>
        ))}
        <mesh position={[0, 1.72, 0]}>
          <boxGeometry args={[1.0, 0.5, 0.75]} />
          <Metal color="#5b7089" metalness={0.5} roughness={0.55} />
        </mesh>
        {[-0.24, 0.24].map((z) => (
          <mesh key={`terminal-${z}`} position={[-0.2, 2.02, z]}>
            <cylinderGeometry args={[0.055, 0.055, 0.18, 12]} />
            <Metal color="#cbd5e1" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}
        {/* Non-drive-end bracket is modelled with the frame. */}
        <mesh position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.32, 1.55, 48]} />
          <Metal color="#5b7089" metalness={0.55} roughness={0.5} />
        </mesh>
      </Part>

      {/* Stator core: teeth and slots. */}
      <Part id="stator-core">
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.4, 1.4, 2.15, 64, 1, true]} />
          <Metal color="#8b9cb0" metalness={0.6} roughness={0.42} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.06, 1.06, 2.15, 64, 1, true]} />
          <Metal color="#6f8297" metalness={0.6} roughness={0.45} />
        </mesh>
        {[1.075, -1.075].map((x) => (
          <mesh key={`core-end-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[1.06, 1.4, 64]} />
            <Metal color="#7d90a5" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
        {statorSlots.map((slot, index) => (
          <mesh
            key={`tooth-${index}`}
            position={[0, slot.y, slot.z]}
            rotation={[slot.angle, 0, 0]}
          >
            <boxGeometry args={[2.1, 0.18, 0.16]} />
            <Metal color="#8799ad" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
      </Part>

      {/* Stator winding: slot conductors plus end turns. */}
      <Part id="stator-winding">
        {statorSlots.map((slot, index) => (
          <mesh
            key={`slot-conductor-${index}`}
            position={[0, slot.y * 1.08, slot.z * 1.08]}
            rotation={[slot.angle, 0, 0]}
          >
            <boxGeometry args={[2.0, 0.09, 0.09]} />
            <Copper color="#b96a34" />
          </mesh>
        ))}
        {[-1.06, 1.06].map((x) => (
          <mesh key={`end-turn-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.21, 0.1, 12, 72]} />
            <Copper color="#c9793f" />
          </mesh>
        ))}
      </Part>

      {/* Rotating assembly. */}
      <group ref={rotor}>
        <Part id="shaft">
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 5.0, 32]} />
            <Metal color="#b6c2d0" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.5, 32]} />
            <Metal color="#c9d4e0" metalness={0.9} roughness={0.18} />
          </mesh>
        </Part>

        <Part id="rotor-core">
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.88, 0.88, 2.0, 48]} />
            <Metal color="#7a8ca0" metalness={0.65} roughness={0.4} />
          </mesh>
          {[-0.7, -0.35, 0, 0.35, 0.7].map((x) => (
            <mesh key={`lamination-${x}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.881, 0.881, 0.02, 48]} />
              <Metal color="#63758a" metalness={0.7} roughness={0.35} />
            </mesh>
          ))}
        </Part>

        <Part id="rotor-cage">
          {rotorBars.map((bar, index) => (
            <mesh
              key={`bar-${index}`}
              position={[0, bar.y, bar.z]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.052, 0.052, 1.95, 10]} />
              <Copper color="#b87333" />
            </mesh>
          ))}
          {[-0.98, 0.98].map((x) => (
            <mesh key={`cage-ring-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.94, 0.07, 10, 48]} />
              <Copper color="#b87333" />
            </mesh>
          ))}
        </Part>

        <Part id="fan">
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.28, 24]} />
            <Metal color="#94a3b8" metalness={0.4} roughness={0.6} />
          </mesh>
          {Array.from({ length: 7 }, (_, index) => {
            const angle = (index / 7) * Math.PI * 2;
            return (
              <mesh
                key={`blade-${index}`}
                position={[2.28, Math.cos(angle) * 0.5, Math.sin(angle) * 0.5]}
                rotation={[angle, 0.35, 0]}
              >
                <boxGeometry args={[0.06, 0.62, 0.22]} />
                <Metal color="#8b9bb0" metalness={0.4} roughness={0.55} />
              </mesh>
            );
          })}
        </Part>
      </group>

      <Part id="air-gap">
        <mesh position={[0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.985, 0.022, 8, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Part>

      <Part id="bearing-drive" position={[1.16, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.32, 0.12, 12, 32]} />
          <Metal color="#a8b6c6" metalness={0.85} roughness={0.25} />
        </mesh>
      </Part>

      <Part id="bearing-nondrive" position={[-1.16, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.32, 0.12, 12, 32]} />
          <Metal color="#a8b6c6" metalness={0.85} roughness={0.25} />
        </mesh>
      </Part>

      <Part id="end-shield" position={[1.55, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.34, 1.5, 48]} />
          <Metal color="#5b7089" metalness={0.55} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.44, 0.44, 0.3, 32]} />
          <Metal color="#536780" metalness={0.55} roughness={0.5} />
        </mesh>
      </Part>

      <Part id="fan-cover">
        <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.92, 0.92, 0.85, 40, 1, true]} />
          <Glass color="#94a3b8" opacity={0.18} />
        </mesh>
        <mesh position={[2.92, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.26, 0.92, 40]} />
          <Glass color="#94a3b8" opacity={0.22} />
        </mesh>
      </Part>

      {/* Conceptual rotating-field indicator, outside the cutaway. */}
      <group ref={field} position={[-1.72, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.0, 0.012, 6, 72]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
        <group rotation={[0, 0, 0]}>
          <Arrow length={0.7} color="#38bdf8" />
        </group>
        <mesh position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}
