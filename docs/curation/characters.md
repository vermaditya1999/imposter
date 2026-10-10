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

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Sherlock Holmes / Byomkesh Bakshi (Hard, `en-0904`) | edit: QC-04 → **Sherlock Holmes / James Bond** (Medium, `en-0904`) | Byomkesh Bakshi isn't known to the whole group. James Bond keeps the famous-British-investigator overlap. Retagged Medium. |
| Munna Bhai / Circuit (Hard, `en-0906`) | keep (weakest 10%) | Both are iconic. Circuit is the sidekick, which is itself a clue. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Batman / Iron Man (Hard, `en-0901`) | QC-01 → **Batman / Iron Man (Medium, `en-0901`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Shinchan / Nobita (Hard, `en-0903`) | QC-01 → **Shinchan / Nobita (Medium, `en-0903`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Sherlock Holmes / James Bond (Medium, `en-0904`) | QC-01 → **Sherlock Holmes / James Bond (Easy, `en-0904`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Doraemon / Chhota Bheem (Medium, `en-0914`) | QC-01 → **Doraemon / Chhota Bheem (Easy, `en-0914`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Mario / Pac-Man (Medium, `en-0915`) | QC-01 → **Mario / Pac-Man (Easy, `en-0915`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Munna Bhai / Circuit (Hard, `en-0906`) | QC-15 → **Gandalf / Dumbledore (Hard, `en-0931`)** | Munna Bhai and Circuit are a duo, so every clue for one implies the other. |
| Tom / Jerry (Easy, `en-0923`) | QC-15 → **Darth Vader / Optimus Prime (Easy, `en-0932`)** | Tom and Jerry are a duo, so every clue for one implies the other. |
| SpongeBob / Patrick (Easy, `en-0927`) | QC-15 → **Ben 10 / Johnny Bravo (Easy, `en-0933`)** | SpongeBob and Patrick are a duo from one show. |
| Barbie / Ken (Easy, `en-0928`) | QC-15 → **Chacha Chaudhary / Tenali Raman (Easy, `en-0934`)** | Barbie and Ken are a couple: a set, and a possible relationship trigger. |
| Aladdin / Genie (Easy, `en-0930`) | remove: QC-15 | Aladdin and the Genie are one story's duo. Removed. |
| Winnie the Pooh / Tigger (Easy, `en-0929`) | QC-15 → **Singham / Chulbul Pandey (Hard, `en-0935`)** | Winnie the Pooh and Tigger are friends from one story, so clues bleed across. Replaced with two cop heroes from different films, which keeps Characters at 8 Hard. |
