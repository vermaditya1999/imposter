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

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Bank / ATM (Hard, `en-0404`) | keep (weakest 10%) | A clean telling difference (loans and a manager vs a machine in a booth). |
| Fire Station / Post Office (Easy, `en-0425`) | keep (flagged) | Easy by design. Shared clues: red (post box, fire engine), government job, uniforms, vans, one in every area. |
| Construction Site / Farm (Easy, `en-0428`) | edit: QC-08 → **Construction Site / Warehouse** (Easy, `en-0428`) | A Farm isn't a place around town. Warehouse keeps the workers, trucks and dust overlap (Factory fails QC-09 against Kota Factory). |
| Highway / Flyover (Easy, `en-0430`) | edit: QC-02 → **Flyover / Railway Crossing** (Easy, `en-0430`) | A Flyover is a section of road, so Highway blurred. Railway Crossing keeps the traffic-spot overlap. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Bank / ATM (Hard, `en-0404`) | QC-02 → **Bank / Post Office (Hard, `en-0431`)** | An ATM is part of a bank, so the Pair played one-sided. Post Office shares counters, queues, forms and passbooks. |
| Fire Station / Post Office (Easy, `en-0425`) | QC-09 → **Fire Station / Bus Depot (Easy, `en-0432`)** | Post Office moved to Bank. A Bus Depot keeps the big-vehicle-garage and uniformed-staff overlap. |
| Restaurant / Dhaba (Medium, `en-0412`) | QC-02 → **Dhaba / Food Truck (Medium, `en-0433`)** | A Dhaba is a kind of restaurant. Food Truck keeps the casual-roadside-food overlap. |
| Hospital / Clinic (Hard, `en-0401`) | keep | Hard. A Clinic isn't a kind of hospital: beds, wards and emergencies are the telling difference. |
| Museum / Art Gallery (Hard, `en-0407`) | keep | Hard. Siblings, not a subset: artefacts and history vs paintings on walls. |
