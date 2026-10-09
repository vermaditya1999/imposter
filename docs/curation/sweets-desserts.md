# Curation log: Sweets & Desserts

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/sweets-desserts.json](../../dataset/en/sweets-desserts.json).

**Totals:** 39 drafted → **29 approved** (24 as drafted, 5 after an edit) · **10 rejected** (26%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Kheer / Payasam | reject: QC-02 | Same dish, regional names. |
| Gulab Jamun / Kala Jamun | reject: QC-02 | Kala Jamun is a darker Gulab Jamun: no real telling difference. |
| Barfi / Kalakand | reject: QC-02 | Kalakand is a type of Barfi, so the two words sit at different levels. |
| Rabri / Basundi | reject: QC-02, QC-04 | Near-identical, and Basundi is regional. |
| Jelly / Gola | reject: QC-04 | Gola is a Mumbai name (Chuski in Delhi), so it's regional. |
| Chikki / Gajak | reject: QC-04 | Gajak is mostly known in North India in winter. |
| Brownie / Lava Cake | reject: QC-09 | Lava Cake is Cake plus a modifier. |
| Shahi Tukda / Bread Pudding | reject: QC-09 | Bread Pudding is Pudding plus a modifier. |
| Candy Floss / Caramel Popcorn | reject: QC-09 | Caramel Popcorn is Caramel plus a modifier. Caught by the check script. |
| Softy / Frozen Yogurt | reject: QC-04, QC-10 | Softy is a regional name, and Yogurt/Yoghurt has no single spelling standard. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Donut / Churros | → **Doughnut** / Churros | QC-10: British spelling. |
| Custard / Pudding *(Hard)* | → **Jelly** / Custard *(Easy)*; Pudding paired with Mousse | QC-02: Custard and Pudding overlap too much in Indian usage (caramel custard is called pudding). |
| Kulfi / Ice Cream *(Medium)* | → **Hard** | QC-01: almost every clue fits both. |
| Gajar Halwa / Moong Dal Halwa *(Hard)* | → **Medium** | QC-01: colour and main ingredient split them quickly. |
| Ladoo / Chikki | → **Kaju Katli** / Chikki and Ladoo / **Gulab Jamun** | QC-03: Ladoo and Chikki shared too few clues. Two Easy Pairs work better. |

## Notes

Black Forest and Red Velvet are named without the word "Cake", because QC-09 forbids "Black Forest Cake" alongside Cake.

## Familiarity risks I approved but would cut first

**Imarti**, **Mishti Doi**, **Mysore Pak**, **Malpua**, **Gujiya**, **Phirni**, **Mukhwas** are regional or less common.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Kheer / Phirni (Hard, `en-0102`) | keep (flagged) | Hard by design. One telling difference: Phirni is ground rice set cold in clay pots, Kheer is whole-grain rice. As close as the Rasgulla/Rasmalai anchor. |
| Jalebi / Imarti (Hard, `en-0103`) | edit: QC-04 → **Jalebi / Churros** (Medium, `en-0103`) | Imarti isn't known to the whole group. Churros keeps the fried-batter-and-sugar overlap. Retagged Medium. |
| Pie / Tart (Hard, `en-0106`) | replace: QC-02 → **Kalakand / Milk Cake** (Hard, `en-0130`) | Pie/Tart overlap too much and Tart is little known. Replaced with a Hard Indian milk-sweet Pair (Cake left the Dataset with Brownie/Cake, so Milk Cake passes QC-09). |
| Butterscotch / Caramel (Hard, `en-0111`) | edit: QC-02 → **Butterscotch / Tutti Frutti** (Hard, `en-0111`) | Butterscotch and Caramel are near-synonym flavours. Tutti Frutti is the other 'bits in ice cream and cake' flavour, with a clean colour difference. |
| Brownie / Cake (Medium, `en-0112`) | edit: QC-02 → **Brownie / Lava Cake** (Hard, `en-0112`) | Cake is the umbrella term, so the Pair played one-sided and Cake was the obvious Blank-mode guess. Lava Cake keeps the warm-chocolate overlap. Retagged Hard. |
| Doughnut / Churros (Medium, `en-0113`) | edit: QC-09 → **Doughnut / Cinnamon Roll** (Medium, `en-0113`) | Churros moved to Jalebi; Cinnamon Roll keeps the café-pastry overlap. |
| Pastry / Swiss Roll (Medium, `en-0116`) | keep (weakest 10%) | In Indian English a Pastry is a specific cream-cake slice, not a broad term. |
| Pudding / Mousse (Medium, `en-0120`) | edit: QC-02 → **Mousse / Fruit Salad** (Medium, `en-0120`) | Pudding is a loose catch-all that overlaps Mousse. Fruit Salad keeps the chilled-dessert-in-a-bowl overlap. |
| Chocolate / Toffee (Easy, `en-0122`) | keep (weakest 10%) | Easy by design; toffee's chewiness is a clean contrast. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator. These failed and were replaced again, keeping the id (it was never released):

| Pair | Verdict | Why |
|---|---|---|
| Kalakand / Milk Cake (`en-0130`) | replace → **Ice Gola / Slush** (Hard, `en-0130`) | Kalakand / Milk Cake failed the blind re-check as too close and Milk Cake isn't known to the whole group (QC-02, QC-04). |
| Ice Gola / Slush (`en-0130`) | replace → **Ice Gola / Milkshake** (Medium, `en-0130`) | Ice Gola / Slush failed the second blind check as too close (QC-02). Retagged Medium. |
| Ice Gola / Milkshake (`en-0130`) | keep (third check) | The evaluator scored bluffable 4, which is not below the keep threshold, and listed three shared clues (cold, sweet, best in summer), so it passes QC-03. |
