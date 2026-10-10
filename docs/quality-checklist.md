# Dataset Quality Checklist

Every Pair must pass every criterion before it enters the Dataset. Decided in the wayfinder ticket
[Grilling: the Dataset Quality Checklist](wayfinder/tickets/004-quality-checklist.md), building on the
[existing-games survey](research/existing-games-survey.md).

**Check** says who enforces it: **Machine** (automated dataset check), **Curator** (judgement during review) or **audited** (also scored by the blind adversarial evaluator; see the [dataset pipeline](pipeline/README.md)).
When the curator rejects or edits a Pair, they record the criterion ID that failed (e.g. `reject: QC-03`).

## Pair criteria

| ID | Criterion | Check |
|---|---|---|
| QC-01 | **Difficulty = closeness.** The tag describes how close the two words are, never how obscure they are. Compare against the anchor Pairs below; tags must be consistent across the Dataset. | Curator |
| QC-02 | **Not too similar.** The Pair has a written **Telling Difference**: one real difference a Civilian could hint at without saying the word. Synonyms and regional names for the same thing fail (Sofa/Couch, Pani Puri/Golgappa, Biscuit/Cookie). Competing brands pass only if the group would say different things about each. **Also fails:** one word is a *kind of* the other (Brownie/Cake, Jeans/Trousers, Bao/Dim Sum, Salwar/Churidar), and words used interchangeably in Indian English (Chappal/Sandal, Trimmer/Shaver, Cap/Hat). *(Sharpened 2026-10-10 from the v1 audit.)* | Curator (note presence: Machine); audited |
| QC-03 | **Not too distant.** At least three plausible clues fit both words. | Curator |
| QC-04 | **Familiar.** The least-plugged-in member of the friend group knows both words without explanation. Nothing that needs looking up. | Curator |
| QC-05 | **Cultural fit.** Hindi/Hinglish words allowed only if they appear unexplained in everyday Indian English conversation or menus (Chai, Dhaba, Samosa); not if they need Hindi (Kulhad). US/UK-only references out unless truly global (Netflix yes, Thanksgiving no). Indian English meaning applies (Chips, Pants). | Curator |
| QC-06 | **Safe.** No politics or politicians, religion or religious figures, caste, regional/ethnic stereotypes, sexual content, or relationship triggers. Every Pair is fine to play with anyone's parents in the room. No opt-in edgy pack in v1. | Curator |
| QC-07 | **Long-lived references.** Brands, places and pop culture allowed; a specific person or title must have been famous ~5+ years and be likely to stay so. Living people must not be controversial. | Curator |
| QC-08 | **Fits its Category.** The Pair is the same kind of thing as the rest of its Category and is filed in the right one. | Curator |
| QC-09 | **Unique words.** A word appears in exactly one Pair across the whole Dataset, case-insensitive. No word may be another word plus a modifier (Paratha and Aloo Paratha, Pakora and Bread Pakora). Sharing a token is fine when the dishes are different (Vada Pav, Medu Vada). No exceptions in v1. *(Modifier rule added after the pilot.)* | Machine |
| QC-10 | **Phrasing.** British/Indian spelling (Colour, Aeroplane), Title Case, singular unless the common name is plural (Momos, Chole), no articles, ≤ 2 words unless the common name is longer. One spelling per Indian term: the most common in the group. | Machine (spelling via allow-list) |
| QC-14 | **Not a giveaway.** For *each* word (either can be the Civilian Word), Civilians can give at least three safe clues that a Blank-mode imposter couldn't use to name the word outright. A word that one obvious clue gives away fails, because it makes the Last Guess trivial and forces Civilians into clues so vague that nobody can be caught. *(Added 2026-10-09 from the user's dataset research.)* Typical failures: a word known for one single thing (Agra → Taj Mahal, Giraffe → long neck), or the only well-known member of its kind (Maggi). | Curator; audited |
| QC-15 | **Same kind, not a set.** Both words are the same kind of thing (two dishes, not a sauce and a dish; two breads, not bread and a side), and they are not two halves of one set whose clues imply each other (Lock/Key, Cup/Saucer). Applies to every tier, Easy included. *(Added 2026-10-10 from the v1 audit.)* | Curator; audited |

## Category criteria

| ID | Criterion | Check |
|---|---|---|
| QC-11 | **One kind of thing.** All Pairs in a Category are the same kind of thing (all foods, all places), and the Category name alone tells a Blank-mode imposter what kind of word to bluff. | Curator |
| QC-12 | **Deep enough.** ~30 Pairs without strain, repetition or obscurity. | Machine (count) / Curator (strain) |
| QC-13 | **Difficulty mix.** Roughly a third per tier, at least 8 Pairs per tier. | Machine |

## Difficulty anchors

| Tier | Meaning | Anchors |
|---|---|---|
| Easy | Loosely related; the first clue usually gives the imposter away. | Sun/Moon, Cricket/Football, Train/Aeroplane |
| Medium | Same kind of thing, clearly different; takes a couple of clues. | Dog/Wolf, Samosa/Kachori, Mumbai/Delhi |
| Hard | Almost the same, one telling difference; may take the whole Round. | Frog/Toad, Rasgulla/Rasmalai, Swiggy/Zomato |

## Not in the checklist

- **Hints**: v1 has none, so there are no hint criteria.
