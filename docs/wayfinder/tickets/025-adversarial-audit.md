---
title: "Task: adversarial audit of the v1 Dataset"
type: wayfinder:task
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

Claude drafted *and* curated all 410 Pairs, so the Dataset has had no independent check. Run an adversarial evaluator over every Pair in `dataset/en/`. It runs in a **separate, fresh Claude Code session**, with no API keys (decided by the user, 2026-10-09). To limit the author's bias carrying over:
- Use a different Claude model from the one that authored the Pairs (Opus 5.5), e.g. Sonnet.
- Judge each Pair **blind**: give the evaluator only the two words and the Category name, never the stored `difference`, `difficulty` or the curation logs.
- Read the logs only afterwards, when re-curating.

For each Pair, in **both directions** (A as Civilian Word with B as Imposter Word, then reversed), ask for:
- **Safe distinguishing clues:** clues a Civilian holding A could give that someone holding B couldn't, without revealing A. Tests QC-02.
- **Bluff strategy:** how someone holding B could plausibly pretend to hold A. Tests QC-03.
- **Giveaway risk:** could a Blank-mode imposter name A from the Category plus typical clues? Tests QC-14.
- **Synonym risk** and **one-sidedness:** does the Pair play much worse in one direction?

Also check **familiarity** for the group (QC-04/QC-05).

Record results per Pair in `docs/curation/audit-v1.json` as `{id, words, scores: {distinguishing, bluffable, giveaway_risk, synonym_risk, one_sided, familiarity} (0–10), keep, note}`, with top-level `model` and `prompt_version`.

Then re-curate every Pair that fails, plus the weakest ~10% overall: fix it or replace it, following the Quality Checklist.
- Keep each Pair's `id`. A replacement Pair takes the next free id in its Category's block.
- Log each change with its QC id under a new `## Audit (v1)` section in that Category's curation log (`docs/curation/<category>.md`).
- Re-check each changed Pair's difficulty against the anchors.
- Finally, `python3 scripts/check_dataset.py dataset/en` must print ALL CHECKS PASS.

Fully AFK. Work through the Categories in batches, and write audit results to disk after each Category so a session can resume.

Done when the audit file covers all Pairs, every flagged Pair has been re-curated, and the Machine checks pass.

**Priority:** quality improvement only, so it blocks nothing on the map. Run it whenever convenient.

Out of this ticket: generating new candidates at scale, game simulation, telemetry. See the map's Not yet specified section.

## Resolution

Done 2026-10-09. Results in [audit-v1.json](../../curation/audit-v1.json); prompt in [audit-prompt-v1.md](../../curation/audit-prompt-v1.md).

- **Evaluator:** 14 fresh Sonnet sessions, one per Category, blind (only the Category name and the two words).
- **Result:** 48 of 410 Pairs flagged. Clothes & Accessories (8), Sweets & Desserts (6) and Animals (6) were the weakest; Movies & Shows had none.
- **Re-curation** of the 48 flagged Pairs plus the weakest 10% (62 Pairs), with the logs read only at this stage: 35 Pairs changed (23 edited with the same id, 12 replaced with new ids) and 29 kept with a written reason. The changes include two knock-on swaps needed to free a word. Logged under `## Audit (v1)` in each Category's curation log.
- **Why so many flagged Pairs were kept:** the evaluator doesn't know the tiers (blind by design), so it penalises the closeness that *defines* Hard. It even flagged the Hard anchor Swiggy/Zomato. A flagged Hard Pair was kept only when it has one clean, written Telling Difference.
- **Blind re-check of every change** (35 Pairs) caught 5 bad replacements, all Hard Pairs that were too close or unfamiliar. Those were replaced again and checked again until they passed. The Curator kept one borderline Pair (Ice Gola/Milkshake).
- `python3 scripts/check_dataset.py dataset/en` → ALL CHECKS PASS. Still 410 Pairs; every Category keeps at least 8 Pairs per tier.

**Learned for the next audit:** the tier-blind prompt can't tell "Hard" from "too similar". A v2 prompt could tell the evaluator the tier (not the difference) so it judges closeness against the tier's meaning.
