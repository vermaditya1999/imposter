# Dataset pipeline

How Pairs are generated, checked and changed. Use it to add a new theme (Category), top up an existing
one, or audit the whole Dataset. Everything runs inside a Claude Code session with no API keys: the
session itself is the **author** and **curator**, and fresh Sonnet subagents are the blind **evaluators**.

## Why it's shaped this way

The v1 Dataset was drafted and curated by the same model, so the [v1 audit](../curation/audit-v1.json)
added a judge that hadn't seen the author's reasoning. What it showed:

- **The judge must be blind:** only the Category name and the two words, never the `difference`,
  tier or curation log. Otherwise it grades the author's argument instead of the Pair.
- **The judge must not decide pass/fail on its own.** Without knowing the tier, it marks down the
  closeness that defines Hard (it even flagged the Hard anchor Swiggy/Zomato). So the evaluator only
  scores, and [score.py](../../scripts/pipeline/score.py) applies thresholds that depend on the stored tier.
- **The author's fixes need the same judge.** The blind re-check rejected 5 of 35 fixes from the v1
  audit, most of them Hard Pairs that were too close. Every change goes back through a blind check
  before it ships.
- **Machine checks catch what both models miss:** Sparrow vs Jack Sparrow, Factory vs Kota Factory.

## Roles

| Role | Who | Sees |
|---|---|---|
| Author | The main session (Opus) | Checklist, glossary, every existing word |
| Evaluator | A fresh subagent per input file, `model: sonnet` | One [audit prompt](prompts/audit-v3.md) and one blind input file. Nothing else. |
| Curator | The main session, *after* scoring | Scores, then the curation logs and the stored `difference` |
| Machine | [check_dataset.py](../../scripts/check_dataset.py) | Everything; runs in `npm run build` and fails the build on any error |

## Files

| Path | What |
|---|---|
| `dataset/categories.json` | The Category registry: id-block order (append-only) and retired ids (never reused) |
| `dataset/en/<id>.json` | Shipped Pairs |
| `dataset/drafts/<id>.json` | Candidates being drafted (git-ignored; rejects are kept in the curation log) |
| `docs/curation/<id>.md` | Curation log: every reject, edit and keep, with the criterion that decided it |
| `docs/curation/audit-<run>.json` | One audit run: scores, failures, the curator's decision per Pair |
| `docs/pipeline/prompts/` | Versioned prompts: [author-v1](prompts/author-v1.md), [audit-v3](prompts/audit-v3.md) (v1 and v2 kept for the record) |
| `scripts/dataset_lib.py` | Shared rules (QC-09/10), id blocks, file writing |
| `scripts/pipeline/new_category.py` | Register a theme and create its files |
| `scripts/pipeline/blind.py` | Write blind evaluator inputs; pre-check drafts against QC-09/10 |
| `scripts/pipeline/score.py` | Apply tier-aware rules to evaluator output and write the audit file and worklist |
| `scripts/pipeline/apply.py` | Apply the curator's decisions to the Dataset, logs and audit file; handles ids |
| `.pipeline/<run>/` | Scratch for one run: `blind/` inputs and `results/` outputs (git-ignored) |

## The stages

```
draft ──► pre-check ──► blind audit ──► score ──► curate ──► apply ──► blind re-check ──► machine checks ──► commit
(author)  (QC-09/10)    (Sonnet ×N)     (rules)   (author)   (ids,    (changed Pairs      (check, test,
                                                             logs)     only; loop)         build)
```

1. **Draft.** The author follows [author-v1](prompts/author-v1.md) and writes ~1.5× the needed Pairs to the drafts file.
2. **Pre-check.** `blind.py --drafts` reports duplicate words, modifier clashes and phrasing errors against
   the whole Dataset. Fix or drop those before spending evaluator time on them.
3. **Blind audit.** One fresh Sonnet subagent per input file, in parallel, using the evaluator brief below.
4. **Score.** `score.py` writes `docs/curation/audit-<run>.json` and prints the worklist: every failing
   Pair, plus the weakest 10% of the passing ones.
5. **Curate.** Only now does the curator read the logs and the stored `difference`. For each worklist
   Pair: **change** it (new words, tier or difference), **remove** it, or **keep** it with a written
   reason. Keep only when the evaluator is demonstrably wrong (for example, a Hard Pair with one clean,
   visible difference). For drafts: **add** the best passing candidates, keeping the tier mix and
   spreading across sub-kinds.
6. **Apply.** Write the decisions to a changes file and run `apply.py`. It writes the Dataset, the
   curation log section and the audit file together, and applies the id policy.
7. **Blind re-check.** `blind.py --ids <every changed or added id>` → a fresh evaluator → `score.py
   --partial`. Anything that fails goes back to step 5. Repeat until clean.
8. **Machine checks.** `npm run check-dataset && npm test && npm run build` must pass.
9. **Commit** the Dataset, logs, audit file and registry together.

### Pass/fail rules (score.py)

| Stored tier | distinguishing ≥ | synonym_risk ≤ | bluffable ≥ |
|---|---|---|---|
| Hard | 4 | 6 | 5 (below this: too far apart for Hard, retier, QC-01) |
| Medium | 5 | 5 | 4 (QC-03) |
| Easy | 5 | 4 | 3 (QC-03) |

**Every tier also fails on:**
- giveaway_risk ≥ 7 (QC-14)
- one_sided ≥ 7
- familiarity < 6 (QC-04)
- `kind_of` (QC-02)
- `is_set` or not `same_kind` (QC-15)
- not `safe` (QC-06)
- not `fits_category` (QC-08)
- a `tier_guess` two tiers away from the stored tier (QC-01)

Calibration: on the 375 Pairs that survived the v1 audit unchanged, these rules fail only 3, all
cases the curator had kept by judgement. Change the thresholds only together with a new audit run, and
record why.

### Id policy

Pair ids freeze at release: the app is live, and each device keeps a history of dealt ids.

- A **released** id is one on `origin/main`.
- **Changing the words** of a released Pair retires its id and gives the Pair the next free id in its
  Category's block.
- **Changing only the tier or the difference** keeps the id.
- **Removing** a released Pair retires its id.
- Unreleased ids (added since the last push) are edited in place.

`apply.py` does all of this, and `check_dataset.py` fails if a retired id comes back. Ids the game no
longer knows about just stay in a device's history and are ignored.

## Recipes

Set a run name first, e.g. `RUN=board-games` or `RUN=audit-v3`. Inputs go in `.pipeline/$RUN/blind`,
results in `.pipeline/$RUN/results`.

### Add a new theme

1. **Is it a Category?** It must pass QC-11 (one kind of thing; the name alone tells a player what kind of
   word is in play) and QC-12 (about 30 Pairs without strain). If you can't list 45 candidates quickly, it isn't.
2. Register it, which claims the next id block and creates the files:
   ```bash
   python3 scripts/pipeline/new_category.py board-games "Board Games"
   ```
3. **Draft** about 45 candidates into `dataset/drafts/board-games.json` with [author-v1](prompts/author-v1.md), ids `d-001`….
4. **Pre-check** and write the blind input:
   ```bash
   python3 scripts/pipeline/blind.py .pipeline/$RUN/blind --drafts dataset/drafts/board-games.json
   ```
5. **Blind audit:** one evaluator for the drafts file (see the brief below).
6. **Score:**
   ```bash
   python3 scripts/pipeline/score.py .pipeline/$RUN/results --out docs/curation/audit-board-games.json --drafts dataset/drafts/board-games.json
   ```
7. **Curate and apply:** `add` 28–35 passing candidates, at least 8 per tier, then run `apply.py`.
   Record the notable rejects in the curation log (the drafts file isn't committed).
8. **Re-check** the added ids blind, then run the machine checks.
9. **Update** the README count and the category count in the main README.

### Top up or replace Pairs in an existing Category

Same as a new theme from step 3, with drafts in `dataset/drafts/<id>.json`. The block holds 99 ids,
including retired ones, so keep an eye on it.

### Audit the whole Dataset

Do this after a batch of changes, or when real play suggests a Category is tired.

```bash
python3 scripts/pipeline/blind.py .pipeline/$RUN/blind --categories all      # one file per Category
# 14 evaluators in parallel, one per file
python3 scripts/pipeline/score.py .pipeline/$RUN/results --out docs/curation/$RUN.json --prompt v3
# curate the worklist, write changes.json, then:
python3 scripts/pipeline/apply.py changes.json --dry-run && python3 scripts/pipeline/apply.py changes.json
python3 scripts/pipeline/blind.py .pipeline/$RUN/recheck --ids <changed ids>
# 1 evaluator, then score.py .pipeline/$RUN/recheck-results --partial --out docs/curation/$RUN-recheck.json
```

### Evaluator brief (paste into the subagent call)

Spawn with `subagent_type: general-purpose`, `model: sonnet`, all evaluators in one message so they
run in parallel:

> Read exactly two files and nothing else in the repository (no dataset, docs, curation logs or
> scripts — this is a blind evaluation):
> 1. `<repo>/docs/pipeline/prompts/audit-v3.md` — your instructions (the part after the `---`).
> 2. `<repo>/.pipeline/<run>/blind/<file>.json` — the Pairs, each with its Category name.
>
> Evaluate every Pair. Write the JSON array described in the instructions to
> `<repo>/.pipeline/<run>/results/<file>.json`, check it parses with `python3 -c 'import json;json.load(open(PATH))'`,
> and reply with just the number of Pairs written.

### The changes file (apply.py)

```json
{"heading": "Audit (v3)", "intro": "One paragraph for the log section.", "audit": "docs/curation/audit-v3.json",
 "changes": [
  {"action": "keep",   "id": "en-0102", "why": "Hard by design; one telling difference."},
  {"action": "change", "id": "en-0103", "words": ["Jalebi", "Churros"], "difficulty": "medium",
   "difference": "A Jalebi is …; Churros are …", "qc": "QC-04", "why": "Imarti isn't known to the whole group."},
  {"action": "add",    "category": "board-games", "from": "d-007", "words": ["…", "…"], "difficulty": "hard",
   "difference": "…", "why": "Passed the blind audit."},
  {"action": "remove", "id": "en-0230", "qc": "QC-02", "why": "…"}]}
```

`apply.py` appends rows under `## <heading>` in each Category's log, creating the section if it
doesn't exist. Run each audit under a heading of its own, and run `--dry-run` first.

## Known limits

- **Author and evaluator are both Claude.** Blindness and a different model reduce shared bias but don't
  remove it. Real play is the final judge: when the group trips on a Pair, log it in the Category's
  curation log and change it through `apply.py`.
- **QC-04 (familiarity) is a guess about one friend group's regional mix.** The evaluator is told the
  audience, but no model knows it. The curation logs list the regional words to cut first.
- **Prompts are versioned.** Never edit a prompt in place after a run has used it: copy it to the next
  version and pass `--prompt vN` to `score.py`, so every audit file says what produced it.
