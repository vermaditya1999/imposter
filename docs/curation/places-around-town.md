# Curation log: Places Around Town

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/places-around-town.json](../../dataset/en/places-around-town.json).

**Totals:** 39 drafted → **30 approved** (26 as drafted, 4 after an edit) · **9 rejected** (23%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Cinema / Theatre | reject: QC-02 | In Indian English, "theatre" means a cinema. |
| Park / Garden | reject: QC-02 | No real difference to hint at. |
| Pub / Bar | reject: QC-02 | Near-synonyms. |
| Chemist / Medical Store | reject: QC-02 | Synonyms in Indian English. |
| Temple / Church | reject: QC-06 | Places of worship are excluded. |
| Park / Amusement Park | reject: QC-09 | Amusement Park is Park plus a modifier. |
| Café / Ice Cream Parlour | reject: QC-09 | Ice Cream (Sweets & Desserts) plus a modifier. |
| Café / Chai Tapri | reject: QC-04 | Tapri is a Mumbai and Pune word. |
| Laundromat / Dry Cleaner | reject: QC-05 | Laundromat is an American word and an American thing. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Office / Factory | → **Construction Site / Farm** | QC-09: Office clashes with Post Office, and then Factory clashes with Kota Factory (Movies & Shows). Both caught by the check script. |
| Mall / Market *(Hard)* | → **Medium** | QC-01: indoor versus open-air splits them in a couple of clues. |
| Airport / Railway Station *(Medium)* | → **Easy** | QC-01: matches the Train/Aeroplane Easy anchor. |
| Café / Chai Tapri | → Café / **Tea Stall** | QC-04: the pan-Indian name. |

## Notes

Later Categories must avoid these words, because QC-09 would flag them: **Pool** (use Billiards or Snooker), **Yoga**, **Bowling**, **Park**, **Station**, **Market**.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Bank / ATM (Hard, `en-0404`) | keep (weakest 10%) | A clean telling difference (loans and a manager vs a machine in a booth). |
| Fire Station / Post Office (Easy, `en-0425`) | keep (flagged) | Easy by design. Shared clues: red (post box, fire engine), government job, uniforms, vans, one in every area. |
| Construction Site / Farm (Easy, `en-0428`) | edit: QC-08 → **Construction Site / Warehouse** (Easy, `en-0428`) | A Farm isn't a place around town. Warehouse keeps the workers, trucks and dust overlap (Factory fails QC-09 against Kota Factory). |
| Highway / Flyover (Easy, `en-0430`) | edit: QC-02 → **Flyover / Railway Crossing** (Easy, `en-0430`) | A Flyover is a section of road, so Highway blurred. Railway Crossing keeps the traffic-spot overlap. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.
