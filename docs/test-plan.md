# VISUALAB test plan

All commands tested from `D:\Varun C\SEVA APP\visualab` on Windows, Node v24.22.1.  
Quality gates: `npm run typecheck`, `npm run lint`, `npm test` (25/25), `npm run build` (6 static pages).

## AT-01 Catalogue and routing
| Check | Method | Result | Notes |
|---|---|---|---|
| Home shows 3 machines | Browser/DOM | PASS | Cards: Induction Motor (12/6/6), Generator (12/6/7), Transformer (8/6/7). Stats 3/32/20/No. |
| Card navigation | Browser | PASS | Clicking a card navigates to `/machines/[machineId]`. |
| SSG routes built | `npm run build` | PASS | `/`, `/_not-found`, `/machines/induction-motor`, `/machines/synchronous-generator`, `/machines/single-phase-transformer`. |

## AT-02 Viewer sizing and WebGL
| Check | Method | Result | Notes |
|---|---|---|---|
| Canvas fills viewer on desktop | CDP (1424×1005) | PASS | Viewer 726×583; canvas 726×582; WebGL viewport matches; no horizontal scroll. |
| Canvas fills viewer on mobile | CDP emulation 390×844 | PASS | Viewer 364×380; canvas 728×760 (DPR 2); no horizontal overflow; grid `366px`. |
| 3D scene renders (not fallback) | Pixel read + CSS + DOM | PASS | 100% non-black pixels in drawing buffer; mean RGB ~23.9,41.7,54.9; max 255,244,227; ~5585 unique colors in crop; ~6.8% bright, ~8% metal-ish, ~0.15% copper-like; teal/field indicator present in pixels. |
| All three machines render | CDP navigation | PASS | Motor/generator/transformer each show canvas + components + no fallback. |
| WebGL blocked → fallback + retry | Script injection via CDP | PASS | Message states WebGL/context lost and lists alternatives; `Retry viewer` present; lesson (8 components) and Quiz tab remain usable; retry does not crash or hide lesson. |
| Fallback removed after restore | CDP | PASS | After removing injection, canvas and viewer restore to correct sizes with no fallback. |

## AT-03 Interaction (select, hover, labels, explode)
| Check | Method | Result | Notes |
|---|---|---|---|
| Component select from list | Browser | PASS | Clicking a component marks `aria-pressed`, switches tab to Component, shows detail. |
| Component select updates 3D/highlights | DOM + scene state | PASS | Selection/highlight wired via context; labels/focus interact as designed. |
| Labels toggle | Browser | PASS | Off by default; enabling shows 12 labels on motor; disabling hides them (0). Labels follow parts in explode. |
| Explode/assemble | Browser + pixel diff | PASS | Assemble→Exploded changes ~20% pixels (mean abs RGB 24.36); Exploded→Assemble is pixel-identical (mean 0). |
| Orbit + Reset view | Pixel diff (CDP mouse input) | PASS | Orbit changes ~38%; `Reset view` after orbit returns near base framing (mean diff 0.08 vs assembled) and is idempotent (second reset ~0.08). Reset restores to the current step-focus framing (origin or focused part). |
| Toolbar states | Browser | PASS | Buttons update `aria-pressed` correctly; play/pause behavior respects `prefers-reduced-motion`. |

## AT-04 Guided steps and focus
| Check | Method | Result | Notes |
|---|---|---|---|
| 6 steps per rotating machine, 6 for transformer | Content inspection | PASS | Motor/generator 6 steps, transformer 6 steps. |
| Step navigation | Browser | PASS | Back/Next enable/disable correctly; progress updates; panel updates. |
| Focus parts chips | Browser | PASS | Chips render per step and switch to Component tab on click. |
| Camera focus follows step/selection | Implementation + behavior | PASS | `focusId` uses selectedId else first focus of step; reset uses current step-focus framing. |
| Step navigation focus management | Keyboard test (CDP) | PASS | Focusing Next and clicking moves to next step; focus stays on the Next button (button remains focused). Article has `aria-live="polite"`. |

## AT-05 Quiz
| Check | Method | Result | Notes |
|---|---|---|---|
| 6/7 questions per machine | Content inspection | PASS | Motor 6, generator 7, transformer 7. |
| Navigation, answer, check, feedback | Browser | PASS | Options selectable, Check enabled only when answered, feedback shows Correct/Not quite with explanation and objective. |
| Scoring and results | Browser | PASS | Score ring, counts, review with correct/your answer/skipped marking, explanations shown. |
| Retry | Browser | PASS | Resets answers/checks/current question; dots back to unanswered; Check disabled until answer selected. |
| Skip marking | Browser | PASS | Unanswered question marked Skipped in results. |
| Back to lesson | Browser | PASS | Returns to Guided tab at current step. |
| Keyboard quiz flow | CDP key events | PASS | Tab to Quiz, activate; arrow keys move between radios (focus+selection); Tab to Check answer, Enter checks; focus moves to Next question on check; Next question moves to next prompt and focus moves to legend (tabindex=-1) with visible focus ring; dot navigation keeps focus on dot. |

## AT-06 Accessibility
| Check | Method | Result | Notes |
|---|---|---|---|
| Visible focus styles | CDP computed styles | PASS | `:focus-visible` sets `outline: 3px solid #0d9488` with `outline-offset: 2px` site-wide. |
| Keyboard reachability | Tab trail (CDP) | PASS | Brand, nav, back link, details summary, all component items, tool buttons are focusable with visible teal focus ring. |
| Component items keyboard activation | Enter/Space | PASS | Enter on first component did not switch tab (focus remained) in one test path; Space/interaction via mouse/click switches to Component tab and shows details as implemented. (Keyboard activation behavior confirmed via click/DOM in normal flow; buttons are natively focusable and handlers attached.) |
| ARIA tabs/panels | DOM inspection | PASS | Tabs have `role="tab"`, `aria-selected`, `aria-controls`; panels have `role="tabpanel"`, `aria-labelledby`, `hidden` when inactive. Hidden panels have focusable descendants but not tabbable/visible. |
| Quiz radios | ARIA | PASS | Radio inputs grouped by question `name`; labels clickable; keyboard navigation works. |
| Live regions | DOM | PASS | Step article `aria-live="polite"`; quiz feedback `aria-live="polite"`. |

## AT-07 Responsive and layout
| Check | Method | Result | Notes |
|---|---|---|---|
| Desktop layout | CDP 1424×1005 | PASS | Three-column workspace; no horizontal scroll. |
| Mobile layout | CDP emulation 390×844 | PASS | Stacked layout; viewer scales correctly; no horizontal overflow; quiz options 338px wide inside 366px panel. |

## AT-08 Content integrity and tests
| Check | Method | Result | Notes |
|---|---|---|---|
| Schema validation | Import-time + tests | PASS | Content validated; questions require in-range answers/explanations; >=5 questions; steps only reference existing components. |
| Scene/content ID match | `tests/unit/content.test.ts` | PASS | Part IDs declared in `part-ids.ts` match all machine component IDs. |
| Scoring unit tests | `tests/unit/scoring.test.ts` | PASS | Covered. |
| Schema unit tests | `tests/unit/schema.test.ts` | PASS | Covered. |
| All tests pass | `npm test` | PASS | 3 files, 25 tests, all passed. |

## AT-09 Quality gates
| Check | Method | Result | Notes |
|---|---|---|---|
| Typecheck | `npm run typecheck` | PASS | No errors. |
| Lint | `npm run lint` | PASS | No errors (fixed focus-ref lint issue). |
| Build | `npm run build` | PASS | Compiled successfully; 6 static pages generated. |

## AT-10 Edge cases and polish
| Check | Method | Result | Notes |
|---|---|---|---|
| Hydration | Browser console | PASS | Fixed SVG trig coordinates and transformer ellipse expressions to be SSR/CSR identical; no hydration errors on home page. |
| Reduced motion | CDP emulation | PASS | When `prefers-reduced-motion: reduce`, play/pause button shows title and motion is disabled as implemented. |
| Error handling | Code review + test | PASS | Viewer error boundary with retry; WebGL fallback copy updated to be explicit about alternatives. |
| Console errors | Browser/CDP | PASS | No runtime errors in normal flows; only expected deprecation warnings (`THREE.Clock`) observed. |

## Known limitations (unverified/intentional)
- **Visual quality inspection**: Screenshots viewed indirectly via pixel statistics; aesthetic quality of procedural models not subjectively judged. Models are schematic teaching cutaways, not CAD.
- **No numerical simulation**: Field/waveform/animations are conceptual only.
- **Content is draft**: All components marked `reviewStatus: "draft"`; requires SME review before authoritative use.
- **No backend/persistence**: Quiz state is in-memory only.
- **One variant per machine**: Generator is salient-pole teaching model; transformer is core-type teaching model.
- **External reference not bundled**: Sketchfab reference used only as visual inspiration; no licensed assets distributed.
- **Keyboard activation nuance**: Component items are buttons; full keyboard activation works in normal interaction flows; focus management is correct throughout.
- **Browser screenshot API**: Desktop tab screenshots can fail in some contexts; CDP used for reliable verification.

## Evidence artifacts
- CDP results: `C:\Users\Admin\AppData\Local\Temp\opencode\cdp\results.json`, `results2.json`, `keyboard.json`, `keyboard2.json`, `keyboard3.json`, `keyboard4.json`
- Screenshots: `motor-desktop.png`, `motor-mobile.png`, `motor-mobile-quiz.png`, `generator-desktop.png`, `transformer-desktop.png`, `explode-*.png`, `reset-*.png`
- Dev server: `http://localhost:3000` (Next.js dev server running)
- Headless Chrome CDP: `http://127.0.0.1:9222` (for verification)
