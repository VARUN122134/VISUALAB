import type { Machine } from "@/types/machine";

export const inductionMotor: Machine = {
  id: "induction-motor",
  title: "Three-Phase Squirrel-Cage Induction Motor",
  shortTitle: "Induction Motor",
  machineType: "Three-phase squirrel-cage induction motor",
  modelVariant: "Schematic cutaway, 4-pole teaching model",
  assetStatus: "schematic",
  summary:
    "A three-phase supply creates a rotating magnetic field in the stator. That field induces currents in the short-circuited rotor cage, and the interaction produces torque that turns the shaft.",
  objectives: [
    "Identify the stationary and rotating parts of the motor.",
    "Explain how the stator winding produces a rotating magnetic field.",
    "Explain why currents are induced in the squirrel-cage rotor.",
    "Describe why the rotor runs below synchronous speed in normal motoring.",
    "Use the exploded view to relate internal parts to the assembled motor.",
  ],
  estimatedMinutes: 12,
  components: [
    {
      id: "frame",
      displayName: "Frame / housing",
      function:
        "Supports and protects the internal assembly and provides the mounting feet used to fix the motor to a base.",
      constructionNote:
        "Usually cast iron or aluminium. Fins are common, but this schematic model omits detailed cooling fins.",
      material: "Cast iron or aluminium (varies by design)",
      explodedOffset: [0, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "stator-core",
      displayName: "Stator core",
      function:
        "Provides a low-reluctance magnetic path for the rotating field and holds the stator winding in its slots.",
      constructionNote:
        "Built from thin insulated steel laminations to limit eddy-current losses. The schematic shows a ring without individual laminations.",
      material: "Laminated electrical steel",
      explodedOffset: [0, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "stator-winding",
      displayName: "Three-phase stator winding",
      function:
        "Carries three phase-shifted alternating currents. Their combined effect is a magnetic field that rotates around the stator.",
      constructionNote:
        "Copper conductors placed in stator slots. The exact coil pitch, turns and connection depend on the motor design; this model is simplified.",
      material: "Copper conductors with insulation",
      explodedOffset: [0, 0, -1.9],
      reviewStatus: "draft",
    },
    {
      id: "rotor-core",
      displayName: "Rotor core",
      function:
        "Carries the rotor magnetic flux and supports the squirrel-cage conductors.",
      constructionNote:
        "Laminated electrical steel, slotted or with bars cast into it. The schematic uses a plain cylinder.",
      material: "Laminated electrical steel",
      explodedOffset: [0, 1.4, 0],
      reviewStatus: "draft",
    },
    {
      id: "rotor-cage",
      displayName: "Squirrel-cage conductors and end rings",
      function:
        "Forms a closed conducting path. The rotating field induces currents in the bars, and those currents contribute to torque.",
      constructionNote:
        "Bars joined at both ends by short-circuiting rings. There are no brushes and no external rotor supply in a squirrel-cage motor.",
      material: "Aluminium or copper bars with end rings",
      explodedOffset: [0, 2.2, 0],
      reviewStatus: "draft",
    },
    {
      id: "air-gap",
      displayName: "Air gap",
      function:
        "The clearance between stator and rotor. It must be small enough for good magnetic coupling while still allowing the rotor to turn freely.",
      constructionNote:
        "A real air gap is a small fraction of the machine diameter. This schematic exaggerates it so the gap is visible.",
      material: "Air / mechanical clearance",
      explodedOffset: [0, -1.8, 0],
      reviewStatus: "draft",
    },
    {
      id: "shaft",
      displayName: "Shaft",
      function:
        "Carries the rotor and transfers mechanical power to the driven load, such as a pump or fan.",
      constructionNote:
        "Steel shaft supported by bearings. The drive end usually has a keyway; the schematic omits it.",
      material: "Machined steel",
      explodedOffset: [3.4, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "bearing-drive",
      displayName: "Drive-end bearing",
      function:
        "Supports the shaft at the drive end and reduces friction while locating the rotor radially.",
      constructionNote:
        "Rolling-element bearings are common. Bearing type and lubrication depend on the machine.",
      material: "Bearing steel, grease or oil",
      explodedOffset: [2.4, 0.8, 0],
      reviewStatus: "draft",
    },
    {
      id: "bearing-nondrive",
      displayName: "Non-drive-end bearing",
      function:
        "Supports the opposite end of the shaft and helps keep the rotor centred in the stator bore.",
      constructionNote:
        "May be a locating or floating bearing depending on the design, allowing for thermal expansion.",
      material: "Bearing steel, grease or oil",
      explodedOffset: [-2.4, 0.8, 0],
      reviewStatus: "draft",
    },
    {
      id: "end-shield",
      displayName: "End shield / end bracket",
      function:
        "Closes the drive end of the frame and holds the bearing in alignment with the stator bore.",
      constructionNote:
        "Also called an end bracket. Its shape and bearing housing vary between motor families.",
      material: "Cast iron or aluminium",
      explodedOffset: [2.9, -1.4, 0],
      reviewStatus: "draft",
    },
    {
      id: "fan",
      displayName: "Cooling fan",
      function:
        "Moves air over the frame to help remove heat produced by losses in the motor.",
      constructionNote:
        "Often mounted on the non-drive end of the shaft. This schematic places the fan on the drive side for a clearer exploded sequence.",
      material: "Plastic or aluminium",
      explodedOffset: [3.9, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "fan-cover",
      displayName: "Fan cover",
      function:
        "Protects the rotating fan and guides cooling air over the frame.",
      constructionNote:
        "A sheet-metal or plastic cowl. The schematic shows a transparent cover so the fan remains visible.",
      material: "Sheet steel or plastic",
      explodedOffset: [4.7, 0, 0],
      reviewStatus: "draft",
    },
  ],
  steps: [
    {
      id: "identify-stationary-parts",
      title: "Identify the stationary parts",
      body: "The frame, stator core and stator winding stay still. Select the stator core and notice that it surrounds the rotor without touching it.",
      focusComponentIds: ["frame", "stator-core", "stator-winding"],
      animationKey: null,
    },
    {
      id: "energize-stator",
      title: "Energize the stator conceptually",
      body: "Three phase-shifted currents flow in the stator winding. The current arrows in this diagram are illustrative: they show phase relationship, not measured values.",
      focusComponentIds: ["stator-winding"],
      animationKey: "field",
      diagram: "rotating-field",
    },
    {
      id: "rotating-field",
      title: "The field rotates",
      body: "Because the three windings are displaced around the stator and their currents are phase-shifted, the combined magnetic field rotates around the bore. Watch the field arrow sweep past the stator.",
      focusComponentIds: ["stator-winding", "stator-core"],
      animationKey: "field",
      diagram: "rotating-field",
    },
    {
      id: "induction",
      title: "The rotor is induced",
      body: "The rotating field cuts the stationary rotor bars at standstill. Relative motion between the field and the cage induces EMF and current in the short-circuited rotor. There are no brushes or external rotor supply.",
      focusComponentIds: ["rotor-cage", "air-gap"],
      animationKey: "start",
      diagram: "energy",
    },
    {
      id: "torque",
      title: "Currents produce torque",
      body: "The induced rotor currents interact with the magnetic field, producing electromagnetic torque. The torque acts in the direction that reduces the relative motion between the field and the rotor.",
      focusComponentIds: ["rotor-cage", "rotor-core", "shaft"],
      animationKey: "run",
      diagram: "energy",
    },
    {
      id: "slip",
      title: "Why the rotor runs below synchronous speed",
      body: "If the rotor reached synchronous speed there would be no relative motion, no induced rotor current and no torque. In normal motoring the rotor therefore runs slightly slower than the field. That difference is the slip.",
      focusComponentIds: ["shaft", "rotor-core"],
      animationKey: "run",
      formula: "Ns = 120 f / P      s = (Ns − Nr) / Ns",
      formulaNote:
        "Ideal relations only. f is supply frequency in hertz, P is the number of stator poles, Nr is rotor speed and s is slip. Use a calculator with validated inputs before quoting a number.",
      diagram: "waveform",
    },
  ],
  questions: [
    {
      id: "motor-q1",
      type: "single-choice",
      prompt: "Which group of parts is stationary in this induction motor?",
      options: ["Rotor core, shaft and fan", "Stator core and stator winding", "Shaft and bearings"],
      correctAnswerIndex: 1,
      explanation:
        "The stator core and stator winding are fixed to the frame. The rotor core, cage and shaft rotate.",
      objective: "Identify stationary and rotating parts.",
    },
    {
      id: "motor-q2",
      type: "single-choice",
      prompt: "What creates the rotating magnetic field?",
      options: [
        "Three phase-shifted currents in the stator winding",
        "A permanent magnet on the shaft",
        "DC supplied to the rotor through brushes",
      ],
      correctAnswerIndex: 0,
      explanation:
        "The three phase windings are displaced in space and carry currents displaced in time. Their combined field rotates. A squirrel-cage rotor has no brushes or external supply.",
      objective: "Explain the rotating magnetic field.",
    },
    {
      id: "motor-q3",
      type: "single-choice",
      prompt: "Why are currents induced in the squirrel-cage rotor?",
      options: [
        "The rotor is connected to the supply through slip rings",
        "The rotor bars cut the rotating magnetic field, so EMF is induced in the closed cage",
        "The shaft carries current from the bearings",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Relative motion between the rotating field and the rotor conductors induces EMF. The end rings close the circuit, so current flows in the cage.",
      objective: "Explain induction in the rotor.",
    },
    {
      id: "motor-q4",
      type: "single-choice",
      prompt: "In normal motoring, why does the rotor run below synchronous speed?",
      options: [
        "Friction alone limits the speed",
        "The supply frequency falls as the motor speeds up",
        "A speed difference is needed to keep inducing rotor current and producing torque",
      ],
      correctAnswerIndex: 2,
      explanation:
        "At synchronous speed there is no relative motion between field and rotor, so no rotor EMF, no rotor current and no torque. The rotor settles slightly below synchronous speed; the difference is slip.",
      objective: "Relate slip to torque production.",
    },
    {
      id: "motor-q5",
      type: "single-choice",
      prompt: "What is the main role of the air gap?",
      options: [
        "It electrically insulates the rotor from the supply",
        "It allows the rotor to turn while keeping the stator and rotor magnetically coupled",
        "It stores the motor's lubricating oil",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The air gap is a mechanical clearance that still permits magnetic coupling. It is kept small because a large gap weakens coupling and increases magnetising current.",
      objective: "Describe the function of the air gap.",
    },
    {
      id: "motor-q6",
      type: "single-choice",
      prompt: "Which part transfers mechanical output to the driven load?",
      options: ["Stator core", "Shaft", "End shield"],
      correctAnswerIndex: 1,
      explanation:
        "The shaft carries the rotor and transmits torque to the load. Bearings support the shaft; the end shield holds the bearing.",
      objective: "Identify the mechanical output path.",
    },
  ],
};
