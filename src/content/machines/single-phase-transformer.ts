import type { Machine } from "@/types/machine";

export const singlePhaseTransformer: Machine = {
  id: "single-phase-transformer",
  title: "Single-Phase Two-Winding Transformer",
  shortTitle: "Transformer",
  machineType: "Single-phase two-winding transformer (core-type teaching model)",
  modelVariant: "Schematic core-type transformer with laminated core",
  assetStatus: "schematic",
  summary:
    "Alternating current in the primary produces a time-varying flux in the laminated core. That changing flux links the secondary and induces an AC voltage there, with no rotating parts.",
  objectives: [
    "Identify the core, primary winding and secondary winding.",
    "Explain how mutual induction produces the secondary voltage.",
    "Use the turns ratio to predict ideal step-up or step-down behaviour.",
    "Explain why a transformer is not a rotating machine.",
    "Explain why steady DC is not the normal operating supply.",
  ],
  estimatedMinutes: 10,
  components: [
    {
      id: "core",
      displayName: "Laminated magnetic core",
      function:
        "Provides a low-reluctance path that links flux from the primary winding to the secondary winding.",
      constructionNote:
        "Built from thin insulated steel laminations to reduce eddy-current losses. This is a core-type arrangement.",
      material: "Laminated electrical steel",
      explodedOffset: [0, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "primary-winding",
      displayName: "Primary winding",
      function:
        "Connects to the AC input. Alternating primary current produces a time-varying flux in the core.",
      constructionNote:
        "Copper or aluminium conductors with insulation. Turns and conductor size depend on the design voltage and rating.",
      material: "Copper or aluminium with insulation",
      explodedOffset: [-1.7, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "secondary-winding",
      displayName: "Secondary winding",
      function:
        "The changing core flux links this winding and induces an AC voltage, which supplies the connected load.",
      constructionNote:
        "Electrically separate from the primary; energy transfer is through the magnetic field, not a direct connection.",
      material: "Copper or aluminium with insulation",
      explodedOffset: [1.7, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "primary-terminals",
      displayName: "Primary terminals",
      function:
        "Input connection points for the AC supply in the illustrated arrangement.",
      constructionNote:
        "Terminal numbering and arrangement vary by product and standard. This is not a wiring diagram.",
      material: "Brass or copper terminals",
      explodedOffset: [-1.7, 1.5, 0],
      reviewStatus: "draft",
    },
    {
      id: "secondary-terminals",
      displayName: "Secondary terminals",
      function:
        "Output connection points that deliver the induced AC voltage to the load.",
      constructionNote:
        "Isolation and clearance requirements depend on the rated voltage. Always follow the manufacturer's data.",
      material: "Brass or copper terminals",
      explodedOffset: [1.7, 1.5, 0],
      reviewStatus: "draft",
    },
    {
      id: "insulation",
      displayName: "Insulation system",
      function:
        "Separates turns and windings electrically and protects against voltage stress.",
      constructionNote:
        "May include enamel, paper, film or resin systems. The amber schematic layers are indicative only.",
      material: "Insulating paper, film, enamel or resin",
      explodedOffset: [-0.9, 0, 1.9],
      reviewStatus: "draft",
    },
    {
      id: "bobbin-former",
      displayName: "Winding former / bobbin",
      function:
        "Supports and separates the windings where this construction uses one.",
      constructionNote:
        "Small dry-type transformers often use a bobbin. Larger machines use different insulation and support systems.",
      material: "Insulating polymer or pressboard",
      explodedOffset: [0, 0, 1.2],
      reviewStatus: "draft",
    },
    {
      id: "clamps",
      displayName: "Core clamps / structural hardware",
      function:
        "Holds the laminated core together and provides mechanical support.",
      constructionNote:
        "Bolts, clamps or bands may be used. The schematic shows a simplified clamp bar.",
      material: "Steel hardware",
      explodedOffset: [0, -1.8, 0],
      reviewStatus: "draft",
    },
  ],
  steps: [
    {
      id: "identify",
      title: "Find the three essential parts",
      body: "Every transformer has a magnetic core and at least two windings. Here the primary is on the left and the secondary is on the right, both on the same core.",
      focusComponentIds: ["core", "primary-winding", "secondary-winding"],
      animationKey: null,
    },
    {
      id: "ac-input",
      title: "Apply an illustrative AC input",
      body: "The primary is connected to an AC source in this teaching diagram. The source is conceptual and electrically isolated; do not treat this as a wiring instruction.",
      focusComponentIds: ["primary-winding", "primary-terminals"],
      animationKey: "flux",
      diagram: "waveform",
    },
    {
      id: "flux",
      title: "Alternating flux in the core",
      body: "Alternating primary current produces a flux that rises, falls and reverses. The flux stays in the core and does not make the core rotate — a transformer has no rotating parts.",
      focusComponentIds: ["core"],
      animationKey: "flux",
      diagram: "flux",
    },
    {
      id: "mutual-induction",
      title: "Mutual induction in the secondary",
      body: "The changing flux links the secondary turns, inducing an EMF. With an open secondary only voltage appears; when a load is connected, secondary current flows.",
      focusComponentIds: ["secondary-winding", "secondary-terminals"],
      animationKey: "flux",
      diagram: "energy",
    },
    {
      id: "turns-ratio",
      title: "Predict step-up or step-down",
      body: "In the ideal model, the voltage ratio equals the turns ratio. More secondary turns than primary turns gives a step-up transformer; fewer gives a step-down transformer. Real devices have losses and regulation.",
      focusComponentIds: ["primary-winding", "secondary-winding"],
      animationKey: null,
      formula: "Vs / Vp = Ns / Np        Is / Ip = Np / Ns",
      formulaNote:
        "Ideal transformer relations using RMS values. Different symbols are used here from the rotating-machine modules to avoid confusing turns with synchronous speed.",
      diagram: "energy",
    },
    {
      id: "ac-not-dc",
      title: "Why steady DC is not the normal supply",
      body: "Normal transformer action needs a changing flux. Steady DC produces a constant flux, so there is no continuous induced secondary voltage. Depending on the circuit, steady DC can also cause excessive primary current and heating.",
      focusComponentIds: ["primary-winding", "core"],
      animationKey: null,
    },
  ],
  questions: [
    {
      id: "tx-q1",
      type: "single-choice",
      prompt: "In the lesson diagram, what is connected to the primary winding?",
      options: ["The AC input source", "The load", "A DC battery"],
      correctAnswerIndex: 0,
      explanation:
        "The primary is the input side and is connected to the AC source. The secondary supplies the load.",
      objective: "Identify primary and secondary roles.",
    },
    {
      id: "tx-q2",
      type: "single-choice",
      prompt: "How is voltage induced in the secondary winding?",
      options: [
        "By direct metal-to-metal contact with the primary",
        "By the changing core flux linking the secondary turns",
        "By rotating the core",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Mutual induction: the time-varying flux produced by the primary links the secondary and induces an EMF. There is no direct electrical connection between windings.",
      objective: "Explain mutual induction.",
    },
    {
      id: "tx-q3",
      type: "single-choice",
      prompt: "What is the role of the laminated magnetic core?",
      options: [
        "It conducts current between the windings",
        "It provides a magnetic path and laminations reduce eddy-current losses",
        "It stores charge like a capacitor",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The core guides flux that links both windings. Thin insulated laminations limit circulating eddy currents and the losses they cause.",
      objective: "Describe the core's role.",
    },
    {
      id: "tx-q4",
      type: "single-choice",
      prompt: "In an ideal transformer, what does Vs/Vp = Ns/Np predict?",
      options: [
        "The voltage ratio from the turns ratio",
        "The efficiency at full load",
        "The core temperature rise",
      ],
      correctAnswerIndex: 0,
      explanation:
        "For an ideal transformer the voltage ratio equals the turns ratio. It says nothing about efficiency or temperature.",
      objective: "Apply the ideal turns ratio.",
    },
    {
      id: "tx-q5",
      type: "single-choice",
      prompt: "How does a step-up transformer differ from a step-down transformer?",
      options: [
        "It has more secondary turns than primary turns",
        "It has no magnetic core",
        "It works only on DC",
      ],
      correctAnswerIndex: 0,
      explanation:
        "A step-up transformer has Ns > Np and raises voltage in the ideal model. A step-down transformer has Ns < Np.",
      objective: "Compare step-up and step-down.",
    },
    {
      id: "tx-q6",
      type: "single-choice",
      prompt: "Why is a transformer not a rotating machine?",
      options: [
        "Because it has a rotor but no stator",
        "Because energy transfer is through a changing magnetic flux in a stationary core",
        "Because it only works at very low speed",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A transformer has no rotor, shaft or bearings. Its windings and core are stationary, and transfer relies on changing flux.",
      objective: "Distinguish static and rotating machines.",
    },
    {
      id: "tx-q7",
      type: "single-choice",
      prompt: "Why is steady DC not the normal operating supply for a conventional transformer?",
      options: [
        "Steady DC produces constant flux, so there is no continuous induced secondary voltage",
        "Steady DC always rotates the core",
        "Steady DC increases the turns ratio",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Induction needs a changing flux. Steady DC gives constant flux and no continuous secondary EMF, and can cause excessive primary current depending on the circuit.",
      objective: "Explain the AC requirement.",
    },
  ],
};
