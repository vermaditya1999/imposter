# Curation log: Clothes & Accessories

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/clothes-accessories.json](../../dataset/en/clothes-accessories.json).

**Totals:** 38 drafted → **29 approved** (23 as drafted, 6 after an edit) · **9 rejected** (24%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Wallet / Purse | reject: QC-05 | In Indian English a purse often means a wallet. |
| Scarf / Muffler | reject: QC-02 | Near-synonyms in India. |
| Flip-Flops / Chappal | reject: QC-02 | Synonyms. |
| Sweater / Cardigan | reject: QC-02 | A Cardigan is a kind of sweater. |
| Mojari / Jutti | reject: QC-02 | Synonyms. |
| Shirt / T-Shirt | reject: QC-09 | T-Shirt is Shirt plus a modifier, even without a space. |
| Turban / Cap | reject: QC-06 | Religious significance. |
| Necklace / Mangalsutra | reject: QC-06 | Religious and marital symbol. |
| Nike / Adidas | reject: QC-08 | Brands belong in Brands & Apps (and are already used there). |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Wallet / Purse | → Wallet / **Clutch** | QC-05 (see Rejected). |
| Mojari / Jutti | → **Kolhapuri** / Jutti | QC-02 (see Rejected). |
| Ring / Earring | → Ring / **Bangle** and **Earrings / Nose Pin** | QC-09 in spirit: Earring is a compound of Ring. |
| Sweater / Cardigan | → Sweater / **Jacket** | QC-02 (see Rejected). |
| Watch / Bracelet *(Medium)* | → **Easy** | QC-01: "tells the time" splits them on the first clue. |
| Earrings / Nose Pin *(Medium)* | → **Easy** | QC-01: ear versus nose splits them on the first clue. |

## Notes

Bag and Shoe are avoided (Bean Bag and Shoe Rack are in Around the House). "Watch" (here) and "Smartwatch" (Gadgets) are different words, so QC-09 allows both.

## Familiarity risks I approved but would cut first

**Kolhapuri**, **Jutti** (regional footwear names).

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Shawl / Dupatta (Hard, `en-1203`) | keep (flagged) | Hard by design. Telling difference: a Shawl is for warmth in winter, a Dupatta is light and part of a suit. |
| Salwar / Churidar (Hard, `en-1204`) | edit: QC-02 → **Salwar / Palazzo** (Hard, `en-1204`) | A Churidar is a kind of Salwar. Palazzo keeps the 'loose pants worn with a kurta' overlap. |
| Dhoti / Lungi (Hard, `en-1205`) | keep (flagged) | Hard by design. Telling difference: a Dhoti is tucked between the legs and formal, a Lungi is a casual tube. |
| Chappal / Sandal (Hard, `en-1206`) | replace: QC-02 → **Leggings / Jeggings** (Hard, `en-1230`) | Chappal and Sandal are synonyms in Indian English (Flip-Flops/Chappal was rejected for the same reason). Replaced with a Hard Pair. |
| Cap / Hat (Hard, `en-1207`) | edit: QC-02 → **Cap / Helmet** (Medium, `en-1207`) | Cap and Hat are used interchangeably. Retagged Medium. |
| Jeans / Trousers (Medium, `en-1213`) | edit: QC-02 → **Jeans / Cargo Pants** (Medium, `en-1213`) | Jeans are a kind of trousers, so the Pair was one-sided. |
| Sweater / Jacket (Medium, `en-1218`) | keep (flagged) | Medium. Knit vs zip and buttons is a clean split; the evaluator flagged it as borderline only. |
| Gown / Frock (Medium, `en-1219`) | edit: QC-02 → **Gown / Tuxedo** (Medium, `en-1219`) | A Gown and a Frock are both one-piece dresses and players argue. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator. These failed and were replaced again, keeping the id (it was never released):

| Pair | Verdict | Why |
|---|---|---|
| Leggings / Jeggings (`en-1230`) | replace → **Dungarees / Jumpsuit** (Hard, `en-1230`) | Leggings / Jeggings failed the blind re-check as near-synonyms (QC-02). |

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Cap / Helmet (Medium, `en-1207`) | QC-01 → **Cap / Helmet (Easy, `en-1207`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
