# Curation log: Travel Destinations

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/travel-destinations.json](../../dataset/en/travel-destinations.json).

**Totals:** 36 drafted → **29 approved** (25 as drafted, 4 after an edit) · **7 rejected** (19%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| India / Pakistan | reject: QC-06 | Politically charged. |
| Kashmir / Ladakh | reject: QC-06 | Politically charged. |
| Rishikesh / Haridwar | reject: QC-06 | Haridwar is mainly a pilgrimage town. |
| Agra / Amritsar | reject: QC-06 | Amritsar's main clue is the Golden Temple. |
| Ladakh / Spiti | reject: QC-04 | Spiti is not widely known. |
| Lonavala / Mahabaleshwar | reject: QC-04 | Regional (Maharashtra weekend trips). |
| Leh / Ladakh | reject: QC-02 | Leh is the town in Ladakh, so the two words sit at different levels. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Agra / Mysore | → Agra / **Jaisalmer** | QC-09: Mysore clashes with Mysore Pak (Sweets & Desserts). Caught by the check script. |
| Bali / Thailand | → Bali / **Phuket** | QC-02: island against country is a level mismatch. |
| Tokyo / Seoul | → **Japan / South Korea** | QC-04: the countries carry more shared references (K-dramas, sushi). |
| Rishikesh / Haridwar | → Rishikesh / **Mussoorie** | QC-06: avoids the pilgrimage angle. |

## Notes

Landmarks appear only where they are destinations in their own right (Mount Everest, Niagara Falls). Cities, states, islands and countries are all "places you go on a trip", and each Pair matches level (city with city, country with country).

## Familiarity risks I approved but would cut first

**Pondicherry**, **Kodaikanal**, **Gangtok**, **Mauritius**.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Agra / Jaisalmer (Medium, `en-0514`) | edit: QC-14 → **Jaisalmer / Rann of Kutch** (Medium, `en-0514`) | One Taj Mahal clue gives Agra away. Rann of Kutch keeps the desert, camels and tents overlap. |
| Paris / London (Medium, `en-0515`) | keep (flagged) | Safe clues are shared with many cities (Europe, river, museums, metro, shopping), so a Blank-mode imposter must still pick among them. Same tier as the Mumbai/Delhi anchor. |
| Antarctica / Sahara (Easy, `en-0528`) | replace: QC-04 → **Thailand / Russia** (Easy, `en-0530`) | Antarctica gives itself away (ice, penguins) and neither word is a trip the group takes. Replaced with two foreign countries Indians visit. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Switzerland / New Zealand (Easy, `en-0524`) | QC-01 → **Switzerland / New Zealand (Medium, `en-0524`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Kerala / Andaman (Medium, `en-0518`) | QC-15 → **Kerala / Rajasthan (Easy, `en-0531`)** | Kerala is a state and the Andaman Islands a territory, so the scope was uneven. Retagged Easy to keep the tier mix. |
| Mount Everest / Niagara Falls (Easy, `en-0525`) | QC-14 → **Bhutan / Vietnam (Easy, `en-0532`)** | Mount Everest and Niagara Falls are each the only famous one of their kind, and they share almost nothing. |
