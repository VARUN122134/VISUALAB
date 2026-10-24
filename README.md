# VISUALAB

Interactive 3D learning prototype for three electrical machines:

1. Three-phase squirrel-cage induction motor
2. Three-phase synchronous generator (salient-pole teaching model)
3. Single-phase two-winding transformer (core-type teaching model)

Built with Next.js (App Router), TypeScript, Three.js and React Three Fiber. The
3D models are **procedural teaching schematics**, not imported CAD/GLB assets.

> Status: working local prototype. Content is draft pending subject-matter
> review. Animations are conceptual, not numerical simulation.

## Run it

Requires Node.js 20.9+ (built and tested with Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Quality gates:

```bash
npm run typecheck
npm run lint
npm test
```

## What works

- Machine catalogue with three lessons and per-machine metadata.
- Shared 3D viewer: orbit, zoom, reset camera, click-to-select, hover feedback.
- Component list as a keyboard-accessible alternative to the canvas.
- Component detail panel: function, construction note, material.
- Exploded view driven by authored offsets from lesson content, animated back to
  the exact assembled transform.
- Labels toggle rendered in-scene and attached to their parts.
- Six guided steps per rotating machine, six for the transformer, with optional
  formula panels and labelled conceptual diagrams.
- Conceptual animation with play/pause, disabled automatically when the model is
  exploded and respecting `prefers-reduced-motion`.
- Quiz per machine (6–7 single-choice questions) with answer checking, score,
  review of every explanation, retry, and a return to the lesson.
- Responsive layout (three-column desktop, stacked mobile) and visible focus
  styles.
- Viewer error boundary, WebGL fallback and a retry action.

## Content model

All lesson content lives in `src/content/machines/*.ts` and is validated at
import time by `src/lib/schema.ts`:

- Component ids are stable and are also the 3D part ids.
- Lesson steps may only focus components that exist.
- Every question needs an in-range answer index and an explanation.
- At least five questions per machine.

`src/features/viewer/part-ids.ts` declares the scene ids, and
`tests/unit/content.test.ts` asserts they match the content exactly, so the model
and the component list cannot silently drift apart.

Explode offsets, labels and component text all come from the same content file.
To change the exploded layout, edit `explodedOffset` in the machine file.

## Project structure

```
src/
  app/                        routes, layout, global styles
  components/                 catalogue, lesson shell, panels, quiz, toolbar
  content/
    index.ts                  validated content registry
    machines/*.ts             three lesson files
  features/viewer/
    ModelViewer.tsx           Canvas, camera, controls, error boundary
    Part.tsx                  selection, highlight, explode, in-scene labels
    models/*.tsx              parametric cutaways
    part-ids.ts               declared scene ids for integrity tests
    viewer-context.tsx        shared viewer state
  lib/
    schema.ts                 content validation
    scoring.ts                pure quiz scoring
    use-prefers-reduced-motion.ts
  types/machine.ts
tests/unit/                   scoring, schema and content integrity
docs/                         asset register and test plan
```

## Important limitations

- **No licensed 3D assets are included.** The models are simplified procedural
  cutaways. They are suitable for teaching the layout, not for dimensional or
  manufacturing reference. See `docs/asset-register.md`.
- **No physics simulation.** Field arrows, flux arrows and AC waveforms are
  illustrative. No torque, loss, thermal or efficiency values are calculated.
- **Draft educational content.** Every component currently carries
  `reviewStatus: "draft"`. A qualified reviewer must check the machine variants,
  component descriptions, formulas and quiz keys before this is presented as
  authoritative teaching material.
- **No backend, accounts, analytics or persistence.** Quiz state is in memory and
  is lost on reload. This is deliberate for the first local prototype.
- **One machine variant per module.** The generator lesson is a salient-pole
  model; the transformer is core-type. Cylindrical-rotor generators and
  shell-type/oil-filled transformers would need different component lists.

## Asset note

A public Sketchfab reference (`Induction Motor Cutaway` by Kanedog) was used
only as visual reference for cutaway layout. It is marked NoAI, is ~812k
triangles and has no download licence shown on its page, so it was **not**
downloaded, copied or redistributed. No external 3D models, textures, images or
web fonts are bundled.

## Next steps

1. Confirm machine variants and commission or license segmented GLB assets.
2. Replace the parametric models with the shared `ModelViewer`'s GLB pipeline
   (`public/models/`), keeping the same component ids.
3. Obtain faculty review and change `reviewStatus` to `reviewed`.
4. Run the device matrix and usability pilot, then fill in
   `docs/test-plan.md` with evidence.
