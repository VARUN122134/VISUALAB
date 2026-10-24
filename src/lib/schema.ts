import type { Machine } from "@/types/machine";

/**
 * Runtime validation for machine lesson content.
 *
 * The viewer never hard-codes component text. Every component referenced by a
 * lesson step or a quiz answer must exist, and every quiz answer index must be
 * inside the options array. Validation runs when content is imported, so a bad
 * content file fails loudly instead of producing a broken lesson.
 */
export function validateMachine(machine: Machine): string[] {
  const errors: string[] = [];
  const componentIds = new Set<string>();
  const stepIds = new Set<string>();
  const questionIds = new Set<string>();

  if (!machine.id.trim()) errors.push("Machine id is required.");
  if (!machine.title.trim()) errors.push("Machine title is required.");
  if (!machine.machineType.trim()) errors.push("Machine type is required.");
  if (machine.objectives.length === 0) errors.push("At least one learning objective is required.");
  if (machine.components.length === 0) errors.push("At least one component is required.");
  if (machine.steps.length === 0) errors.push("At least one lesson step is required.");
  if (machine.questions.length < 5) {
    errors.push(`At least five quiz questions are required; found ${machine.questions.length}.`);
  }

  for (const component of machine.components) {
    if (componentIds.has(component.id)) {
      errors.push(`Duplicate component id "${component.id}".`);
    }
    componentIds.add(component.id);
    if (!component.displayName.trim()) errors.push(`Component "${component.id}" has no display name.`);
    if (!component.function.trim()) errors.push(`Component "${component.id}" has no reviewed function text.`);
    if (component.explodedOffset.length !== 3) {
      errors.push(`Component "${component.id}" has an invalid exploded offset.`);
    }
  }

  for (const step of machine.steps) {
    if (stepIds.has(step.id)) errors.push(`Duplicate step id "${step.id}".`);
    stepIds.add(step.id);
    for (const componentId of step.focusComponentIds) {
      if (!componentIds.has(componentId)) {
        errors.push(`Step "${step.id}" focuses unknown component "${componentId}".`);
      }
    }
  }

  for (const question of machine.questions) {
    if (questionIds.has(question.id)) errors.push(`Duplicate question id "${question.id}".`);
    questionIds.add(question.id);
    if (question.options.length < 2) {
      errors.push(`Question "${question.id}" needs at least two options.`);
    }
    if (
      !Number.isInteger(question.correctAnswerIndex) ||
      question.correctAnswerIndex < 0 ||
      question.correctAnswerIndex >= question.options.length
    ) {
      errors.push(`Question "${question.id}" has an out-of-range answer index.`);
    }
    if (!question.explanation.trim()) {
      errors.push(`Question "${question.id}" has no explanation.`);
    }
  }

  return errors;
}

export function assertValidMachine(machine: Machine): Machine {
  const errors = validateMachine(machine);
  if (errors.length > 0) {
    throw new Error(`Invalid lesson content for "${machine.id}":\n- ${errors.join("\n- ")}`);
  }
  return machine;
}
