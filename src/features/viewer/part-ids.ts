/**
 * Declared scene ids for each schematic model. Kept free of React/Three imports
 * so content integrity tests can check them without a browser environment.
 */
export const MOTOR_PART_IDS = [
  "frame",
  "stator-core",
  "stator-winding",
  "rotor-core",
  "rotor-cage",
  "air-gap",
  "shaft",
  "bearing-drive",
  "bearing-nondrive",
  "end-shield",
  "fan",
  "fan-cover",
] as const;

export const GENERATOR_PART_IDS = [
  "frame",
  "stator-core",
  "armature-winding",
  "rotor",
  "field-winding",
  "pole-core",
  "shaft",
  "bearing-drive",
  "bearing-nondrive",
  "end-shield",
  "terminal-box",
  "excitation",
] as const;

export const TRANSFORMER_PART_IDS = [
  "core",
  "primary-winding",
  "secondary-winding",
  "primary-terminals",
  "secondary-terminals",
  "insulation",
  "bobbin-former",
  "clamps",
] as const;
