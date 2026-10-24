import type { Machine } from "@/types/machine";

export const synchronousGenerator: Machine = {
  id: "synchronous-generator",
  title: "Three-Phase Synchronous Generator (Alternator)",
  shortTitle: "Generator",
  machineType: "Three-phase synchronous AC generator (salient-pole teaching model)",
  modelVariant: "Schematic salient-pole alternator with DC field winding",
  assetStatus: "schematic",
  summary:
    "A prime mover turns a DC-excited rotor. The rotating field induces AC voltage in the stationary stator armature winding, so mechanical input becomes electrical output.",
  objectives: [
    "Describe the energy conversion performed by a synchronous generator.",
    "Identify the rotor field system and the stator armature winding.",
    "Explain how a changing flux linkage induces AC voltage in the stator.",
    "Relate rotor speed, pole count and electrical frequency.",
    "Distinguish conceptual waveforms from measured output.",
  ],
  estimatedMinutes: 12,
  components: [
    {
      id: "frame",
      displayName: "Frame / housing",
      function:
        "Supports and protects the machine and carries the stator core and terminal arrangements.",
      constructionNote:
        "Construction varies widely between industrial alternators. The schematic frame is simplified.",
      material: "Cast iron, steel or aluminium",
      explodedOffset: [0, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "stator-core",
      displayName: "Stator core",
      function:
        "Provides the magnetic path for the rotor field and holds the armature winding in slots.",
      constructionNote:
        "Laminated electrical steel. The schematic shows a continuous ring rather than individual laminations.",
      material: "Laminated electrical steel",
      explodedOffset: [0, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "armature-winding",
      displayName: "Stator armature winding",
      function:
        "The AC output winding. Changing flux linkage from the rotating field induces an alternating EMF in these conductors.",
      constructionNote:
        "Three-phase distributed winding in this teaching model. Real pitch, turns and connection depend on the machine rating.",
      material: "Copper conductors with insulation",
      explodedOffset: [0, 0, -1.9],
      reviewStatus: "draft",
    },
    {
      id: "rotor",
      displayName: "Rotor assembly",
      function:
        "The rotating assembly that carries the field system and is turned by the prime mover.",
      constructionNote:
        "This schematic uses a salient-pole rotor. Cylindrical rotors are used for high-speed machines.",
      material: "Laminated steel with shaft",
      explodedOffset: [0, 1.3, 0],
      reviewStatus: "draft",
    },
    {
      id: "field-winding",
      displayName: "Rotor field winding",
      function:
        "Carries DC excitation current and produces the rotor magnetic field that links the stator winding.",
      constructionNote:
        "Excited through slip rings and brushes or a brushless exciter in practice. The DC supply path is shown conceptually here.",
      material: "Copper conductors with insulation",
      explodedOffset: [0, 2.1, 0],
      reviewStatus: "draft",
    },
    {
      id: "pole-core",
      displayName: "Rotor poles / pole shoes",
      function:
        "Shape and guide the field flux into the air gap so it links the stator armature winding.",
      constructionNote:
        "Present on salient-pole machines. A cylindrical rotor would use a different field arrangement instead.",
      material: "Laminated steel",
      explodedOffset: [0, 2.9, 0],
      reviewStatus: "draft",
    },
    {
      id: "shaft",
      displayName: "Shaft",
      function:
        "Receives mechanical input from the prime mover and rotates the field system.",
      constructionNote:
        "Supported by bearings and coupled to the prime mover, for example a turbine or engine.",
      material: "Machined steel",
      explodedOffset: [3.2, 0, 0],
      reviewStatus: "draft",
    },
    {
      id: "bearing-drive",
      displayName: "Drive-end bearing",
      function:
        "Supports the shaft at the coupling end and keeps the rotor centred in the stator bore.",
      constructionNote:
        "Rolling-element bearings are common. Lubrication and type vary with speed and load.",
      material: "Bearing steel, grease or oil",
      explodedOffset: [2.4, 0.8, 0],
      reviewStatus: "draft",
    },
    {
      id: "bearing-nondrive",
      displayName: "Non-drive-end bearing",
      function:
        "Supports the opposite end of the shaft and helps maintain the air gap.",
      constructionNote:
        "One bearing may be allowed to float axially to accommodate thermal expansion.",
      material: "Bearing steel, grease or oil",
      explodedOffset: [-2.4, 0.8, 0],
      reviewStatus: "draft",
    },
    {
      id: "end-shield",
      displayName: "End shield / end bracket",
      function:
        "Closes the drive end and holds the bearing in alignment with the stator.",
      constructionNote: "Also called an end bracket. Design varies by machine.",
      material: "Cast iron or steel",
      explodedOffset: [2.8, -1.4, 0],
      reviewStatus: "draft",
    },
    {
      id: "terminal-box",
      displayName: "Terminal box / output terminals",
      function:
        "Represents the electrical output connections where the generated AC is taken to cables and switchgear.",
      constructionNote:
        "Terminal arrangement and phase markings vary. This schematic box is not a wiring diagram.",
      material: "Sheet steel enclosure with insulated terminals",
      explodedOffset: [0, 2.2, 1.4],
      reviewStatus: "draft",
    },
    {
      id: "excitation",
      displayName: "Excitation connection / system",
      function:
        "Supplies DC to the field winding. Field current sets the strength of the rotor magnetic field.",
      constructionNote:
        "Shown conceptually. Real machines use slip rings, a brushless exciter or a static excitation system.",
      material: "Conceptual connection",
      explodedOffset: [0, 3.4, 1.9],
      reviewStatus: "draft",
    },
  ],
  steps: [
    {
      id: "input-output",
      title: "Separate mechanical input from electrical output",
      body: "A prime mover — a turbine, engine or motor — turns the shaft. The generator delivers AC electrical power to a load. The machine converts mechanical energy into electrical energy.",
      focusComponentIds: ["shaft", "terminal-box"],
      animationKey: null,
      diagram: "energy",
    },
    {
      id: "stator-rotor",
      title: "Identify stator and rotor",
      body: "The stator core and armature winding are stationary. The rotor carries the field system and turns inside the stator bore. Relative motion between field and stator conductors is essential.",
      focusComponentIds: ["stator-core", "armature-winding", "rotor", "pole-core"],
      animationKey: "run",
    },
    {
      id: "induction",
      title: "Induction in the armature winding",
      body: "As the excited rotor turns, the magnetic flux linking each stator coil changes with time. A changing flux linkage induces an EMF in the armature winding.",
      focusComponentIds: ["field-winding", "armature-winding", "pole-core"],
      animationKey: "run",
      diagram: "energy",
    },
    {
      id: "ac-output",
      title: "The output is alternating",
      body: "Each stator coil sees the field poles pass in sequence, so its induced voltage reverses direction periodically. The waveform shown is illustrative: it is not a measurement from a real machine.",
      focusComponentIds: ["armature-winding", "terminal-box"],
      animationKey: "run",
      diagram: "waveform",
    },
    {
      id: "synchronous",
      title: "Why it is called synchronous",
      body: "In steady operation the rotor turns at a speed fixed by the electrical frequency and the number of poles. The rotor and the rotating field run together at synchronous speed.",
      focusComponentIds: ["rotor", "shaft"],
      animationKey: "run",
      formula: "Ns = 120 f / P",
      formulaNote:
        "Ideal relation. f is electrical frequency in hertz, P is the number of poles and Ns is synchronous speed in rpm. The generated EMF also depends on flux, frequency, turns and winding factors.",
      diagram: "rotating-field",
    },
    {
      id: "energy-path",
      title: "The complete energy path",
      body: "Mechanical input turns the excited rotor, its field sweeps the stator conductors, changing flux linkage induces AC voltage, and the terminals deliver current to the load. Losses in the windings, core and bearings mean output is less than input.",
      focusComponentIds: ["shaft", "field-winding", "armature-winding", "terminal-box"],
      animationKey: "run",
      diagram: "energy",
    },
  ],
  questions: [
    {
      id: "gen-q1",
      type: "single-choice",
      prompt: "What energy conversion does a generator perform?",
      options: [
        "Electrical energy to mechanical energy",
        "Mechanical energy to electrical energy",
        "AC to DC only",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A generator converts mechanical input from the prime mover into electrical output. A motor performs the reverse conversion.",
      objective: "Describe generator energy conversion.",
    },
    {
      id: "gen-q2",
      type: "single-choice",
      prompt: "In this salient-pole model, which part rotates?",
      options: ["Stator core", "Rotor with its field winding and poles", "Armature winding"],
      correctAnswerIndex: 1,
      explanation:
        "The rotor, shaft and field system rotate. The stator core and armature winding stay fixed to the frame.",
      objective: "Identify the rotating assembly.",
    },
    {
      id: "gen-q3",
      type: "single-choice",
      prompt: "Where is the generated AC voltage induced in this model?",
      options: [
        "In the stator armature winding",
        "In the rotor field winding",
        "In the terminal box",
      ],
      correctAnswerIndex: 0,
      explanation:
        "The changing flux from the rotating field induces voltage in the stationary stator armature winding. The field winding is supplied with DC excitation.",
      objective: "Locate the induced EMF.",
    },
    {
      id: "gen-q4",
      type: "single-choice",
      prompt: "What is the role of the rotor field winding?",
      options: [
        "It carries the load current to the terminals",
        "It produces the rotor magnetic field when supplied with DC excitation",
        "It rectifies the AC output",
      ],
      correctAnswerIndex: 1,
      explanation:
        "DC in the field winding produces the rotor magnetic field. The strength of that field is controlled by the excitation current.",
      objective: "Explain field excitation.",
    },
    {
      id: "gen-q5",
      type: "single-choice",
      prompt: "What supplies the mechanical input to a generator?",
      options: ["The stator winding", "The prime mover", "The excitation system"],
      correctAnswerIndex: 1,
      explanation:
        "The prime mover — a turbine, engine or other machine — turns the shaft. The excitation system supplies the field, not the mechanical input.",
      objective: "Identify the prime mover's role.",
    },
    {
      id: "gen-q6",
      type: "single-choice",
      prompt: "For a fixed frequency and pole count, what does Ns = 120f/P describe?",
      options: [
        "The synchronous speed of the machine",
        "The load current at full power",
        "The efficiency of the generator",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Ns is synchronous speed in rpm for electrical frequency f and pole count P. It is an ideal speed relation, not a power or efficiency value.",
      objective: "Relate speed, frequency and poles.",
    },
    {
      id: "gen-q7",
      type: "single-choice",
      prompt: "Why is the displayed output waveform labelled conceptual?",
      options: [
        "Because it was measured from a real generator",
        "Because it is an illustrative teaching shape, not recorded data",
        "Because the generator produces DC",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The waveform illustrates alternating behaviour. It is not a measurement and must not be read as machine data.",
      objective: "Distinguish illustration from measurement.",
    },
  ],
};
