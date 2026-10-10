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

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Tawa / Frying Pan (Hard, `en-1104`) | keep (flagged) | Hard by design. Telling difference: a Tawa is flat and rimless for rotis, a Frying Pan has sides for eggs. |
| Glass / Cup (Hard, `en-1108`) | keep (flagged) | Hard by design. Telling difference: the handle, and chai in a cup vs water in a glass. |
| Mixer Grinder / Juicer (Hard, `en-1110`) | edit: QC-02 → **Mixer Grinder / Toaster** (Medium, `en-1110`) | Indian Mixer Grinders come with a juicer jar, so the clues blurred. Retagged Medium. |
| Lock / Key (Easy, `en-1126`) | edit: QC-02 → **Lock / Doorbell** (Easy, `en-1126`) | Lock and Key are a set, so every clue for one implies the other. Doorbell keeps the 'on the front door' overlap. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Kettle / Flask (Hard, `en-1107`) | QC-01 → **Kettle / Flask (Medium, `en-1107`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Mixer Grinder / Toaster (Medium, `en-1110`) | QC-01 → **Mixer Grinder / Toaster (Easy, `en-1110`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Pressure Cooker / Kadai (Medium, `en-1111`) | QC-01 → **Pressure Cooker / Kadai (Easy, `en-1111`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Fridge / Microwave (Medium, `en-1112`) | QC-01 → **Fridge / Microwave (Easy, `en-1112`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Geyser / Inverter (Medium, `en-1121`) | QC-01 → **Geyser / Inverter (Easy, `en-1121`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Mirror / Window (Easy, `en-1127`) | keep | Easy. Both are glass things on a wall that you look into or through. |
| Clock / Calendar (Easy, `en-1129`) | keep | Easy. Both are wall items that tell time. |
