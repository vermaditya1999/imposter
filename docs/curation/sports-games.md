# Curation log: Sports & Games

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/sports-games.json](../../dataset/en/sports-games.json).

**Totals:** 37 drafted → **29 approved** (26 as drafted, 3 after an edit) · **8 rejected** (22%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Billiards / Snooker | reject: QC-02, QC-04 | Most people can't name a difference. |
| Pittu / Seven Stones | reject: QC-02 | The same game under regional names. |
| Monopoly / Business | reject: QC-02 | Business is the Indian Monopoly clone. |
| Tennis / Table Tennis | reject: QC-09 | Tennis plus a modifier. |
| Rugby / American Football | reject: QC-09 | Football plus a modifier. |
| Swimming / Diving | reject: QC-09 | Swimming would be the base of Swimming Pool (Places Around Town). |
| Arm Wrestling / Tug of War | reject: QC-09 | Wrestling plus a modifier. |
| PUBG / Free Fire | reject: QC-07 | Trend-dependent, and both have been banned in India. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Cycling / Horse Riding | → Cycling / **Trekking** | QC-09: Horse Riding clashes with Horse (Animals). Caught by the check script. |
| Billiards / Snooker | → **Carrom** / Billiards *(Medium)* | QC-02 (see Rejected). Carrom gives an Indian counterpart with a clear difference. |
| Antakshari / Dumb Charades *(Hard)* | → **Medium** | QC-01: singing versus miming splits them quickly. |

## Notes

Includes sports, board and card games, playground games and party games: all things you play. No players or teams (QC-07).

## Familiarity risks I approved but would cut first

**Chor Police**, **Kayaking**, **Teen Patti** (some families may object to a gambling game).

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Poker / Teen Patti (Hard, `en-0703`) | keep (flagged) | Hard by design. Telling difference: Teen Patti is three cards at Diwali, Poker is five cards, chips and casinos. |

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Truth or Dare / Never Have I Ever (Hard, `en-0706`) | QC-06 → **Truth or Dare / Would You Rather (Hard, `en-0730`)** | Never Have I Ever drifts into drinking and sexual confessions, which isn't safe with parents in the room. |
