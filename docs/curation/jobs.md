# Curation log: Jobs

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/jobs.json](../../dataset/en/jobs.json).

**Totals:** 37 drafted → **29 approved** (26 as drafted, 3 after an edit) · **8 rejected** (22%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Doctor / Surgeon | reject: QC-02 | A Surgeon is a kind of Doctor. |
| Chef / Cook | reject: QC-02 | Near-synonyms. |
| Accountant / CA | reject: QC-02 | A CA is a kind of accountant. |
| YouTuber / Influencer | reject: QC-02 | Overlapping roles with no clear telling difference. |
| Carpenter / Painter | reject: QC-02 | "Painter" is ambiguous (house painter or artist). |
| Priest / Monk | reject: QC-06 | Religion. |
| Politician / Minister | reject: QC-06 | Politics. |
| Astronaut / Scientist | reject: QC-09 | Scientist would be the base of Data Scientist. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Watchman / Gardener | → **Gardener / Zookeeper** | QC-02: Watchman is a synonym of Security Guard, which is already used. |
| Doctor / Nurse *(Hard)* | → **Medium** | QC-01: prescribe versus care splits them in a couple of clues. |
| Astronaut / Scientist | → Astronaut / **Scuba Diver** | QC-09 (see Rejected). Suits and oxygen tanks give the Pair three shared clues. |

## Notes

"Air Hostess" is used because it's the everyday Indian English term. "Cabin Crew" is the neutral alternative if the group prefers it.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Photographer / Videographer (Hard, `en-0604`) | keep (flagged) | Hard by design. One clean telling difference: stills vs video (the wedding videographer is familiar to everyone). |
| Barber / Hairstylist (Hard, `en-0606`) | edit: QC-02 → **Barber / Makeup Artist** (Medium, `en-0606`) | Barber and Hairstylist both cut hair and players argue. Makeup Artist keeps the salon and wedding overlap. Retagged Medium. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Farmer / Fisherman (Medium, `en-0618`) | QC-01 → **Farmer / Fisherman (Easy, `en-0618`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Dentist / Vet (Medium, `en-0620`) | QC-01 → **Dentist / Vet (Easy, `en-0620`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Teacher / Professor (Hard, `en-0602`) | QC-02 → **Teacher / Principal (Hard, `en-0630`)** | A Professor is a kind of teacher. |
| Journalist / News Anchor (Hard, `en-0603`) | QC-02 → **News Anchor / Radio Jockey (Hard, `en-0631`)** | A News Anchor is a kind of journalist. |
| Singer / Rapper (Hard, `en-0609`) | QC-02 → **Singer / DJ (Medium, `en-0632`)** | A Rapper is arguably a kind of singer. Retagged Medium. |
| News Anchor / Radio Jockey (Hard, `en-0631`) | QC-09 → **News Anchor / RJ (Hard, `en-0631`)** | Radio Jockey failed the modifier rule against Radio (Gadgets); RJ is the everyday Indian word anyway. |
