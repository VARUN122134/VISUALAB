"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { Vec3 } from "@/types/machine";
import { useViewer } from "./viewer-context";

interface PartProps {
  id: string;
  /** Resting position of the part group in the assembled model. */
  position?: Vec3;
  children: ReactNode;
}

/**
 * A selectable model component.
 *
 * The explode offset and the learner-facing label both come from the lesson
 * content, so the 3D model and the component list cannot silently disagree.
 */
export function Part({ id, position = [0, 0, 0], children }: PartProps) {
  const group = useRef<THREE.Group>(null);
  const press = useRef<{ x: number; y: number } | null>(null);
  const [localLabel, setLocalLabel] = useState<Vec3>([0, 0, 0]);
  const {
    machine,
    selectedId,
    hoveredId,
    exploded,
    labels,
    focusIds,
    select,
    hover,
    positions,
  } = useViewer();

  const component = machine.components.find((entry) => entry.id === id);
  const selected = selectedId === id;
  const isHovered = hoveredId === id;
  const focused = focusIds.includes(id);

  const target = useMemo(() => {
    const offset = exploded ? component?.explodedOffset ?? [0, 0, 0] : [0, 0, 0];
    return new THREE.Vector3(
      position[0] + offset[0],
      position[1] + offset[1],
      position[2] + offset[2],
    );
  }, [position, exploded, component]);

  useLayoutEffect(() => {
    const object = group.current;
    if (!object) return;
    const box = new THREE.Box3().setFromObject(object);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const origin = object.getWorldPosition(new THREE.Vector3());
    setLocalLabel([center.x - origin.x, center.y - origin.y, center.z - origin.z]);
    positions.current?.set(id, center);
  }, [id, positions]);

  useEffect(() => {
    const object = group.current;
    if (!object) return;
    const highlight = selected ? "#22d3ee" : isHovered ? "#7dd3fc" : focused ? "#14b8a6" : null;
    object.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const entry of materials) {
        const material = entry as THREE.MeshStandardMaterial;
        if (!material.emissive) continue;
        material.emissive.set(highlight ?? "#000000");
        material.emissiveIntensity = selected ? 0.6 : isHovered ? 0.28 : focused ? 0.12 : 0;
      }
    });
  }, [selected, isHovered, focused]);

  useFrame((_, delta) => {
    if (!group.current) return;
    // Frame-rate independent damping, clamped so tab-switch spikes do not snap.
    const alpha = 1 - Math.exp(-10 * Math.min(delta, 0.1));
    group.current.position.lerp(target, alpha);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const start = press.current;
    const native = event.nativeEvent;
    if (start && native && Math.hypot(native.clientX - start.x, native.clientY - start.y) > 6) {
      return;
    }
    select(id);
  };

  if (!component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[samsee] 3D part "${id}" has no matching component in the lesson content.`);
    }
    return <group>{children}</group>;
  }

  return (
    <group
      ref={group}
      position={position}
      onPointerDown={(event) => {
        const native = event.nativeEvent;
        press.current = native ? { x: native.clientX, y: native.clientY } : null;
      }}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        hover(id);
      }}
      onPointerOut={() => hover(null)}
    >
      {children}
      {labels ? (
        <Html position={localLabel} center distanceFactor={11} zIndexRange={[20, 0]}>
          <span className={`part-label${selected ? " is-selected" : ""}`}>
            {component.displayName}
          </span>
        </Html>
      ) : null}
    </group>
  );
}
