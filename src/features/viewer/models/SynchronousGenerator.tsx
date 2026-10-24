"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Arrow, Copper, Glass, Metal } from "../materials";
import { Part } from "../Part";
import { useViewer } from "../viewer-context";

const SLOTS = 18;

function around(count: number, radius: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return { angle, y: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
  });
}

/**
 * Schematic salient-pole synchronous generator. The field system is on the
 * rotor; the three-phase armature winding is in the stator. Conceptual only.
 */
export function SynchronousGeneratorModel() {
  const { playing, exploded, reducedMotion } = useViewer();
  const rotor = useRef<THREE.Group>(null);
  const field = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    if (!playing || exploded || reducedMotion) return;
    if (rotor.current) rotor.current.rotation.x += step * 1.9;
    if (field.current) field.current.rotation.x += step * 0.95;
  });

  const slots = around(SLOTS, 1.2);
  const fins = around(18, 1.73);
  const poles = [
    { y: 0.94, z: 0, size: [1.85, 0.5, 0.66] as const },
    { y: -0.94, z: 0, size: [1.85, 0.5, 0.66] as const },
    { y: 0, z: 0.94, size: [1.85, 0.66, 0.5] as const },
    { y: 0, z: -0.94, size: [1.85, 0.66, 0.5] as const },
  ];

  return (
    <group>
      <Part id="frame">
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.68, 1.68, 3.15, 64, 1, true, 1.83, 4.19]} />
          <Metal color="#566b84" metalness={0.55} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.72, 1.72, 3.15, 64, 1, true, 1.83, 4.19]} />
          <Glass color="#334155" opacity={0.12} />
        </mesh>
        {fins.map((fin, index) => (
          <mesh key={`fin-${index}`} position={[0, fin.y, fin.z]} rotation={[fin.angle, 0, 0]}>
            <boxGeometry args={[3.0, 0.14, 0.06]} />
            <Metal color="#475a72" metalness={0.5} roughness={0.55} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={`foot-${side}`} position={[side * 0.9, -1.8, 0]}>
            <boxGeometry args={[0.55, 0.28, 2.4]} />
            <Metal color="#475a72" metalness={0.45} roughness={0.6} />
          </mesh>
        ))}
        <mesh position={[-1.62, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.32, 1.64, 48]} />
          <Metal color="#566b84" metalness={0.55} roughness={0.5} />
        </mesh>
      </Part>

      <Part id="stator-core">
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.48, 1.48, 2.3, 64, 1, true]} />
          <Metal color="#8496aa" metalness={0.6} roughness={0.42} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.1, 1.1, 2.3, 64, 1, true]} />
          <Metal color="#6b7e93" metalness={0.6} roughness={0.45} />
        </mesh>
        {[1.15, -1.15].map((x) => (
          <mesh key={`core-end-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[1.1, 1.48, 64]} />
            <Metal color="#75889c" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
        {slots.map((slot, index) => (
          <mesh key={`tooth-${index}`} position={[0, slot.y, slot.z]} rotation={[slot.angle, 0, 0]}>
            <boxGeometry args={[2.25, 0.2, 0.17]} />
            <Metal color="#7f92a6" metalness={0.6} roughness={0.42} />
          </mesh>
        ))}
      </Part>

      <Part id="armature-winding">
        {slots.map((slot, index) => (
          <mesh
            key={`conductor-${index}`}
            position={[0, slot.y * 1.08, slot.z * 1.08]}
            rotation={[slot.angle, 0, 0]}
          >
            <boxGeometry args={[2.12, 0.1, 0.1]} />
            <Copper color="#b96a34" />
          </mesh>
        ))}
        {[-1.14, 1.14].map((x) => (
          <mesh key={`end-turn-${x}`} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.28, 0.1, 12, 72]} />
            <Copper color="#c9793f" />
          </mesh>
        ))}
      </Part>

      <group ref={rotor}>
        <Part id="shaft">
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.19, 0.19, 5.4, 32]} />
            <Metal color="#b6c2d0" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[2.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.23, 0.23, 0.52, 32]} />
            <Metal color="#c9d4e0" metalness={0.9} roughness={0.18} />
          </mesh>
        </Part>

        <Part id="rotor">
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.8, 0.8, 2.05, 48]} />
            <Metal color="#75889c" metalness={0.65} roughness={0.4} />
          </mesh>
        </Part>

        <Part id="pole-core">
          {poles.map((pole, index) => (
            <mesh key={`pole-${index}`} position={[0, pole.y, pole.z]}>
              <boxGeometry args={pole.size} />
              <Metal color="#6e8195" metalness={0.65} roughness={0.4} />
            </mesh>
          ))}
        </Part>

        <Part id="field-winding">
          {poles.map((pole, poleIndex) =>
            [-0.62, 0.62].map((x) => (
              <mesh
                key={`field-${poleIndex}-${x}`}
                position={[
                  x,
                  pole.y * 1.14,
                  pole.z * 1.14,
                ]}
                rotation={[pole.z === 0 ? 0 : Math.PI / 2, 0, 0]}
              >
                <boxGeometry args={[0.24, 0.56, 0.78]} />
                <Copper color="#c2703c" />
              </mesh>
            )),
          )}
        </Part>
      </group>

      <Part id="bearing-drive" position={[1.24, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.33, 0.12, 12, 32]} />
          <Metal color="#a8b6c6" metalness={0.85} roughness={0.25} />
        </mesh>
      </Part>

      <Part id="bearing-nondrive" position={[-1.24, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.33, 0.12, 12, 32]} />
          <Metal color="#a8b6c6" metalness={0.85} roughness={0.25} />
        </mesh>
      </Part>

      <Part id="end-shield" position={[1.66, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.35, 1.6, 48]} />
          <Metal color="#566b84" metalness={0.55} roughness={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.46, 0.46, 0.3, 32]} />
          <Metal color="#4d6076" metalness={0.55} roughness={0.5} />
        </mesh>
      </Part>

      <Part id="terminal-box" position={[0, 1.94, 0.15]}>
        <mesh>
          <boxGeometry args={[1.05, 0.55, 0.85]} />
          <Metal color="#4f647c" metalness={0.5} roughness={0.55} />
        </mesh>
        {[-0.3, 0, 0.3].map((x) => (
          <mesh key={`terminal-${x}`} position={[x, 0.36, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.18, 12]} />
            <Metal color="#cbd5e1" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}
      </Part>

      <Part id="excitation" position={[0, 2.55, 0.15]}>
        <mesh>
          <boxGeometry args={[0.7, 0.34, 0.55]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#b45309"
            emissiveIntensity={0.35}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 10]} />
          <Metal color="#cbd5e1" metalness={0.8} roughness={0.3} />
        </mesh>
      </Part>

      <group ref={field} position={[-1.82, 0, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.05, 0.012, 6, 72]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
        <Arrow length={0.72} color="#38bdf8" />
      </group>
    </group>
  );
}
