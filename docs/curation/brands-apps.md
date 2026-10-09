# Curation log: Brands & Apps

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/brands-apps.json](../../dataset/en/brands-apps.json).

**Totals:** 37 drafted → **30 approved** (26 as drafted, 4 after an edit) · **7 rejected** (19%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Domino's / Pizza Hut | reject: QC-09 | Pizza (World Food) plus a modifier. |
| McDonald's / Burger King | reject: QC-09 | Burger (World Food) plus a modifier. |
| Candy Crush / Subway Surfers | reject: QC-09 | Subway plus a modifier. |
| Patanjali / Dabur | reject: QC-06 | Patanjali is tied to a religious and political figure. |
| Tinder / Bumble | reject: QC-06 | Dating apps (relationship triggers). |
| Byju's / Unacademy | reject: QC-06, QC-07 | Byju's collapse made it controversial. |
| WhatsApp / Telegram | reject: QC-04 | Telegram is not used by everyone in the group. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Starbucks / Café Coffee Day | → Starbucks / **CCD** | QC-09: Café (Places Around Town) plus a modifier. CCD is also the common name (QC-10). |
| Coca-Cola / Pepsi | → **Coke** / Pepsi | QC-10: the common name. |
| Lays / Kurkure | → **Lay's** | QC-10: the brand's spelling. |
| Instagram / Snapchat | → **WhatsApp / Instagram** | QC-04: Snapchat is little used in India. |

## Notes

Brands are naturally Hard (two companies doing the same job), so this Category is weighted toward Hard. Every Hard Pair still passes QC-02: the group would say different things about each brand. Gadgets must use generic product names (Smartphone, not iPhone).

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Swiggy / Zomato (Hard, `en-1001`) | keep (flagged) | A Hard anchor Pair; closeness is the point. |
| Maggi / Yippee (Hard, `en-1005`) | replace: QC-14 → **Surf Excel / Tide** (Hard, `en-1031`) | Maggi is named outright from almost any noodle clue. Replaced with a Hard detergent-brand Pair. |
| Bournvita / Horlicks (Hard, `en-1010`) | keep (flagged) | Hard by design. Telling difference: chocolatey Bournvita vs malty Horlicks. |
| Google / Wikipedia (Easy, `en-1023`) | keep (weakest 10%) | Easy by design. |
| Spotify / Kindle (Easy, `en-1029`) | edit: QC-03 → **Spotify / Alexa** (Easy, `en-1029`) | Spotify and Kindle share almost nothing. Alexa keeps the 'play a song' overlap. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator. These failed and were replaced again, keeping the id (it was never released):

| Pair | Verdict | Why |
|---|---|---|
| Surf Excel / Tide (`en-1031`) | replace → **Zara / H&M** (Hard, `en-1031`) | Surf Excel / Tide failed the blind re-check as near-synonyms (QC-02). |
| Zara / H&M (`en-1031`) | replace → **Decathlon / IKEA** (Medium, `en-1031`) | Zara / H&M failed the second blind check as near-identical fast-fashion chains (QC-02). Retagged Medium. |
