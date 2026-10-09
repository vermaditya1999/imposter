---
title: "Task: build the v1 app"
type: wayfinder:task
status: open
assignee: "claude"
blocked_by: [026]
parent: map
---

## Question

Build the v1 PWA from the decisions on the map: Vite + Preact + TypeScript + vite-plugin-pwa (`generateSW`, `registerType: 'prompt'`), bundling `dataset/en/`.

- **Rules:** [Grilling: game rules and Round flow](007-game-rules.md). **Screens:** [Prototype: pass-and-play setup and reveal flow](009-reveal-flow.md). **Deck:** [Grilling: repeat avoidance across Rounds and sessions](010-repeat-avoidance.md). **Platform:** [Research: what a PWA can do…](024-pwa-capabilities.md).
- **Visual identity (from the user's reference, 2026-10-09):** warm cream canvas, bold heavy display type, saturated flat colour blocks (yellow, orange, pink, sky blue, purple, teal), black pill buttons, friendly big-eyed mascots with sparkles. High contrast, purposeful micro-interactions, nothing over the top. Respect `prefers-reduced-motion`.

**Acceptance checks:**
- Game logic (imposter limits, deal, Deck, reshuffle) is covered by unit tests.
- A full Round plays end to end in a phone-sized browser: Setup → hold-to-peek for every player → Discussion → step-by-step Reveal → Next Round.
- Works offline after first load; `npm run build` passes, including the Dataset check.
- On a real iPhone (manual, after hosting): the word is hidden in the app-switcher snapshot.

## Progress (2026-10-09)

v1 is built and plays end to end. Stays open for the one acceptance check that needs hosting.

- **Code:** `src/game/` (pure rules + storage, unit-tested in `game.test.ts`), `src/screens/` (Setup, Pass, Discuss/Reveal), `src/ui/` (mascots, kit, Category colours), `src/styles.css` (design tokens + motion).
- **Visual identity:** cream topographic canvas; Bricolage Grotesque (display) + Figtree (UI), bundled for offline play; one colour + mascot shape per Category; black pill CTAs, teal for "Next round"; a dark spotlight stage for the end Reveal. App icon: the smug yellow ghost on purple.
- **Motion:** springy press states, a rolling stepper number, a sliding segmented thumb, category check pops, blinking/bobbing mascots, a stamp-in for imposter names. All of it switches off under `prefers-reduced-motion`. The word appears with a pop and **disappears instantly** on release (no fade), for privacy.
- **Checks done:** 12 unit tests pass. `npm run build` passes (Dataset check, typecheck, bundle). Undercover and Blank Rounds played in a 375 px viewport. The service worker precaches the whole app.
- **Still to do:** host it (see the map's *Hosting* fog), then on a real iPhone check the app-switcher snapshot hides the word and Wake Lock holds.

**Revised after the user's first look on a phone (2026-10-09):**
- **Setup is now three steps:** Players → Imposters & mode → Words (Categories + Difficulty). Each step has its own headline and a Back / Next dock, and the progress bar lets you jump back. This supersedes the one-screen Setup in [Prototype: pass-and-play setup and reveal flow](009-reveal-flow.md).
- The brand pill is gone from the top bar.
- **Sheets:** they slide up without bouncing, the page behind them is locked, and no gap shows if the sheet rubber-bands. The springs across the app were toned down too.
- **Android install button:** parked by the user until hosting (it needs HTTPS).
- **Second round of feedback (2026-10-09):**
  - **No page scroll on Setup:** only the step content scrolls and the dock sits in the layout. Android's address bar no longer slides in and out between steps, which had made the Next button bounce.
  - **Word-pair counts appear only in the Settings drawer.**
  - **Difficulty is one choice:** Mixed (all tiers, the default), Easy, Medium or Hard, each with real example Pairs (Pizza/Burger, Lion/Tiger, Frog/Toad). It moved to step 2 next to Imposters and Mode, and step 3 holds only Categories. This narrows the Difficulty multi-select from [Grilling: game rules and Round flow](007-game-rules.md).
  - **Sheets close by dragging down** from the handle or header, or from the content when it's scrolled to the top. Past 25% of the height, or a quick flick, closes the sheet; otherwise it snaps back. The Settings drawer's word-pair line shows only how many have been played.
