"use client";

import type { MachineComponent } from "@/types/machine";

export function ComponentDetails({ component }: { component: MachineComponent | null }) {
  if (!component) {
    return (
      <div className="empty-panel">
        <p className="empty-panel__title">No component selected</p>
        <p>
          Click any part of the model, or choose an item from the component list, to read its role
          and construction notes.
        </p>
      </div>
    );
  }

  return (
    <article className="component-details" aria-live="polite">
      <p className="eyebrow">Component</p>
      <h2>{component.displayName}</h2>
      <p className="review-badge review-badge--draft">Draft content · awaiting SME review</p>

      <h3>What it does</h3>
      <p>{component.function}</p>

      <h3>Construction note</h3>
      <p>{component.constructionNote}</p>

      <h3>Material</h3>
      <p>{component.material}</p>

      <p className="detail-footnote">
        Explanations describe this teaching model. The construction of a real machine depends on its
        design, rating and manufacturer.
      </p>
    </article>
  );
}
