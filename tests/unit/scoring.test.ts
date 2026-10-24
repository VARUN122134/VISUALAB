import { describe, expect, it } from "vitest";
import { scoreQuiz } from "@/lib/scoring";
import type { QuizQuestion } from "@/types/machine";

const questions: QuizQuestion[] = [
  {
    id: "q1",
    type: "single-choice",
    prompt: "First question",
    options: ["A", "B"],
    correctAnswerIndex: 0,
    explanation: "First explanation",
    objective: "First objective",
  },
  {
    id: "q2",
    type: "single-choice",
    prompt: "Second question",
    options: ["A", "B"],
    correctAnswerIndex: 1,
    explanation: "Second explanation",
    objective: "Second objective",
  },
];

describe("scoreQuiz", () => {
  it("scores a perfect attempt", () => {
    const score = scoreQuiz(questions, [
      { questionId: "q1", selectedIndex: 0 },
      { questionId: "q2", selectedIndex: 1 },
    ]);
    expect(score.correct).toBe(2);
    expect(score.total).toBe(2);
    expect(score.percent).toBe(100);
  });

  it("scores a partially correct attempt", () => {
    const score = scoreQuiz(questions, [
      { questionId: "q1", selectedIndex: 1 },
      { questionId: "q2", selectedIndex: 1 },
    ]);
    expect(score.correct).toBe(1);
    expect(score.percent).toBe(50);
  });

  it("counts unanswered questions as incorrect", () => {
    const score = scoreQuiz(questions, [{ questionId: "q1", selectedIndex: 0 }]);
    expect(score.correct).toBe(1);
    expect(score.results[1].selectedIndex).toBeNull();
    expect(score.results[1].correct).toBe(false);
  });

  it("maps answers by question id, not array position", () => {
    const score = scoreQuiz(questions, [
      { questionId: "q2", selectedIndex: 1 },
      { questionId: "q1", selectedIndex: 0 },
    ]);
    expect(score.results[0].correct).toBe(true);
    expect(score.results[1].correct).toBe(true);
  });

  it("handles an empty quiz without dividing by zero", () => {
    const score = scoreQuiz([], []);
    expect(score.total).toBe(0);
    expect(score.percent).toBe(0);
  });
});
