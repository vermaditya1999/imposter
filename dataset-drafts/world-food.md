# Curation log: World Food

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../docs/quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/world-food.json](../dataset/en/world-food.json).

**Totals:** 38 drafted → **29 approved** (23 as drafted, 6 after an edit) · **9 rejected** (24%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Shawarma / Doner | reject: QC-02 | Same dish under different regional names. |
| Pizza / Calzone | reject: QC-02 | A Calzone is a folded pizza, so the two words sit at different levels. |
| Ramen / Pho | reject: QC-04 | Pho is not well known. |
| Risotto / Paella | reject: QC-04 | Neither is everyday food for the group. |
| Dim Sum / Spring Roll | reject: QC-08 | Spring Roll is Indo-Chinese, which belongs in Indian Food. |
| Ramen / Thukpa | reject: QC-04, QC-08 | Thukpa is regional, and it's unclear whether it's Indian or world food. |
| Steak / Pork Chop | reject: QC-05 | Beef and pork are a poor fit for a mixed Indian group. |
| Bacon / Sausage | reject: QC-05 | Pork. |
| Pancake / French Toast | reject: QC-09 | French Toast is Toast plus a modifier (Toast is used). |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Thai Curry / Tom Yum | → Thai Curry / **Satay** | QC-09: Tom Yum clashes with Tom (Characters). Caught by the check script. |
| Lasagna / Mac and Cheese | → **Lasagne** | QC-10: British spelling. |
| Hot Dog / Sandwich | → **Panini / Club Sandwich** *(Medium)* | QC-09: Sandwich is the base of Bombay Sandwich (Indian Food), and Hot Dog clashes with Dog (Animals). Caught by the check script. |
| French Fries / Onion Rings *(Hard)* | → **Medium** | QC-01: "potato" splits them on the first clue. |
| Hummus / Guacamole *(Medium)* | → **Easy** | QC-01: colour gives it away immediately. |
| Croissant / Bagel *(Medium)* | → **Easy** | QC-01: shape splits them on the first clue. |

## Notes

Condiments (Ketchup, Mustard, Salsa, Mayonnaise) are included as accompaniments, the same way Indian Food includes Chutney and Raita.

## Familiarity risks I approved but would cut first

**Bao**, **Sashimi**, **Quesadilla**, **Satay**, **Pad Thai**, **Teriyaki**, **Tempura**, **Kimchi**: well known in metro cafés, less so elsewhere.
