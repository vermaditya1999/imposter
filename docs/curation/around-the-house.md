# Curation log: Around the House

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/around-the-house.json](../../dataset/en/around-the-house.json).

**Totals:** 37 drafted → **30 approved** (27 as drafted, 3 after an edit) · **7 rejected** (19%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Sofa / Couch | reject: QC-02 | Synonyms (the survey's own example). |
| Almirah / Cupboard | reject: QC-02 | Near-synonyms in Indian English. |
| Tiffin / Lunch Box | reject: QC-02 | Synonyms. |
| Blanket / Quilt | reject: QC-02 | Most players use them interchangeably (razai). |
| Fridge / Freezer | reject: QC-02 | The freezer is part of the fridge. |
| Mixer / Grinder | reject: QC-02 | They're one appliance in Indian homes. |
| Iron / Ironing Board | reject: QC-09 | Iron is the base of Iron Man (Characters), and Ironing Board is Iron plus a modifier. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Mixer / Grinder | → **Mixer Grinder / Juicer** | QC-02 (see Rejected). |
| Plate / Bowl *(Medium)* | → **Easy** | QC-01: flat versus deep splits them on the first clue. |
| Fan / AC | → **Fan / Cooler** *(Hard)* and **AC / Room Heater** *(Easy)* | QC-01: Fan/AC was between tiers. A desert cooler makes a truer Hard Pair. |

## Notes

Clothes & Accessories must avoid **Bag** (Bean Bag) and **Shoe** (Shoe Rack). Gadgets must avoid TV-adjacent overlaps with appliances here.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Tawa / Frying Pan (Hard, `en-1104`) | keep (flagged) | Hard by design. Telling difference: a Tawa is flat and rimless for rotis, a Frying Pan has sides for eggs. |
| Glass / Cup (Hard, `en-1108`) | keep (flagged) | Hard by design. Telling difference: the handle, and chai in a cup vs water in a glass. |
| Mixer Grinder / Juicer (Hard, `en-1110`) | edit: QC-02 → **Mixer Grinder / Toaster** (Medium, `en-1110`) | Indian Mixer Grinders come with a juicer jar, so the clues blurred. Retagged Medium. |
| Lock / Key (Easy, `en-1126`) | edit: QC-02 → **Lock / Doorbell** (Easy, `en-1126`) | Lock and Key are a set, so every clue for one implies the other. Doorbell keeps the 'on the front door' overlap. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.
