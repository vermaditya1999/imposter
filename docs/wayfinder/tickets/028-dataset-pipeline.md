---
title: "Task: a reusable pipeline for generating and checking Pairs"
type: wayfinder:task
status: closed
assignee: "claude"
blocked_by: [25]
parent: map
---

## Question

The v1 audit ran on throwaway scripts. The user wants a pipeline that can always generate more Pairs
and add new themes, documented as a complete harness note. It should also apply the audit's findings
to the whole Dataset (asked 2026-10-10). What does the pipeline look like, and what does it change in
the current Dataset?

## Resolution

Done 2026-10-10. The harness note is [docs/pipeline/README.md](../../pipeline/README.md).

**The pipeline:** draft → pre-check (QC-09/10) → blind audit (fresh Sonnet subagents) → `score.py` →
curate → `apply.py` → blind re-check of every change → machine checks. What changed from the v1 run:
- **The evaluator only scores; code decides.** [audit-v2](../../pipeline/prompts/audit-v2.md) adds a
  tier guess and yes/no checks (kind_of, is_set, same_kind, safe, fits_category). `score.py` applies
  thresholds against the *stored* tier, so Hard Pairs aren't punished for being close. Calibrated on
  v1 data: 3 false fails in 375 Pairs.
- **Ids are handled by code.** `dataset/categories.json` holds the id blocks and retired ids;
  `apply.py` retires a released id whenever a Pair's words change; `check_dataset.py` rejects reused
  ids and now exits non-zero, so a bad dataset fails `npm run build` (before, it only printed errors).
- **New themes** register with `new_category.py`; the app and the tests pick them up from the registry.
- **The checklist** gained the audit's lessons: QC-02 now names subsets and Indian-English synonyms,
  QC-14 names single-signature words, and a new **QC-15** (same kind, not a set).

**First run (audit v2, all 410 Pairs):** 69 failed the tier-aware rules ([audit-v2.json](../../curation/audit-v2.json)).
- **28 retiered, words unchanged:** most Medium Pairs that play as Easy (Titanic/Avatar, Fridge/Microwave),
  and Hard Pairs that play as Medium (Batman/Iron Man).
- **23 given new words.** Story duos (Tom/Jerry, Barbie/Ken, Aladdin/Genie, Munna Bhai/Circuit,
  Hen/Rooster), subsets (Kulfi/Ice Cream, Teacher/Professor, Bank/ATM, Restaurant/Dhaba) and unsafe
  Pairs (Never Have I Ever; Steak, which means beef) were replaced.
- **2 removed:** Barbecue/Buffet and Aladdin/Genie.
- **18 kept** with a written reason.

Every word change passed a blind re-check ([audit-v2-recheck.json](../../curation/audit-v2-recheck.json));
3 of my replacements failed it and were replaced again. Now 408 Pairs, all Categories ≥ 8 per tier,
ALL CHECKS PASS, tests and build pass.
