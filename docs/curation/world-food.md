# Curation log: World Food

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/world-food.json](../../dataset/en/world-food.json).

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

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Fried Chicken / Chicken Wings (Hard, `en-0208`) | edit: QC-02 → **Chicken Wings / Chicken Nuggets** (Hard, `en-0208`) | Wings are usually a kind of Fried Chicken. Paired with Nuggets instead (swapped from Fish and Chips). |
| Dim Sum / Bao (Hard, `en-0210`) | edit: QC-02 → **Dim Sum / Spring Roll** (Medium, `en-0210`) | Bao is a kind of Dim Sum. Spring Roll keeps the Chinese-starter overlap. Retagged Medium. |
| Granola / Muesli (Hard, `en-0211`) | replace: QC-02 → **Sausage / Salami** (Hard, `en-0230`) | Granola and Muesli are near-synonyms and Muesli is less known. Replaced with a Hard processed-meat Pair. |
| Fish and Chips / Chicken Nuggets (Medium, `en-0216`) | edit: QC-09 → **Fish and Chips / Fried Chicken** (Medium, `en-0216`) | Nuggets moved to Chicken Wings; Fried Chicken keeps the battered-and-fried overlap. |
| Thai Curry / Satay (Medium, `en-0218`) | keep (weakest 10%) | Satay is on every Pan-Asian menu; the contrast between curry and skewers is clean. |
| Toast / Baked Beans (Easy, `en-0225`) | replace: QC-03 → **Soup / Steak** (Easy, `en-0231`) | Toast and Baked Beans are different kinds of thing (bread vs a side). Replaced with two restaurant courses. |
| Teriyaki / Tempura (Easy, `en-0226`) | replace: QC-08 → **Barbecue / Fondue** (Easy, `en-0232`) | Teriyaki is a sauce and Tempura a batter, so they aren't the same kind of thing, and Teriyaki is less known. Replaced with two group-meal styles. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator. These failed and were replaced again, keeping the id (it was never released):

| Pair | Verdict | Why |
|---|---|---|
| Sausage / Salami (`en-0230`) | replace → **Meatballs / Sausage** (Medium, `en-0230`) | Sausage / Salami failed the blind re-check: Salami is a kind of sausage (QC-02). Retagged Medium. |
| Barbecue / Fondue (`en-0232`) | replace → **Barbecue / Buffet** (Easy, `en-0232`) | Barbecue / Fondue failed the blind re-check: Fondue isn't known to the whole group (QC-04). |

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Kimchi / Coleslaw (Hard, `en-0206`) | QC-01 → **Kimchi / Coleslaw (Medium, `en-0206`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Ramen / Pad Thai (Medium, `en-0217`) | QC-01 → **Ramen / Pad Thai (Easy, `en-0217`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Thai Curry / Satay (Medium, `en-0218`) | QC-01 → **Thai Curry / Satay (Easy, `en-0218`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Dim Sum / Spring Roll (Medium, `en-0210`) | QC-02 → **Dumplings / Spring Roll (Medium, `en-0233`)** | A Spring Roll can be served as dim sum, so Dim Sum was the umbrella term. |
| Soup / Steak (Easy, `en-0231`) | QC-06 → **Popcorn / Pretzel (Easy, `en-0234`)** | Steak means beef, which is awkward for many Indian families, and Soup/Steak shared almost nothing. |
| Barbecue / Buffet (Easy, `en-0232`) | remove: QC-15 | Barbecue and Buffet are ways of eating, not dishes, so the Pair doesn't fit World Food. Removed; the Category stays at 28. |
