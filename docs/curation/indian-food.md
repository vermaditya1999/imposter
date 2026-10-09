# Curation log: Indian Food (pilot)

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/indian-food.json](../../dataset/en/indian-food.json).

**Totals:** 39 drafted → **30 approved** (24 as drafted, 6 after an edit) · **9 rejected** (23%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Frankie / Kathi Roll | reject: QC-02 | Regional names for the same thing (a Frankie is Mumbai's Kathi Roll). |
| Chana Masala / Chole | reject: QC-02 | Same dish, two names. |
| Momos / Dumpling | reject: QC-02 | A Momo *is* a dumpling: the two words aren't the same kind of thing at the same level. |
| Haleem / Nihari | reject: QC-04 | Well known in Hyderabad, Lucknow and Old Delhi, but not to everyone in the group. |
| Litti Chokha / Dal Baati | reject: QC-04 | Too regional (Bihar / Rajasthan). |
| Bhel Puri / Jhalmuri | reject: QC-04 | Jhalmuri is mostly known in Kolkata. |
| Gulab Jamun / Rasgulla | reject: QC-08 | Sweets belong in Sweets & Desserts. |
| Masala Chai / Lassi | reject: QC-08, QC-11 | Drinks aren't part of this Category. |
| Thali / Kathi Roll | reject: QC-03 | A whole meal versus a single snack: no three clues fit both. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Momo / Kathi Roll | → **Momos** / Kathi Roll | QC-10 says singular, but nobody says "a Momo". The checklist now allows the plural when that's the common name. |
| Paratha / Kulcha | → **Naan** / Kulcha | QC-01: Naan/Kulcha are both tandoor breads made from maida, so it's a truer Hard Pair. Paratha moved to Roti/Paratha (Medium). |
| Gobi Manchurian / Chilli Paneer *(Hard)* | → **Medium** | QC-01: the main ingredient differs, so a couple of clues split them. |
| Poha / Upma *(Medium)* | → **Hard** | QC-01: both are yellow tempered breakfasts with almost identical clues. Flattened rice versus semolina is the one telling difference. |
| Medu Vada / Aloo Paratha *(Easy)* | → Medu Vada / **Dahi Vada** *(Medium)* | QC-09 (amended): "Aloo Paratha" is just Paratha with a modifier. The replacement, Bread Pakora, was caught by the same check (Pakora is already used). |
| Hakka Noodles / Fried Rice *(Medium)* | → **Easy** | QC-01: the first clue (noodles versus rice) splits them, like Train/Aeroplane. |

## Familiarity risks I approved but would cut first

These pass QC-04 for a broadly urban Indian group, but they're regional. If the group is mostly North Indian or mostly South Indian, these are the ones to replace: **Dabeli**, **Misal Pav**, **Appam**, **Kadhi**, **Rasam**.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Cutlet / Aloo Tikki (Hard, `en-0010`) | edit: QC-02 → **Aloo Tikki / Hara Bhara Kebab** (Medium, `en-0010`) | Cutlet is too vague (veg, chicken, crumbed) to clue against Aloo Tikki; swapped for a clearly different patty. Retagged Medium: colour splits them in a couple of clues. |
| Bhature / Appam (Easy, `en-0024`) | keep (flagged) | Easy by design (first clue gives the imposter away). Shared clues exist: bread, eaten with curry, round, puffy. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.
