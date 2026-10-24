"use client";

import type { ReactNode } from "react";

interface ViewerToolbarProps {
  exploded: boolean;
  labels: boolean;
  playing: boolean;
  reducedMotion: boolean;
  onToggleExploded: () => void;
  onToggleLabels: () => void;
  onTogglePlaying: () => void;
  onReset: () => void;
}

function Icon({ name }: { name: "reset" | "explode" | "label" | "play" | "pause" }) {
  const paths: Record<string, ReactNode> = {
    reset: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </>
    ),
    explode: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </>
    ),
    label: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h7l8 7-8 7H5a2 2 0 0 1-2-2V7Z" />
        <circle cx="8" cy="12" r="1.4" />
      </>
    ),
    play: <path d="M8 5l11 7-11 7V5Z" />,
    pause: (
      <>
        <path d="M8 5v14M16 5v14" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function ViewerToolbar({
  exploded,
  labels,
  playing,
  reducedMotion,
  onToggleExploded,
  onToggleLabels,
  onTogglePlaying,
  onReset,
}: ViewerToolbarProps) {
  return (
    <div className="viewer-toolbar" role="toolbar" aria-label="3D viewer controls">
      <button type="button" className="tool-button" onClick={onReset}>
        <Icon name="reset" />
        Reset view
      </button>
      <button
        type="button"
        className={`tool-button${exploded ? " is-on" : ""}`}
        aria-pressed={exploded}
        onClick={onToggleExploded}
      >
        <Icon name="explode" />
        {exploded ? "Assemble" : "Exploded"}
      </button>
      <button
        type="button"
        className={`tool-button${labels ? " is-on" : ""}`}
        aria-pressed={labels}
        onClick={onToggleLabels}
      >
        <Icon name="label" />
        Labels
      </button>
      <button
        type="button"
        className={`tool-button${playing ? " is-on" : ""}`}
        aria-pressed={playing}
        onClick={onTogglePlaying}
        title={reducedMotion ? "Reduced motion is enabled in your system settings" : undefined}
      >
        <Icon name={playing ? "pause" : "play"} />
        {playing ? "Pause motion" : "Play motion"}
      </button>
      <span className="toolbar-note">
        <span className="live-dot" aria-hidden="true" />
        Conceptual animation
      </span>
    </div>
  );
}
