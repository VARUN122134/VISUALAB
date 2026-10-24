import type { QuizQuestion } from "@/types/machine";

export interface AnswerRecord {
  questionId: string;
  /** null means the question was left unanswered. */
  selectedIndex: number | null;
}

export interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedIndex: number | null;
  correctIndex: number;
  explanation: string;
}

export interface QuizScore {
  correct: number;
  total: number;
  percent: number;
  results: QuestionResult[];
}

/**
 * Pure scoring helper. Answer mapping is by question id, never by array index,
 * so shuffled or partially answered quizzes cannot mis-score.
 */
export function scoreQuiz(questions: QuizQuestion[], answers: AnswerRecord[]): QuizScore {
  const results: QuestionResult[] = questions.map((question) => {
    const answer = answers.find((entry) => entry.questionId === question.id);
    const selectedIndex = answer?.selectedIndex ?? null;
    return {
      questionId: question.id,
      correct: selectedIndex === question.correctAnswerIndex,
      selectedIndex,
      correctIndex: question.correctAnswerIndex,
      explanation: question.explanation,
    };
  });

  const correct = results.filter((result) => result.correct).length;
  const total = questions.length;

  return {
    correct,
    total,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
    results,
  };
}
