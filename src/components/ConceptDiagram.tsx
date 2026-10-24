import type { DiagramKey } from "@/types/machine";

const captions: Record<DiagramKey, string> = {
  "rotating-field": "Illustrative rotating-field diagram, not a field solution.",
  waveform: "Illustrative waveform, not a measurement.",
  flux: "Illustrative flux path, not a calculated field.",
  energy: "Illustrative energy-conversion path.",
};

/** Keep trig-derived SVG coordinates identical on server and client. */
const snap = (value: number) => Math.round(value * 100) / 100;

export function ConceptDiagram({ kind }: { kind: DiagramKey }) {
  return (
    <figure className={`concept-diagram concept-diagram--${kind}`}>
      <svg viewBox="0 0 320 150" role="img" aria-label={captions[kind]}>
        {kind === "rotating-field" ? (
          <g>
            <circle cx="160" cy="75" r="52" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
            <circle cx="160" cy="75" r="34" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
            {[0, 120, 240].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = snap(160 + Math.cos(rad) * 52);
              const y = snap(75 + Math.sin(rad) * 52);
              return (
                <g key={angle}>
                  <circle cx={x} cy={y} r="7" fill="currentColor" fillOpacity="0.85" />
                  <line x1="160" y1="75" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 4" />
                </g>
              );
            })}
            <g className="diagram-spin">
              <line x1="160" y1="75" x2="203" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M203 32l-12 2 10 10z" fill="currentColor" />
            </g>
            <text x="160" y="140" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">
              field sweeps around the bore
            </text>
          </g>
        ) : null}

        {kind === "waveform" ? (
          <g>
            <line x1="24" y1="75" x2="296" y2="75" stroke="currentColor" strokeOpacity="0.3" />
            <line x1="160" y1="20" x2="160" y2="130" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 4" />
            <path
              className="diagram-wave"
              d="M24 75 C 52 20, 80 20, 108 75 S 164 130, 192 75 S 248 20, 276 75"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="286" y="92" fontSize="10" fill="currentColor" fillOpacity="0.7">t</text>
            <text x="168" y="30" fontSize="10" fill="currentColor" fillOpacity="0.7">v</text>
          </g>
        ) : null}

        {kind === "flux" ? (
          <g>
            <rect x="70" y="35" width="26" height="80" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="224" y="35" width="26" height="80" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="70" y="22" width="180" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="70" y="112" width="180" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <g fill="currentColor">
              <path d="M83 96V58l-5 8h10z" />
              <path d="M237 54v38l5-8h-10z" />
              <path d="M104 30h78l-8-5v10z" />
              <path d="M216 120h-78l8 5v-10z" />
            </g>
            <text x="160" y="146" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">
              alternating flux stays in the core
            </text>
          </g>
        ) : null}

        {kind === "energy" ? (
          <g>
            {[
              { x: 12, label: "Input", sub: "mechanical / AC" },
              { x: 116, label: "Coupling", sub: "magnetic field" },
              { x: 220, label: "Output", sub: "rotation / AC" },
            ].map((box) => (
              <g key={box.label}>
                <rect x={box.x} y="46" width="88" height="46" rx="8" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.3" />
                <text x={box.x + 44} y="66" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">
                  {box.label}
                </text>
                <text x={box.x + 44} y="82" textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.7">
                  {box.sub}
                </text>
              </g>
            ))}
            <g stroke="currentColor" strokeWidth="2" strokeOpacity="0.6">
              <line x1="100" y1="69" x2="114" y2="69" />
              <line x1="204" y1="69" x2="218" y2="69" />
            </g>
            <g fill="currentColor" fillOpacity="0.7">
              <path d="M114 69l-7-4v8z" />
              <path d="M218 69l-7-4v8z" />
            </g>
            <text x="160" y="128" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">
              losses reduce the output
            </text>
          </g>
        ) : null}
      </svg>
      <figcaption>{captions[kind]}</figcaption>
    </figure>
  );
}
