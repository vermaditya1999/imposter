# Authoring prompt (v1)

How the authoring session drafts candidates for a Category (a new theme, or a top-up of an existing
one). The author is the main Claude Code session (Opus). It writes candidates to
`dataset/drafts/<category-id>.json`. Distilled from the [pilot batch](../../wayfinder/tickets/008-pilot-category-batch.md)
and the [v1 audit](../../curation/audit-v1.json).

---

You are drafting word Pairs for **{Category name}** in a pass-and-play *Undercover*-style party game
for a friend group of urban Indian twenty/thirty-somethings who speak Indian English.

Read first: `docs/quality-checklist.md` (every criterion and the difficulty anchors), `CONTEXT.md`
(the glossary), and every word already in `dataset/en/*.json`, because a word may appear in only one
Pair across the whole Dataset (QC-09), and no word may be another word plus a modifier.

Draft **{N} candidates**: about 1.5× the Pairs you need, because the blind audit and curation will
cut about a third. Aim for a third of the candidates in each tier:
- **Hard:** almost the same thing, one telling difference (Frog/Toad, Rasgulla/Rasmalai, Swiggy/Zomato).
- **Medium:** same kind of thing, clearly different (Dog/Wolf, Samosa/Kachori, Mumbai/Delhi).
- **Easy:** loosely related, but still the same kind of thing (Sun/Moon, Cricket/Football, Train/Aeroplane).

For each candidate write `{"id": "d-001", "words": [A, B], "difficulty": tier, "difference": "..."}`.
The `difference` is the Telling Difference: one sentence of the form "A is …; B is …" that a Civilian
could hint at without saying the word.

Before writing a candidate down, reject it yourself if it has any of the failures the v1 audit
caught most often:
- **One word is a kind of the other** (Brownie/Cake, Jeans/Trousers, Bao/Dim Sum, Salwar/Churidar).
- **The words are used interchangeably in Indian English** (Chappal/Sandal, Trimmer/Shaver, Cap/Hat).
- **They are two halves of one set** (Lock/Key).
- **They aren't the same kind of thing** (a sauce and a dish; bread and a side).
- **One word is known for a single thing,** so one clue gives it away (Agra, Giraffe), or it is the
  only well-known member of its kind (Maggi).
- **Not everyone in the group knows it:** regional words (Imarti, Byomkesh Bakshi), US/UK-only
  references, anything that needs explaining.
- **It doesn't fit the Category** (Fairy Lights in Gadgets; a Farm in Places Around Town).
- **A Hard Pair whose only difference is one players will argue about.** Hard is the tier that fails
  the blind re-check most often (Surf Excel/Tide, Sausage/Salami, Leggings/Jeggings). Prefer Hard
  Pairs whose difference is visible or factual (Hen/Rooster, Eagle/Vulture).

Spread the candidates across the Category's sub-kinds (for food: snacks, mains, breads, sweets,
drinks if they belong) so the Category doesn't repeat itself (QC-12).
