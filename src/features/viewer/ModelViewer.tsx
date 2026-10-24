"use client";

import { ContactShadows, Grid, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { Machine } from "@/types/machine";
import { InductionMotorModel } from "./models/InductionMotor";
import { SynchronousGeneratorModel } from "./models/SynchronousGenerator";
import { TransformerModel } from "./models/Transformer";
import { ViewerContext } from "./viewer-context";

export interface ModelViewerProps {
  machine: Machine;
  selectedId: string | null;
  exploded: boolean;
  labels: boolean;
  playing: boolean;
  reducedMotion: boolean;
  resetToken: number;
  focusId: string | null;
  focusIds: string[];
  onSelect: (id: string | null) => void;
}

function MachineModel({ machineId }: { machineId: string }) {
  if (machineId === "induction-motor") return <InductionMotorModel />;
  if (machineId === "synchronous-generator") return <SynchronousGeneratorModel />;
  if (machineId === "single-phase-transformer") return <TransformerModel />;
  return null;
}

function CameraRig({
  resetToken,
  focusId,
  positions,
}: {
  resetToken: number;
  focusId: string | null;
  positions: React.RefObject<Map<string, THREE.Vector3>>;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const desired = useRef(new THREE.Vector3(0, 0, 0));
  const latest = useRef({ focusId, positions });

  useEffect(() => {
    latest.current = { focusId, positions };
  }, [focusId, positions]);

  useEffect(() => {
    const control = controls.current;
    if (!control) return;
    // Restore the same framing the step starts with, not always the origin, so
    // Reset view after an orbit returns to a predictable, content-centred shot.
    const point = latest.current.focusId
      ? latest.current.positions.current?.get(latest.current.focusId)
      : null;
    camera.position.set(4.9, 3.3, 5.9);
    desired.current.copy(point ?? new THREE.Vector3(0, 0, 0));
    control.target.copy(desired.current);
    control.update();
  }, [resetToken, camera]);

  useEffect(() => {
    if (!focusId) {
      desired.current.set(0, 0, 0);
      return;
    }
    const point = positions.current?.get(focusId);
    if (point) desired.current.copy(point);
  }, [focusId, positions]);

  useFrame((_, delta) => {
    const control = controls.current;
    if (!control) return;
    const alpha = 1 - Math.exp(-6 * Math.min(delta, 0.1));
    control.target.lerp(desired.current, alpha);
    control.update();
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.6}
      maxDistance={16}
      minPolarAngle={0.18}
      maxPolarAngle={Math.PI - 0.25}
    />
  );
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { failed: boolean }
> {  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[visualab] 3D viewer failed:", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="viewer-fallback" role="alert">
          <p className="viewer-fallback__title">The 3D viewer could not start</p>
          <p>
            This browser may not support WebGL, or the graphics context was lost. The component
            list, guided steps and quiz are still available below.
          </p>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => {
              this.setState({ failed: false });
              this.props.onRetry();
            }}
          >
            Retry viewer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SceneContents(props: ModelViewerProps) {
  const { machine, selectedId, exploded, labels, playing, reducedMotion, resetToken, focusId, focusIds } = props;
  const positions = useRef<Map<string, THREE.Vector3>>(new Map());
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.cursor = hoveredId ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hoveredId]);

  const value = useMemo(
    () => ({
      machine,
      selectedId,
      hoveredId,
      exploded,
      labels,
      playing,
      reducedMotion,
      focusIds,
      select: props.onSelect,
      hover: setHoveredId,
      positions,
    }),
    [machine, selectedId, hoveredId, exploded, labels, playing, reducedMotion, focusIds, props.onSelect],
  );

  return (
    <ViewerContext.Provider value={value}>
      <color attach="background" args={["#0a1422"]} />
      <fog attach="fog" args={["#0a1422", 14, 30]} />
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#cfe8ff", "#0f172a", 0.65]} />
      <directionalLight position={[6, 9, 7]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-7, 3, -6]} intensity={0.8} color="#7dd3fc" />
      <directionalLight position={[0, -5, 4]} intensity={0.35} color="#f59e0b" />

      <Suspense fallback={null}>
        <MachineModel machineId={machine.id} />
      </Suspense>

      <CameraRig resetToken={resetToken} focusId={focusId} positions={positions} />

      <Grid
        args={[24, 24]}
        position={[0, -2.65, 0]}
        cellSize={0.5}
        cellThickness={0.6}
        cellColor="#173a5c"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#22547f"
        fadeDistance={20}
        fadeStrength={1.2}
        infiniteGrid
      />
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.42}
        scale={14}
        blur={2.4}
        far={6}
        resolution={512}
        color="#020617"
      />
    </ViewerContext.Provider>
  );
}

/**
 * React Three Fiber sizes its canvas from a ResizeObserver on the canvas
 * wrapper. In an occluded tab, or while CSS is still settling, that first
 * measurement can be skipped, leaving the drawing buffer at the browser default
 * of 300x150. Measuring the wrapper directly on mount is deterministic and
 * keeps the canvas, camera aspect and pointer mapping in sync.
 */
function CanvasSizer() {
  const gl = useThree((state) => state.gl);
  const setSize = useThree((state) => state.setSize);

  useEffect(() => {
    const host = gl.domElement.parentElement;
    if (!host) return;
    const sync = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize(rect.width, rect.height, rect.top, rect.left);
      }
    };
    sync();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    observer?.observe(host);
    window.addEventListener("resize", sync);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [gl, setSize]);

  return null;
}

export function ModelViewer(props: ModelViewerProps) {
  const [retryKey, setRetryKey] = useState(0);

  // R3F only creates its root once its internal ResizeObserver reports a
  // non-zero size. In occluded tabs that callback can be deferred indefinitely,
  // so ask for a re-measure outside the canvas as well.
  useEffect(() => {
    const nudge = () => window.dispatchEvent(new Event("resize"));
    nudge();
    const timer = window.setTimeout(nudge, 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="viewer"
      aria-label={`Interactive 3D model of the ${props.machine.machineType}`}
    >
      <ViewerErrorBoundary onRetry={() => setRetryKey((key) => key + 1)}>
        <Canvas
          key={retryKey}
          dpr={[1, 2]}
          camera={{ position: [4.9, 3.3, 5.9], fov: 42, near: 0.1, far: 60 }}
          gl={{ antialias: true }}
        >
          <CanvasSizer />
          <SceneContents {...props} />
        </Canvas>
      </ViewerErrorBoundary>
      <div className="viewer-hint" aria-hidden="true">
        Drag to orbit · Scroll or pinch to zoom · Click a part to inspect
      </div>
    </div>
  );
}
