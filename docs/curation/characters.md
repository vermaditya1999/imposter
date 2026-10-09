# Curation log: Characters

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/characters.json](../../dataset/en/characters.json).

**Totals:** 36 drafted → **30 approved** (27 as drafted, 3 after an edit) · **6 rejected** (17%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Mickey Mouse / Donald Duck | reject: QC-09 | Mouse and Duck (Animals) plus a modifier. |
| Nemo / Dory | reject: QC-09 | Nemo is the base of Finding Nemo (Movies & Shows). |
| Harry Potter / Frodo | reject: QC-09 | Harry Potter is already used as a Movies & Shows title. |
| Hanuman / Chhota Bheem | reject: QC-06 | Religious figure. |
| Santa Claus / Easter Bunny | reject: QC-06 | Religious holidays. |
| Simba / Mufasa | reject: QC-04 | Mufasa is less known than his son. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Sherlock Holmes / James Bond *(Medium)* | → Sherlock Holmes / **Byomkesh Bakshi** *(Hard)* | QC-01: a truer Hard Pair (two detectives), and more local (QC-05). |
| Minions / Smurfs *(Medium)* | → **Easy** | QC-01: yellow versus blue splits them on the first clue. |
| Mickey Mouse / Pluto | → **Scooby-Doo** / Pluto | QC-09 (see Rejected). |

## Notes

Iron Man is used here, so Around the House must not use "Iron" (clothes iron). Pairs come from the same story only when the two characters are clearly different (Tom/Jerry, Aladdin/Genie).

## Familiarity risks I approved but would cut first

**Byomkesh Bakshi** (better known in the East), **Pluto**, **Deadpool**.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](audit-prompt-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Sherlock Holmes / Byomkesh Bakshi (Hard, `en-0904`) | edit: QC-04 → **Sherlock Holmes / James Bond** (Medium, `en-0904`) | Byomkesh Bakshi isn't known to the whole group. James Bond keeps the famous-British-investigator overlap. Retagged Medium. |
| Munna Bhai / Circuit (Hard, `en-0906`) | keep (weakest 10%) | Both are iconic. Circuit is the sidekick, which is itself a clue. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.
