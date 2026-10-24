"use client";

import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { Machine } from "@/types/machine";
import type * as THREE from "three";

export interface ViewerContextValue {
  machine: Machine;
  selectedId: string | null;
  hoveredId: string | null;
  exploded: boolean;
  labels: boolean;
  playing: boolean;
  focusIds: string[];
  reducedMotion: boolean;
  select: (id: string | null) => void;
  hover: (id: string | null) => void;
  positions: RefObject<Map<string, THREE.Vector3>>;
}

export const ViewerContext = createContext<ViewerContextValue | null>(null);

export function useViewer(): ViewerContextValue {
  const value = useContext(ViewerContext);
  if (!value) {
    throw new Error("useViewer must be used inside a ViewerContext provider.");
  }
  return value;
}
