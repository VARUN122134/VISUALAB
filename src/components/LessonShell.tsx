"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { Machine, MachineComponent } from "@/types/machine";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { ComponentBrowser } from "./ComponentBrowser";
import { ComponentDetails } from "./ComponentDetails";
import { QuizPanel } from "./QuizPanel";
import { StepPanel } from "./StepPanel";
import { ViewerToolbar } from "./ViewerToolbar";
import { ModelViewer } from "@/features/viewer/ModelViewer";

type Tab = "learn" | "component" | "quiz";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "learn", label: "Guided" },
  { id: "component", label: "Component" },
  { id: "quiz", label: "Quiz" },
];

export function LessonShell({ machine }: { machine: Machine }) {
  const reducedMotion = usePrefersReducedMotion();
  const [tab, setTab] = useState<Tab>("learn");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exploded, setExploded] = useState(false);
  const [labels, setLabels] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [resetToken, setResetToken] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const step = machine.steps[stepIndex];
  const selectedComponent =
    machine.components.find((component) => component.id === selectedId) ?? null;

  // Camera focus follows an explicit selection first, then the current step.
  const focusId = selectedId ?? step.focusComponentIds[0] ?? null;
  const focusIds = useMemo(() => step.focusComponentIds, [step]);

  const handleSelect = useCallback(
    (id: string | null) => {
      setSelectedId(id);
      if (id) setTab("component");
    },
    [],
  );

  const handleSelectFromStep = useCallback((component: MachineComponent) => {
    setSelectedId(component.id);
    setTab("component");
  }, []);

  const handleStepChange = useCallback(
    (index: number) => {
      if (index < 0 || index >= machine.steps.length) return;
      setStepIndex(index);
      setSelectedId(null);
      setTab("learn");
    },
    [machine.steps.length],
  );

  const handleReset = useCallback(() => {
    setSelectedId(null);
    setResetToken((token) => token + 1);
  }, []);

  const handleAnswer = useCallback((questionId: string, optionIndex: number) => {
    setAnswers((previous) => ({ ...previous, [questionId]: optionIndex }));
  }, []);

  const handleCheck = useCallback((questionId: string) => {
    setChecked((previous) => ({ ...previous, [questionId]: true }));
  }, []);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setChecked({});
    setCurrentQuestion(0);
    setQuizSubmitted(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setQuizSubmitted(true);
  }, []);

  return (
    <div className="lesson">
      <div className="lesson-header">
        <Link href="/" className="back-link">
          <span aria-hidden="true">←</span> All machines
        </Link>
        <div className="lesson-header__badges">
          <span className="badge badge--schematic">Schematic 3D model</span>
          <span className="badge badge--draft">Draft content</span>
          <span className="badge">{machine.estimatedMinutes} min</span>
        </div>
        <h1>{machine.title}</h1>
        <p className="lesson-summary">{machine.summary}</p>
        <details className="objectives">
          <summary>Learning objectives</summary>
          <ul>
            {machine.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </details>
      </div>

      <div className="workspace">
        <aside className="workspace__components">
          <ComponentBrowser machine={machine} selectedId={selectedId} onSelect={handleSelect} />
        </aside>

        <section className="workspace__stage" aria-label="3D learning workspace">
          <div className="stage-card">
            <ViewerToolbar
              exploded={exploded}
              labels={labels}
              playing={playing}
              reducedMotion={reducedMotion}
              onToggleExploded={() => setExploded((value) => !value)}
              onToggleLabels={() => setLabels((value) => !value)}
              onTogglePlaying={() => setPlaying((value) => !value)}
              onReset={handleReset}
            />
            <ModelViewer
              machine={machine}
              selectedId={selectedId}
              exploded={exploded}
              labels={labels}
              playing={playing}
              reducedMotion={reducedMotion}
              resetToken={resetToken}
              focusId={focusId}
              focusIds={focusIds}
              onSelect={handleSelect}
            />
            <div className="stage-status">
              <span>
                <span className="status-dot" aria-hidden="true" /> Parametric cutaway model — not a
                licensed CAD/GLB asset
              </span>
              <span>Exploded view uses authored offsets</span>
            </div>
          </div>
        </section>

        <aside className="workspace__panel">
          <div className="panel panel--detail">
            <div className="tabs" role="tablist" aria-label="Lesson panel">
              {TABS.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  role="tab"
                  id={`tab-${entry.id}`}
                  aria-selected={tab === entry.id}
                  aria-controls={`panel-${entry.id}`}
                  className={`tab${tab === entry.id ? " is-active" : ""}`}
                  onClick={() => setTab(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>

            <div className="tab-panels">
              <div
                role="tabpanel"
                id="panel-learn"
                aria-labelledby="tab-learn"
                hidden={tab !== "learn"}
                className="panel-scroll"
              >
                <StepPanel
                  machine={machine}
                  stepIndex={stepIndex}
                  onStepChange={handleStepChange}
                  onSelectComponent={handleSelectFromStep}
                />
              </div>

              <div
                role="tabpanel"
                id="panel-component"
                aria-labelledby="tab-component"
                hidden={tab !== "component"}
                className="panel-scroll"
              >
                <ComponentDetails component={selectedComponent} />
              </div>

              <div
                role="tabpanel"
                id="panel-quiz"
                aria-labelledby="tab-quiz"
                hidden={tab !== "quiz"}
                className="panel-scroll"
              >
                <QuizPanel
                  machine={machine}
                  answers={answers}
                  checked={checked}
                  currentIndex={currentQuestion}
                  submitted={quizSubmitted}
                  onAnswer={handleAnswer}
                  onCheck={handleCheck}
                  onNavigate={setCurrentQuestion}
                  onSubmit={handleSubmit}
                  onRetry={handleRetry}
                  onBackToLesson={() => setTab("learn")}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
