---
title: "Task: adversarial audit of the v1 Dataset"
type: wayfinder:task
status: open
assignee: ""
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

Record compact scores per Pair (e.g. `distinguishing`, `bluffable`, `giveaway_risk`, `synonym_risk`, `one_sided`, `keep`) in `dataset-drafts/audit-v1.json`, with the model name and prompt version.

Then re-curate every Pair that fails, plus the weakest ~10% overall: fix it or replace it, log each one in its Category's curation log with a QC id, and rerun `scripts/check_dataset.py`.

Fully AFK. Work through the Categories in batches, and write audit results to disk after each Category so a session can resume.

Done when the audit file covers all Pairs, every flagged Pair has been re-curated, and the Machine checks pass.

Out of this ticket: generating new candidates at scale, game simulation, telemetry. See the map's Not yet specified section.
