---
title: "Grilling: Pair schema and dataset file format"
type: wayfinder:grilling
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

What fields does a Pair carry (Civilian Word, Imposter Word, Category, Difficulty, locale, stable id, tags, notes?), is a Pair directional (fixed Civilian/Imposter) or swappable per Round, and what file layout does the Dataset use so it's easy to author, review in git diffs, validate, and bundle — while leaving room for more locales later? Per the Quality Checklist, every Pair must carry its written Telling Difference (QC-02), and the format must let the Machine checks (QC-09, QC-10, QC-12, QC-13) run.

## Resolution

*Decided by Claude on the user's delegation (2026-10-09): "approve all of them, I trust you".*

**A Pair is unordered.** It stores two words, and each Round flips a coin to decide which one is the Civilian Word. Every word already has to be familiar (QC-04), and closeness works the same in both directions, so either word can be the Civilian Word. Flipping doubles the variety you get from ~400 Pairs, and the survey found repetition is the top complaint. Civilian Word and Imposter Word are therefore **roles assigned per Round**, not fields on the Pair.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string, `<locale>-<4 digits>` e.g. `en-0042` | Stable forever: never changes when the words are edited or the Pair moves Category, and never reused. Repeat avoidance will key on it. |
| `words` | `[string, string]` | Unordered. QC-09/QC-10 apply to each word. |
| `difficulty` | `"easy" \| "medium" \| "hard"` | QC-01. |
| `difference` | string | The Telling Difference (QC-02), in one sentence. Curators use it and the app never shows it. |

There's no tags or locale field: the Category and locale come from where the file lives. Only approved Pairs go in the Dataset. Drafts and reject reasons belong to the authoring workflow, which the pilot batch will define.

**Layout:** one JSON file per Category per locale, at `dataset/<locale>/<category-id>.json`:

```json
{
  "id": "indian-food",
  "name": "Indian Food",
  "pairs": [
    { "id": "en-0001", "words": ["Samosa", "Kachori"], "difficulty": "medium", "difference": "Samosa is triangular with a potato filling; Kachori is round with a dal filling." }
  ]
}
```

JSON is used because Expo imports it with no build step. Per-Category files keep git diffs and review small. **Locales are independent Datasets.** A future Hindi or Hinglish locale is curated natively with its own Pairs, never translated from English Pair by Pair, because the survey found translation is a known weak spot.

**Automated checks:** a JSON Schema plus a Node script (`scripts/check-dataset`) in the app repo. It runs as a pre-commit hook and before every build, and enforces the Machine criteria: QC-09 (uniqueness across the whole locale, case-insensitive), QC-10 (format and the spelling allow-list), QC-12 (count) and QC-13 (difficulty mix), plus `difference` being non-empty.
