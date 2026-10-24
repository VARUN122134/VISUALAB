"use client";

import type { Machine, MachineComponent } from "@/types/machine";
import { ConceptDiagram } from "./ConceptDiagram";

interface StepPanelProps {
  machine: Machine;
  stepIndex: number;
  onStepChange: (index: number) => void;
  onSelectComponent: (component: MachineComponent) => void;
}

export function StepPanel({ machine, stepIndex, onStepChange, onSelectComponent }: StepPanelProps) {
  const step = machine.steps[stepIndex];
  const total = machine.steps.length;
  const progress = Math.round(((stepIndex + 1) / total) * 100);
  const focusComponents = step.focusComponentIds
    .map((id) => machine.components.find((component) => component.id === id))
    .filter((component): component is MachineComponent => Boolean(component));

  return (
    <div className="step-panel">
      <div className="step-progress">
        <div className="step-progress__meta">
          <span>
            Step {stepIndex + 1} of {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <article aria-live="polite">
        <p className="eyebrow">Guided learning</p>
        <h2>{step.title}</h2>
        <p className="step-body">{step.body}</p>

        {step.formula ? (
          <div className="formula-card">
            <p className="formula-card__label">Ideal relation</p>
            <code>{step.formula}</code>
            {step.formulaNote ? <p className="formula-card__note">{step.formulaNote}</p> : null}
          </div>
        ) : null}

        {step.diagram ? <ConceptDiagram kind={step.diagram} /> : null}

        {focusComponents.length > 0 ? (
          <div className="focus-chips">
            <span className="focus-chips__label">Focus parts</span>
            <div className="focus-chips__row">
              {focusComponents.map((component) => (
                <button
                  key={component.id}
                  type="button"
                  className="chip"
                  onClick={() => onSelectComponent(component)}
                >
                  {component.displayName}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      <div className="step-nav">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => onStepChange(stepIndex - 1)}
          disabled={stepIndex === 0}
        >
          Back
        </button>
        <button
          type="button"
          className="button button--primary"
          onClick={() => onStepChange(stepIndex + 1)}
          disabled={stepIndex === total - 1}
        >
          Next step
        </button>
      </div>
    </div>
  );
}
