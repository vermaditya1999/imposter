# Curation log: Animals

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/animals.json](../../dataset/en/animals.json).

**Totals:** 36 drafted → **29 approved** (25 as drafted, 4 after an edit) · **7 rejected** (19%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Seal / Sea Lion | reject: QC-09 | Sea Lion is Lion plus a modifier. Caught while drafting. |
| Crow / Raven | reject: QC-04 | Few people can tell a Raven from a Crow, or would recognise the word. |
| Buffalo / Bison | reject: QC-04, QC-05 | Bison is unfamiliar, and "buffalo" in India means water buffalo. |
| Hen / Chicken | reject: QC-02 | Near-synonyms in Indian English. |
| Bull / Ox | reject: QC-02 | No telling difference most players could hint at. |
| Ape / Monkey | reject: QC-02 | Hierarchy: "ape" is a group, not an animal at the same level. |
| Caterpillar / Butterfly | reject: QC-02 | The same creature at two life stages. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Octopus / Squid *(Hard)* | → Octopus / **Crab** *(Medium)* | QC-09: Squid clashes with Squid Game (Movies & Shows). Caught by the check script. |
| Lion / Tiger *(Hard)* | → **Medium** | QC-01: mane versus stripes splits them in a couple of clues. The survey flagged this exact tag inconsistency. |
| Crow / Raven | → **Pigeon / Dove** | QC-04: a familiar Hard Pair of birds instead. |
| Panda / Polar Bear *(Medium)* | → **Easy** | QC-01: bamboo versus ice splits them on the first clue. |

## Notes

Mouse is used here, so Gadgets must not use "Mouse" (computer mouse). The Cow is included as an animal; nothing in the Pair touches religion.

## Familiarity risks I approved but would cut first

**Hare** and **Mule** are known but less common words.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Crocodile / Alligator (Hard, `en-0302`) | replace: QC-04 → **Eagle / Vulture** (Hard, `en-0331`) | The snout difference between Crocodile and Alligator is hard to clue and players argue over the facts. Replaced with a familiar Hard bird-of-prey Pair. |
| Turtle / Tortoise (Hard, `en-0305`) | replace: QC-02 → **Hen / Rooster** (Hard, `en-0332`) | Turtle and Tortoise are near-synonyms in Indian English. Replaced with a Hard farm-bird Pair that has one clean difference. |
| Donkey / Mule (Hard, `en-0307`) | keep (weakest 10%) | Telling difference: a Mule is a half-horse hybrid, bigger and stronger. |
| Rabbit / Hare (Hard, `en-0308`) | replace: QC-02 → **Mosquito / Housefly** (Hard, `en-0333`) | Many players treat Rabbit and Hare as the same animal. Replaced with a Hard household-pest Pair. |
| Pigeon / Dove (Hard, `en-0309`) | edit: QC-02 → **Pigeon / Crow** (Hard, `en-0309`) | Pigeon and Dove overlap physically and players argue. Crow keeps the common-city-bird overlap (Sparrow fails QC-09 against Jack Sparrow). |
| Giraffe / Camel (Easy, `en-0324`) | replace: QC-14 → **Fox / Rabbit** (Easy, `en-0330`) | Giraffe is named outright from one clue (long neck). Replaced with a hunter-and-hunted Pair like Cat/Mouse. |
| Peacock / Parrot (Easy, `en-0326`) | keep (weakest 10%) | Easy by design. |
| Panda / Polar Bear (Easy, `en-0329`) | keep (flagged) | Safe clues exist that don't give Panda away (bear, zoo, endangered, cuddly). The evaluator's score was at the threshold. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Pigeon / Crow (Hard, `en-0309`) | QC-01 → **Pigeon / Crow (Medium, `en-0309`)** | Plays as Medium: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Octopus / Crab (Medium, `en-0311`) | QC-01 → **Octopus / Crab (Easy, `en-0311`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Hen / Rooster (Hard, `en-0332`) | QC-15 → **Ant / Termite (Hard, `en-0334`)** | A Hen and a Rooster are the female and male of one bird, so they work like a set. |
| Sheep / Goat (Hard, `en-0310`) | keep | The animals aren't unsafe; the wool vs beard clues are neutral, and no clue has to touch a festival. |
| Cow / Buffalo (Medium, `en-0321`) | keep | Cows and buffaloes are everyday Indian animals; neutral clues (colour, wallowing, milk) carry the Round. |
| Cat / Mouse (Easy, `en-0322`) | keep | Easy by design: predator and prey, like the Fox/Rabbit Pair the evaluator passed. Not a set. |
