# Curation log: Movies & Shows

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/movies-shows.json](../../dataset/en/movies-shows.json).

**Totals:** 37 drafted → **29 approved** (24 as drafted, 5 after an edit) · **8 rejected** (22%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Barbie / Oppenheimer | reject: QC-07 | Released in 2023, less than 5 years ago. |
| Pushpa / Kantara | reject: QC-07 | Released in 2021–22, under the 5-year line. |
| Mahabharat / Ramayan | reject: QC-06 | Religious epics. |
| Kabir Singh / Animal | reject: QC-06 | Controversial films, and Animal is under 5 years old. |
| Splitsvilla / Roadies | reject: QC-06 | Splitsvilla is a dating show (relationship triggers). |
| Shark Tank / MasterChef | reject: QC-09 | Shark (Animals) plus a modifier. |
| Lion King / Finding Nemo | reject: QC-09 | Lion (Animals) plus a modifier. |
| The Office / Friends | reject: QC-10, QC-04 | Starts with an article, and less widely watched. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| The Big Bang Theory | → **Big Bang Theory** | QC-10: drops the article, the way people say it. |
| The Lord of the Rings | → **Lord of the Rings** | QC-10: drops the article. |
| Bahubali | → **Baahubali** | QC-10: the film's own spelling. |
| Jab We Met / Yeh Jawaani Hai Deewani *(Hard)* | → **Medium** | QC-01: train versus trek splits them in a couple of clues. |
| Shark Tank / MasterChef | → **Roadies** / MasterChef | QC-09 (see Rejected). |

## Notes

Franchise and show titles reserved here, so Characters must not use them: Harry Potter, Avengers, Finding Nemo (Nemo), Mr. Bean, Shrek, Frozen. Several titles are longer than two words because that's their common name (QC-10).

## Familiarity risks I approved but would cut first

**Deewar** for younger players. **Chhichhore** and **Dhamaal** are less iconic than their partners.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Golmaal / Dhamaal (Hard, `en-0804`) | keep (weakest 10%) | Both are huge comedy franchises; the ensemble vs treasure-hunt split works. |

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Sholay / Deewar (Hard, `en-0801`) | QC-01 → **Sholay / Deewar (Medium, `en-0801`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Kota Factory / Panchayat (Hard, `en-0810`) | QC-01 → **Kota Factory / Panchayat (Medium, `en-0810`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Titanic / Avatar (Medium, `en-0815`) | QC-01 → **Titanic / Avatar (Easy, `en-0815`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Stranger Things / Squid Game (Medium, `en-0818`) | QC-01 → **Stranger Things / Squid Game (Easy, `en-0818`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Finding Nemo / Toy Story (Medium, `en-0821`) | QC-01 → **Finding Nemo / Toy Story (Easy, `en-0821`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Taarak Mehta / CID (Easy, `en-0822`) | keep | Easy. Both are long-running family TV shows with famous catchphrases, which gives three shared clues. |
| Mr. Bean / Home Alone (Easy, `en-0825`) | keep | Easy. Both are slapstick comedies; TV vs film doesn't stop the shared clues. |
