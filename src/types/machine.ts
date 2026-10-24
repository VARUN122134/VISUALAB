export type Vec3 = [number, number, number];

export type ReviewStatus = "draft" | "reviewed";

export type DiagramKey = "rotating-field" | "waveform" | "flux" | "energy";

/**
 * A selectable machine component. `id` is the stable identifier used by the
 * 3D scene, the component list, lesson steps and quizzes.
 */
export interface MachineComponent {
  id: string;
  displayName: string;
  function: string;
  constructionNote: string;
  material: string;
  /** Displacement applied in exploded view, in scene units. */
  explodedOffset: Vec3;
  reviewStatus: ReviewStatus;
}

export interface LessonStep {
  id: string;
  title: string;
  body: string;
  focusComponentIds: string[];
  animationKey: string | null;
  formula?: string;
  formulaNote?: string;
  diagram?: DiagramKey;
}

export type QuestionType = "single-choice";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  objective: string;
}

export interface Machine {
  id: string;
  title: string;
  shortTitle: string;
  /** Exact machine type, used consistently in UI, content and quizzes. */
  machineType: string;
  modelVariant: string;
  assetStatus: "schematic" | "placeholder" | "verified";
  summary: string;
  objectives: string[];
  estimatedMinutes: number;
  components: MachineComponent[];
  steps: LessonStep[];
  questions: QuizQuestion[];
}
