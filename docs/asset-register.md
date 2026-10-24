# Asset register

**Status: no third-party visual assets are distributed with this prototype.**

| Asset | Source | Licence | Attribution | Notes |
|---|---|---|---|---|
| Induction motor model | Authored in code (`src/features/viewer/models/InductionMotor.tsx`) | Project code | — | Parametric schematic cutaway, not CAD |
| Synchronous generator model | Authored in code | Project code | — | Salient-pole schematic |
| Single-phase transformer model | Authored in code | Project code | — | Core-type schematic |
| Icons | Inline SVG authored in code | Project code | — | No icon library |
| Fonts | System font stack | System | — | No web font downloaded |
| Diagrams | Inline SVG authored in code | Project code | — | Labelled illustrative |

## Reference material (not bundled)

| Reference | Link | Status |
|---|---|---|
| Induction Motor Cutaway by Kanedog | https://sketchfab.com/3d-models/induction-motor-cutaway-b02c98e04e614d97897e3dababb70bc8 | Used as visual reference only. Marked NoAI, ~811.9k triangles, no download licence shown. Not downloaded, copied, modified or redistributed. |

## Dependencies

| Package | Licence (typical) | Use |
|---|---|---|
| next | MIT | Application framework |
| react / react-dom | MIT | UI runtime |
| three | MIT | 3D renderer |
| @react-three/fiber | MIT | React renderer for Three.js |
| @react-three/drei | MIT | Controls, grid, shadows, HTML labels |
| typescript, eslint, vitest | Apache-2.0 / MIT | Development tooling |

Verify exact licences from the installed packages before distribution. Keep this
register updated whenever a model, texture, image or font is added.

## Required before using real models

For every GLB/glTF asset added later, record:

- author / source URL;
- licence URL or written permission;
- attribution text required by the licence;
- modification rights and commercial-use rights (if relevant);
- whether redistribution inside the app is allowed;
- triangle count, texture budget and tested devices.

Do not commit an asset with unclear rights. Do not use the Sketchfab reference
above as a distributed asset without written permission from its author.
