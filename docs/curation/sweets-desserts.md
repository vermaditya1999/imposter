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
