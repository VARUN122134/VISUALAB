"use client";

import Link from "next/link";
import type { JSX } from "react";
import type { Machine } from "@/types/machine";

/** Keep trig-derived SVG coordinates identical on server and client. */
const snap = (value: number) => Math.round(value * 100) / 100;

function MotorGlyph() {
  return (
    <svg viewBox="0 0 180 130" className="machine-glyph" role="img" aria-label="Induction motor diagram">
      <defs>
        <linearGradient id="motor-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="78" cy="62" r="42" fill="none" stroke="url(#motor-metal)" strokeWidth="10" strokeDasharray="200 40" strokeLinecap="round" />
      <circle cx="78" cy="62" r="45" fill="none" stroke="currentColor" strokeOpacity="0.15" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={snap(78 + Math.cos(rad) * 29)}
            y1={snap(62 + Math.sin(rad) * 29)}
            x2={snap(78 + Math.cos(rad) * 39)}
            y2={snap(62 + Math.sin(rad) * 39)}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="3"
          />
        );
      })}
      <circle cx="78" cy="62" r="24" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
      {[0, 45, 90, 135].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={snap(78 - Math.cos(rad) * 20)}
            y1={snap(62 - Math.sin(rad) * 20)}
            x2={snap(78 + Math.cos(rad) * 20)}
            y2={snap(62 + Math.sin(rad) * 20)}
            stroke="#c2703c"
            strokeWidth="2.5"
            strokeOpacity="0.85"
          />
        );
      })}
      <line x1="120" y1="62" x2="158" y2="62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <rect x="150" y="53" width="8" height="18" rx="2" fill="currentColor" fillOpacity="0.5" />
      <path d="M138 30a30 30 0 0 1 12 18" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="138" cy="30" r="3" fill="#38bdf8" />
    </svg>
  );
}

function GeneratorGlyph() {
  return (
    <svg viewBox="0 0 180 130" className="machine-glyph" role="img" aria-label="Synchronous generator diagram">
      <circle cx="78" cy="62" r="42" fill="none" stroke="#64748b" strokeWidth="9" strokeDasharray="200 40" strokeLinecap="round" />
      <circle cx="78" cy="62" r="26" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" />
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = snap(78 + Math.cos(rad) * 27);
        const cy = snap(62 + Math.sin(rad) * 27);
        return (
          <rect
            key={angle}
            x={cx - 7}
            y={cy - 7}
            width="14"
            height="14"
            rx="3"
            transform={`rotate(${angle} ${cx} ${cy})`}
            fill="#c2703c"
            fillOpacity="0.85"
          />
        );
      })}
      <circle cx="78" cy="62" r="10" fill="currentColor" fillOpacity="0.5" />
      <line x1="120" y1="62" x2="150" y2="62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M132 92c7 0 7-10 14-10s7 10 14 10 7-10 14-10" fill="none" stroke="#38bdf8" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="86" y="14" width="26" height="14" rx="3" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function TransformerGlyph() {
  return (
    <svg viewBox="0 0 180 130" className="machine-glyph" role="img" aria-label="Single-phase transformer diagram">
      <rect x="52" y="18" width="76" height="12" rx="3" fill="none" stroke="#64748b" strokeWidth="7" />
      <rect x="52" y="100" width="76" height="12" rx="3" fill="none" stroke="#64748b" strokeWidth="7" />
      <rect x="52" y="18" width="12" height="94" rx="3" fill="none" stroke="#64748b" strokeWidth="7" />
      <rect x="116" y="18" width="12" height="94" rx="3" fill="none" stroke="#64748b" strokeWidth="7" />
      {Array.from({ length: 5 }, (_, index) => (
        <ellipse
          key={`p-${index}`}
          cx="52"
          cy={34 + index * 16}
          rx="18"
          ry="6"
          fill="none"
          stroke="#c2703c"
          strokeWidth="3"
        />
      ))}
      {Array.from({ length: 5 }, (_, index) => (
        <ellipse
          key={`s-${index}`}
          cx="128"
          cy={34 + index * 16}
          rx="20"
          ry="7"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
        />
      ))}
      <path d="M30 62h14M136 62h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 62l-6-4v8zM136 62l6-4v8z" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

const glyphs: Record<string, () => JSX.Element> = {
  "induction-motor": MotorGlyph,
  "synchronous-generator": GeneratorGlyph,
  "single-phase-transformer": TransformerGlyph,
};

export function MachineCard({ machine, index }: { machine: Machine; index: number }) {
  const Glyph = glyphs[machine.id] ?? MotorGlyph;

  return (
    <Link href={`/machines/${machine.id}`} className="machine-card">
      <div className="machine-card__visual">
        <span className="machine-card__index">Machine {String(index + 1).padStart(2, "0")}</span>
        <Glyph />
      </div>
      <div className="machine-card__body">
        <h3>{machine.shortTitle}</h3>
        <p className="machine-card__type">{machine.machineType}</p>
        <p className="machine-card__summary">{machine.summary}</p>
        <ul className="machine-card__meta">
          <li>
            <strong>{machine.components.length}</strong> parts
          </li>
          <li>
            <strong>{machine.steps.length}</strong> guided steps
          </li>
          <li>
            <strong>{machine.questions.length}</strong> questions
          </li>
        </ul>
        <span className="card-cta">
          Start learning <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
