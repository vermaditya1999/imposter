---
title: "Prototype: pilot batch — one full Category authored and curated"
type: wayfinder:prototype
status: closed
assignee: "claude"
blocked_by: [004, 005, 006]
parent: map
---

## Question

Does the authoring workflow hold up? Claude drafts ~30 Pairs for one v1 Category in the agreed schema; the user curates each against the Quality Checklist. Measure the reject/edit rate, broken down by failed criterion ID (QC-xx), and note where the checklist or schema needs to change before bulk authoring.

## Resolution

*Claude drafted and curated this batch on the user's delegation (2026-10-09).*

**The workflow holds up.** Indian Food has 30 approved Pairs (10 Hard, 11 Medium, 9 Easy) and passes every Machine check. From 39 drafts: **9 rejected (23%)** and **6 edited**. By criterion:

| Criterion | Rejects | Edits |
|---|---|---|
| QC-02 too similar | 3 | |
| QC-04 familiarity | 3 | |
| QC-08 / QC-11 wrong Category | 2 | |
| QC-03 too distant | 1 | |
| QC-01 difficulty retiered | | 3 |
| QC-09 modifier overlap | | 1 (it caught a second mistake while fixing the first) |
| QC-10 plural name | | 1 |
| Pair restructured to free a word | | 1 |

**What changed before bulk authoring:**
- **QC-09** gained the modifier rule: no word may be another word plus a modifier.
- **QC-10** allows plurals when the common name is plural (Momos).
- **Indian Food** explicitly includes Indo-Chinese dishes and accompaniments (pickle, raita, chutney).
- **The schema needed no change.** The `difference` field was the most useful tool for spotting QC-02 failures.

**Caveat:** Claude both drafted and curated, so the reject rate measures Claude checking itself, not a second person's judgement. The biggest gap is QC-04: Claude can't know the group's regional mix. The log lists five regional words to cut first if the group can't place them.

**Bulk workflow:**
- One Category per session. Claude drafts ~35–40 Pairs and curates them in `dataset-drafts/<category-id>.md`, using the same reject/edit tables as this pilot.
- Approved Pairs go in `dataset/en/<category-id>.json`.
- Run the Machine checks across the whole locale before closing, not just the new Category.
- **Id blocks** stop parallel sessions from colliding: Category *n* in the v1 Category list uses ids `en-(n−1)01`…`en-(n−1)99`. Indian Food used `en-0001`…`en-0030`.

Assets:
- [curation log](../../dataset-drafts/indian-food.md)
- [dataset/en/indian-food.json](../../dataset/en/indian-food.json)
