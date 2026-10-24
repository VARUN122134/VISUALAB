"use client";

import type { Machine } from "@/types/machine";

interface ComponentBrowserProps {
  machine: Machine;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function ComponentBrowser({ machine, selectedId, onSelect }: ComponentBrowserProps) {
  return (
    <section className="panel panel--components" aria-labelledby="components-heading">
      <div className="panel-heading">
        <h2 id="components-heading">Components</h2>
        <span className="count-pill">{machine.components.length}</span>
      </div>
      <p className="panel-note">
        Select a part in 3D or from this list. Selecting the same item again clears the selection.
      </p>
      <ul className="component-list">
        {machine.components.map((component, index) => {
          const active = component.id === selectedId;
          return (
            <li key={component.id}>
              <button
                type="button"
                className={`component-item${active ? " is-active" : ""}`}
                aria-pressed={active}
                onClick={() => onSelect(active ? null : component.id)}
              >
                <span className="component-item__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="component-item__name">{component.displayName}</span>
                <span className="component-item__dot" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
