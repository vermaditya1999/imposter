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

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Photographer / Videographer (Hard, `en-0604`) | keep (flagged) | Hard by design. One clean telling difference: stills vs video (the wedding videographer is familiar to everyone). |
| Barber / Hairstylist (Hard, `en-0606`) | edit: QC-02 → **Barber / Makeup Artist** (Medium, `en-0606`) | Barber and Hairstylist both cut hair and players argue. Makeup Artist keeps the salon and wedding overlap. Retagged Medium. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.
