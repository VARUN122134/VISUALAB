import { assertValidMachine } from "@/lib/schema";
import type { Machine } from "@/types/machine";
import { inductionMotor } from "./machines/induction-motor";
import { singlePhaseTransformer } from "./machines/single-phase-transformer";
import { synchronousGenerator } from "./machines/synchronous-generator";

/**
 * Single source of truth for lesson content. Validation runs at import time so
 * broken references fail during development and build rather than in a lesson.
 */
export const machines: Machine[] = [inductionMotor, synchronousGenerator, singlePhaseTransformer]
  .map(assertValidMachine)
  .sort((a, b) => a.title.localeCompare(b.title));

/** Catalogue order is fixed for the home page. */
export const machineCatalogue: Machine[] = machines.slice().sort((a, b) => {
  const order = ["induction-motor", "synchronous-generator", "single-phase-transformer"];
  return order.indexOf(a.id) - order.indexOf(b.id);
});

export function getMachine(id: string): Machine | undefined {
  return machines.find((machine) => machine.id === id);
}
