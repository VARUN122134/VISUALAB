import { describe, expect, it } from "vitest";
import { machineCatalogue } from "@/content";
import {
  GENERATOR_PART_IDS,
  MOTOR_PART_IDS,
  TRANSFORMER_PART_IDS,
} from "@/features/viewer/part-ids";

const declaredIds: Record<string, readonly string[]> = {
  "induction-motor": MOTOR_PART_IDS,
  "synchronous-generator": GENERATOR_PART_IDS,
  "single-phase-transformer": TRANSFORMER_PART_IDS,
};

describe("machine content", () => {
  it.each(machineCatalogue)("$id has complete learning material", (machine) => {
    expect(machine.components.length).toBeGreaterThanOrEqual(8);
    expect(machine.steps.length).toBeGreaterThanOrEqual(5);
    expect(machine.questions.length).toBeGreaterThanOrEqual(5);
    expect(machine.objectives.length).toBeGreaterThanOrEqual(3);
    expect(machine.assetStatus).toBe("schematic");
  });

  it.each(machineCatalogue)("$id has unique component, step and question ids", (machine) => {
    expect(new Set(machine.components.map((entry) => entry.id)).size).toBe(
      machine.components.length,
    );
    expect(new Set(machine.steps.map((entry) => entry.id)).size).toBe(machine.steps.length);
    expect(new Set(machine.questions.map((entry) => entry.id)).size).toBe(machine.questions.length);
  });

  it.each(machineCatalogue)("$id scene ids match the component list exactly", (machine) => {
    const sceneIds = [...(declaredIds[machine.id] ?? [])].sort();
    const contentIds = machine.components.map((entry) => entry.id).sort();
    expect(sceneIds).toEqual(contentIds);
  });

  it.each(machineCatalogue)("$id quiz answers point at real options", (machine) => {
    for (const question of machine.questions) {
      expect(question.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswerIndex).toBeLessThan(question.options.length);
      expect(question.explanation.length).toBeGreaterThan(20);
    }
  });

  it.each(machineCatalogue)("$id uses consistent machine naming", (machine) => {
    const text = JSON.stringify(machine).toLowerCase();
    if (machine.id === "induction-motor") {
      expect(text).toContain("squirrel-cage");
      expect(text).not.toContain("brushed dc");
    }
    if (machine.id === "synchronous-generator") {
      expect(text).toContain("synchronous");
      expect(text).not.toContain("dc generator");
    }
    if (machine.id === "single-phase-transformer") {
      expect(text).toContain("single-phase");
      expect(text).not.toContain("rotor assembly");
    }
  });
});
