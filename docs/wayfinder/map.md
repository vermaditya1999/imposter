---
title: "Imposter — a pass-and-play word game with a hand-curated dataset"
type: wayfinder:map
status: open
---

## Destination

A build-ready **spec** for a pass-and-play imposter (Undercover-style) **web app, installable as a PWA on phones**, plus **v1 of the dataset**: ~12–15 categories × ~30 word pairs (~400 pairs), curated against a written quality checklist. *Redrawn 2026-10-09 by the user: the destination now includes **building v1 of the app** itself.*

## Notes

- Domain: game design + content curation + mobile app planning. Glossary: [CONTEXT.md](../../CONTEXT.md).
- Every Pair is judged against the [Quality Checklist](../quality-checklist.md).
- Skills to consult: `grilling` + `domain-modeling` for grilling tickets; `prototype` for prototype tickets; `research` for research tickets.
- Planning by default, **except the dataset**: authoring the v1 pairs is part of this map's destination (execution allowed there). The app itself is built after the map closes.
- Standing decisions (from charting, 2026-10-09):
  - Game mode: **Undercover** (imposter gets a similar-but-different word); **Blank mode** (imposter gets nothing) is a setting.
  - **Pass-and-play** on one phone. No backend, no accounts.
  - Audience: the user's friend group first; keep a store release possible but don't plan for it yet.
  - Platforms: **web app / PWA only** (changed 2026-10-09 by the user: no native apps, no Apple Developer Program). Played in the phone browser or installed to the home screen.
  - Dataset: English for v1, schema must allow more locales later. Bundled in the app, shipped with releases.
  - Authoring: Claude drafts **and curates** (approve / edit / reject every pair) against the Quality Checklist + automated checks. *Changed 2026-10-09: the user delegated curation to Claude to reach the end product faster; the user no longer reviews each Pair.*
  - Every pair tagged **Easy / Medium / Hard**.
  - v1 features: player names, imposter count, category selection, pass-to-reveal (hold to peek), final reveal. Voting is verbal. **No discussion timer** (dropped 2026-10-09 by the user).
  - **Quality bar — none of these may regress in the dataset:** words too obscure or too easy (untagged); categories too broad or too narrow; pairs too obvious or nonsensical; culturally off for the group; too few words / repetition; bad translation or awkward phrasing.
- 2026-10-09: the user delegated the Pair schema, v1 Category list and game rules grillings to Claude ("approve all of them, I trust you"). Those resolutions are Claude's calls, so revisit them freely.
- **Dataset v1 is complete:** 408 Pairs across 14 Categories in `dataset/en/`, checked by `scripts/check_dataset.py`. Ids **froze at the first release** (the 2026-10-09 GitHub Pages deploy). Changing a released Pair's words retires its id; retired ids are listed in `dataset/categories.json`. **All dataset work goes through the [dataset pipeline](../pipeline/README.md).**
- 2026-10-09: the user carried execution into the map ("let's build the game now"). The decisions stay in their tickets; there's no separate spec document.
- **The v1 app is built** (2026-10-09): `npm run dev` to play, `npm run build` for `dist/`. See [Task: build the v1 app](tickets/027-build-v1-app.md).
- Research notes are written to `docs/research/<slug>.md` (not throwaway branches — the repo has no commits yet).

## Decisions so far

<!-- one line per closed ticket: [title](tickets/NNN-slug.md): gist -->

- [Survey: what existing imposter games get wrong about their words](tickets/001-existing-games-survey.md): repetition is the top complaint; tag difficulty by how close the two words are, not by rarity
- [Research: cross-platform framework for an offline pass-and-play app](tickets/002-cross-platform-framework.md): Expo (React Native) recommended; Flutter close second. *Superseded 2026-10-09: web/PWA only.*
- [Research: getting the app onto friends' phones without a store release](tickets/003-friend-distribution.md): TestFlight (needs US$99/yr Apple program) for iPhones, free APK link for Android. *Superseded 2026-10-09: a PWA is shared by URL.*
- [Grilling: the Dataset Quality Checklist](tickets/004-quality-checklist.md): 13 criteria (QC-01…13), difficulty = closeness with anchor Pairs, every word unique, Curator records the failed criterion ID on reject
- [Grilling: Pair schema and dataset file format](tickets/005-pair-schema.md): unordered Pair (coin flip picks the Civilian Word each Round) with `id`, `words`, `difficulty`, `difference`; one JSON file per Category per locale; locales curated independently; a check script enforces the Machine criteria
- [Grilling: the v1 Category list](tickets/006-v1-categories.md): 14 Categories × ~30 Pairs (food ×3, animals, places, destinations, jobs, sports & games, movies & shows, characters, brands, house, clothes, gadgets); Indian Food is the pilot
- [Grilling: game rules and Round flow](tickets/007-game-rules.md): 3–12 players, no timer (dropped later), Undercover imposters aren't told, one verbal vote then Reveal, Last Guess for a Blank-mode imposter, no in-app scoring
- [Prototype: pilot batch — one full Category authored and curated](tickets/008-pilot-category-batch.md): workflow holds (Indian Food: 30 Pairs, 23% reject rate in self-review); QC-09 gained a modifier rule; one task per Category with reserved id blocks
- [Grilling: repeat avoidance across Rounds and sessions](tickets/010-repeat-avoidance.md): on-device history of dealt Pair ids; Deck = current selection minus history; side-agnostic; auto-reshuffles only the exhausted selection; manual reset in settings
- [Research: what a PWA can do for private pass-and-play on iPhone and Android](tickets/024-pwa-capabilities.md): everything works except iPhone haptics; no screenshot blocking on the web (hide on `visibilitychange`); iPhone history is safe only from the home screen; Vite + Preact + vite-plugin-pwa recommended
- [Prototype: pass-and-play setup and reveal flow](tickets/009-reveal-flow.md): hold to peek (word visible only while a finger is down), players in entry order, step-by-step end Reveal, no discussion timer, iPhone-only Add to Home Screen banner on Setup
- [Task: author and curate Sweets & Desserts](tickets/011-author-sweets-desserts.md): 29 Pairs, all Machine checks pass
- [Task: author and curate World Food](tickets/012-author-world-food.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Animals](tickets/013-author-animals.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Places Around Town](tickets/014-author-places-around-town.md): 30 Pairs, all Machine checks pass
- [Task: author and curate Travel Destinations](tickets/015-author-travel-destinations.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Jobs](tickets/016-author-jobs.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Sports & Games](tickets/017-author-sports-games.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Movies & Shows](tickets/018-author-movies-shows.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Characters](tickets/019-author-characters.md): 30 Pairs, all Machine checks pass
- [Task: author and curate Brands & Apps](tickets/020-author-brands-apps.md): 30 Pairs, all Machine checks pass
- [Task: author and curate Around the House](tickets/021-author-around-the-house.md): 30 Pairs, all Machine checks pass
- [Task: author and curate Clothes & Accessories](tickets/022-author-clothes-accessories.md): 29 Pairs, all Machine checks pass
- [Task: author and curate Gadgets](tickets/023-author-gadgets.md): 28 Pairs, all Machine checks pass
- [Grilling: what the build-ready spec contains and where it lives](tickets/026-spec-handoff.md): no separate spec; build straight from the tickets; visual identity comes from the user's reference
- [Task: adversarial audit of the v1 Dataset](tickets/025-adversarial-audit.md): a blind Sonnet audit flagged 48/410 Pairs; 35 Pairs changed, every change re-checked blind; the tier-blind prompt over-flags Hard Pairs
- [Task: a reusable pipeline for generating and checking Pairs](tickets/028-dataset-pipeline.md): blind Sonnet evaluator scores, `score.py` applies tier-aware rules, `apply.py` handles ids and logs; first run (audit v2) changed 51 Pairs (23 new words, 28 retiered) and removed 2 → 408 Pairs

## Not yet specified

- **Scoring across rounds** and **custom/user-added words** — maybe-v1.x features, parked until the core flow is settled.
- **Scaling the Dataset past v1** — *the pipeline now exists ([Task: a reusable pipeline for generating and checking Pairs](tickets/028-dataset-pipeline.md)).* Still open: which new themes to add, and how to feed real-play feedback back in.
- **Hosting** — GitHub Pages (needs a public repo) or Cloudflare Pages, plus the URL friends open; see the PWA research.

## Out of scope

- **Online / multi-device multiplayer** — ruled out: pass-and-play only.
- **Remote dataset updates** — ruled out: dataset ships bundled with each release.
- **Native iOS/Android apps and app-store release** — ruled out 2026-10-09: web/PWA only, no Apple Developer Program.
