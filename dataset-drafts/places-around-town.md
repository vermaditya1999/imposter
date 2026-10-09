# Curation log: Places Around Town

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../docs/quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/places-around-town.json](../dataset/en/places-around-town.json).

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
