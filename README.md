# Imposter

A pass-and-play word game for one phone. Everyone gets the same secret word except the imposters, who
get a similar-but-different word (or nothing at all, in Blank mode). Describe your word, vote out loud,
and find the imposter.

**Play:** [adiverma.in/imposter](https://adiverma.in/imposter/). It installs to the home screen as a PWA
and works offline.

- 410 hand-curated word pairs across 14 categories, each tagged Easy, Medium or Hard
- Player names, imposter count, category and difficulty selection
- Hold-to-peek private reveal, then a final reveal of who the imposters were
- No accounts, no backend: everything stays on the device

## Development

Needs Node 24 and Python 3 (for the dataset checker).

```bash
npm install
npm run dev      # play locally, also reachable from a phone on the same network
npm test         # game-rule tests
npm run build    # check the dataset, type-check, build to dist/
npm run preview  # serve the production build
```

Pushing to `main` deploys to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
The build uses relative paths, so it works under any sub-path.

## Layout

| Path | What's there |
|---|---|
| `src/` | The Preact app: `game/` (rules, dataset loading, storage), `screens/`, `ui/` |
| `dataset/en/` | The word pairs, one JSON file per category |
| `scripts/check_dataset.py` | Validates the dataset; runs as part of `npm run build` |
| `CONTEXT.md` | Glossary: Pair, Civilian Word, Deck, Round and the rest |
| `docs/quality-checklist.md` | The criteria every pair must pass |
| `docs/curation/` | Per-category curation logs: what was rejected or edited, and why |
| `docs/research/` | Research notes behind the platform and design decisions |
| `docs/wayfinder/` | The planning map and tickets; every design decision is recorded in its ticket |
