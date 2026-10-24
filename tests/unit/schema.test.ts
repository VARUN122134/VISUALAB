import { describe, expect, it } from "vitest";
import { validateMachine } from "@/lib/schema";
import { inductionMotor } from "@/content/machines/induction-motor";
import type { Machine } from "@/types/machine";

function broken(overrides: Partial<Machine>): Machine {
  return { ...inductionMotor, ...overrides };
}

describe("validateMachine", () => {
  it("accepts the shipped induction motor content", () => {
    expect(validateMachine(inductionMotor)).toEqual([]);
  });

  it("rejects duplicate component ids", () => {
    const machine = broken({
      components: [inductionMotor.components[0], inductionMotor.components[0]],
    });
    expect(validateMachine(machine).join(" ")).toContain("Duplicate component id");
  });

  it("rejects a step that focuses an unknown component", () => {
    const machine = broken({
      steps: [
        {
          ...inductionMotor.steps[0],
          focusComponentIds: ["does-not-exist"],
        },
      ],
    });
    expect(validateMachine(machine).join(" ")).toContain("focuses unknown component");
  });

  it("rejects an out-of-range answer index", () => {
    const machine = broken({
      questions: [{ ...inductionMotor.questions[0], correctAnswerIndex: 99 }],
    });
    expect(validateMachine(machine).join(" ")).toContain("out-of-range answer index");
  });

  it("requires at least five quiz questions", () => {
    const machine = broken({ questions: inductionMotor.questions.slice(0, 2) });
    expect(validateMachine(machine).join(" ")).toContain("At least five quiz questions");
  });
});
