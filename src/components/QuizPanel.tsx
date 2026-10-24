"use client";

import { useRef } from "react";
import { scoreQuiz } from "@/lib/scoring";
import type { Machine } from "@/types/machine";

interface QuizPanelProps {
  machine: Machine;
  answers: Record<string, number | null>;
  checked: Record<string, boolean>;
  currentIndex: number;
  submitted: boolean;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onCheck: (questionId: string) => void;
  onNavigate: (index: number) => void;
  onSubmit: () => void;
  onRetry: () => void;
  onBackToLesson: () => void;
}

const LETTERS = ["A", "B", "C", "D", "E"];

export function QuizPanel({
  machine,
  answers,
  checked,
  currentIndex,
  submitted,
  onAnswer,
  onCheck,
  onNavigate,
  onSubmit,
  onRetry,
  onBackToLesson,
}: QuizPanelProps) {
  // "Next question" and "Previous" unmount the button that was focused. Move
  // focus to the new prompt so keyboard and screen-reader users are not dropped
  // back to the top of the document.
  const promptRef = useRef<HTMLLegendElement>(null);
  const goToQuestion = (index: number) => {
    onNavigate(index);
    promptRef.current?.focus();
  };

  if (submitted) {
    const score = scoreQuiz(
      machine.questions,
      machine.questions.map((question) => ({
        questionId: question.id,
        selectedIndex: answers[question.id] ?? null,
      })),
    );

    return (
      <div className="results-panel">
        <div className="score-card">
          <div
            className="score-ring"
            style={{
              background: `conic-gradient(#0d9488 ${score.percent * 3.6}deg, #e2e8f0 0deg)`,
            }}
            role="img"
            aria-label={`Score ${score.correct} out of ${score.total}, ${score.percent} percent`}
          >
            <div className="score-ring__inner">
              <span className="score-ring__value">{score.percent}%</span>
              <span className="score-ring__label">score</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Results</p>
            <h2>
              {score.correct} / {score.total} correct
            </h2>
            <p className="results-summary">
              {score.percent >= 80
                ? "Strong understanding of this machine. Review any missed explanation below."
                : score.percent >= 50
                  ? "A reasonable start. Read the explanations for the questions you missed, then retry."
                  : "Review the guided steps and component notes, then try the quiz again."}
            </p>
            <div className="results-actions">
              <button type="button" className="button button--primary" onClick={onRetry}>
                Retry quiz
              </button>
              <button type="button" className="button button--secondary" onClick={onBackToLesson}>
                Back to lesson
              </button>
            </div>
          </div>
        </div>

        <h3 className="review-heading">Review answers</h3>
        <ol className="review-list">
          {machine.questions.map((question, index) => {
            const result = score.results[index];
            const selected = result.selectedIndex;
            return (
              <li key={question.id} className={result.correct ? "is-correct" : "is-wrong"}>
                <div className="review-item__head">
                  <span className={`review-mark${result.correct ? " is-correct" : " is-wrong"}`}>
                    {result.correct ? "Correct" : selected === null ? "Skipped" : "Incorrect"}
                  </span>
                  <span className="review-number">Q{index + 1}</span>
                </div>
                <p className="review-prompt">{question.prompt}</p>
                {!result.correct ? (
                  <p className="review-answer">
                    <strong>Correct answer:</strong> {question.options[question.correctAnswerIndex]}
                    {selected !== null ? (
                      <>
                        {" "}
                        · <strong>Your answer:</strong> {question.options[selected]}
                      </>
                    ) : null}
                  </p>
                ) : (
                  <p className="review-answer">
                    <strong>Your answer:</strong> {question.options[question.correctAnswerIndex]}
                  </p>
                )}
                <p className="review-explanation">{result.explanation}</p>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const question = machine.questions[currentIndex];
  const isChecked = Boolean(checked[question.id]);
  const selectedIndex = answers[question.id] ?? null;
  const answeredCount = machine.questions.filter((entry) => checked[entry.id]).length;

  return (
    <div className="quiz-panel">
      <div className="quiz-meta">
        <span>
          Question {currentIndex + 1} of {machine.questions.length}
        </span>
        <span>{answeredCount} checked</span>
      </div>

      <ol className="quiz-dots" aria-label="Quiz progress">
        {machine.questions.map((entry, index) => {
          const state = checked[entry.id]
            ? answers[entry.id] === entry.correctAnswerIndex
              ? "is-correct"
              : "is-wrong"
            : index === currentIndex
              ? "is-current"
              : "";
          return (
            <li key={entry.id}>
              <button
                type="button"
                className={`quiz-dot ${state}`}
                aria-label={`Go to question ${index + 1}`}
                aria-current={index === currentIndex ? "step" : undefined}
                onClick={() => onNavigate(index)}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <fieldset className="quiz-question" disabled={isChecked}>
        <legend ref={promptRef} tabIndex={-1}>
          {question.prompt}
        </legend>
        <div className="quiz-options">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const showCorrect = isChecked && index === question.correctAnswerIndex;
            const showWrong = isChecked && isSelected && index !== question.correctAnswerIndex;
            return (
              <label
                key={option}
                className={`quiz-option${isSelected ? " is-selected" : ""}${
                  showCorrect ? " is-correct" : ""
                }${showWrong ? " is-wrong" : ""}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={index}
                  checked={isSelected}
                  onChange={() => onAnswer(question.id, index)}
                />
                <span className="quiz-option__letter">{LETTERS[index] ?? index + 1}</span>
                <span className="quiz-option__text">{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {isChecked ? (
        <div
          className={`quiz-feedback${
            selectedIndex === question.correctAnswerIndex ? " is-correct" : " is-wrong"
          }`}
          aria-live="polite"
        >
          <p className="quiz-feedback__title">
            {selectedIndex === question.correctAnswerIndex ? "Correct" : "Not quite"}
          </p>
          <p>{question.explanation}</p>
          <p className="quiz-objective">Objective: {question.objective}</p>
        </div>
      ) : null}

      <div className="quiz-actions">
        <button
          type="button"
          className="button button--ghost"
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {!isChecked ? (
          <button
            type="button"
            className="button button--primary"
            onClick={() => onCheck(question.id)}
            disabled={selectedIndex === null}
          >
            Check answer
          </button>
        ) : currentIndex === machine.questions.length - 1 ? (
          <button type="button" className="button button--primary" onClick={onSubmit}>
            See results
          </button>
        ) : (
          <button
            type="button"
            className="button button--primary"
            onClick={() => goToQuestion(currentIndex + 1)}
          >
            Next question
          </button>
        )}
      </div>

      <p className="quiz-footnote">
        Question bank status: draft. Answers are scored against the lesson key and explanations are
        shown after checking. This quiz is a self-check, not a graded assessment.
      </p>
    </div>
  );
}
