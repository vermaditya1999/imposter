# Survey: what existing imposter games get wrong about their words

*Researched 2026-10-09. Wayfinder research ticket. Sources are listed at the end, and each claim is tagged [S#].*

## Summary

- **Where the evidence came from, and what's missing.** Reddit could not be reached (the fetch tool blocks the site). Store pages show only 3–4 reviews per app. So most of the evidence below comes from three places: (a) the few store reviews that are visible, (b) what developers admit in changelogs and replies, and (c) published word lists and design guides. Very few players complain about word quality in public. They complain about **running out of words or seeing them repeat**, **hints that don't match or that give the word away**, and paywalls. Most of what we know about *bad pairs* comes from developer fixes and from people who analysed the games, not from players venting.
- **The most common real failure is repetition and a small free pool.** Undercover (Yanstar, the market leader) gives only **50 free words**. Players complain they "run out of words". One app even shows the same word again and again within a category [S1, S2, S5].
- **Published lists are messy.** Words repeat across pairs, difficulty labels are inconsistent, and pairs sit in the wrong category. You can see this in a public 200-pair list [S9]. Spyfall's location set gets the same criticism for being "random", for mixing events and time periods with places, and for near-duplicate options [S11–S13].
- **Translation and localisation are a known weak spot.** One app's changelog says it fixed "mistranslations, typos, and hints that accidentally revealed the answer" [S7]. Another advertises that its pairs are "never machine-translated", which tells you machine translation is a known problem [S15]. Big apps support 35–49 UI languages, but none of them says the *word lists* are native in each language [S3, S6, S8].
- **India-specific content is now something apps sell.** WordSpy sells an "India Mix" pack and "extra Hinglish words" [S10]. An open-source game ships a "Desi Blend" category (Samosa/Kachori) next to "American Culture" [S16]. This supports our plan for a dataset tuned to India.
- **Good practice worth copying:** define difficulty by **how close the two words are**, not by how obscure they are [S9]. Use "familiar enough to describe, but broad enough to bluff" as the test for each word [S14, S17]. Don't repeat a pair until the whole deck has been used [S16]. Hints and Mr. White help are optional [S4, S18].

## Findings by quality-bar point

### 1. Words too obscure or too easy

- **Obscure examples.** Spyfall's "Crusader Army" comes up again and again in play reports. One player says it "felt too strangely specific for people to give accurate answers" [S12]. A group "had to research it", which exposed the non-spies [S11]. Another says "Crusader army also isn't a location" [S11]. A reviewer of Spyfall 2 calls "Cat Show" "very specific" [S19].
- **Proposed rule from play reports:** every location should be "well-known and understood by the average person" [S13].
- **Too easy, too hard, and the middle.** Pizza is "too easy to guess from clues" and nostalgia is "too hard to describe". Mid-range words like camping and karaoke "work best" [S14]. One guide warns that a word that is "too obvious" makes the imposter easy to spot, while an obscure one frustrates players [S17]. Another guide says vague words like "thing" fail, and so do words that half the group won't know [S20].
- **Difficulty from the player's side.** A reviewer of Imposter Game – Party Edition says imposters are "too easy to already know" the real word [S4]. This happens when the shared word is too guessable from the category alone.
- **Generational gaps.** Guidance says to avoid words that depend on age-specific knowledge, such as a rotary phone versus TikTok [S20].

### 2. Categories too broad or too narrow

- **Category mixes different kinds of thing.** Spyfall's list mixes physical places with events ("corporate party") and time periods ("Crusader Army"). Critics call it "not only limited but a bit odd" and "a bit random" [S13]. The mix also makes difficulty uneven, because some entries "gave away too much information" [S12].
- **Too broad or too generic.** Vague top-level labels like "Everything", "Mixed" and "Objects" are common [S10, S8]. One guide notes that categories exist to "set expectations for the vocabulary" [S17]. A category that's too broad means the imposter has nothing to go on. One that's too narrow means a single clue gives the word away.
- **Category too small or misfiled.** On a public list, Beyoncé/Rihanna sits under "Movies & TV" [S9]. In a combined set of 50 Spyfall locations, the spy faces too many possibilities. With only 20, the spy's job is "slightly easier" [S19]. **Size matters as much as theme.**

### 3. Pairs too obvious or nonsensical

- **Pairs too far apart, which makes them obvious.** Beach/Desert ("Both have sand, but VERY different vibes") and Lake/Ocean are given as examples [S21]. On the other side, one list's "Easy" pairs like Sun/Moon and Harry Potter/Lord of the Rings are "loosely related" by design [S9]. These are fine for beginners, but the Undercover gets spotted after one clue.
- **Pairs too close, which makes them indistinguishable.** Sofa/Couch, Turtle/Tortoise and Coffee/Espresso are labelled "Hard" [S9]. Sofa/Couch are near-synonyms. When the two words mean the same thing, nobody can be caught, so the pair doesn't work. (This is our own reading of the list. The source doesn't flag it.)
- **Inconsistent labels.** Lion/Tiger is "Hard" but Cat/Tiger is "Medium". Coffee is the civilian word in two different pairs, and Beach appears twice [S9].
- **Near-duplicate options for the spy.** "Military base" versus "WWII squad" in Spyfall "felt too similar" [S12].
- **Hints that don't match.** "Hints to the imposter do not match the word given" [S5b]. "The hints for the imposters don't really make sense and can be confusing" [S5]. This is a separate failure from the pair itself, but players blame the words for it.
- **How pairs are built in the original game.** In the original Chinese version (谁是卧底, "Who is the Undercover"), the spy word has "a similar meaning or shares a character" (含义相似或者有相同的字) [S22]. The character-sharing half of that rule doesn't carry over into English.

### 4. Culturally off for the group (India, English-speaking friends)

- **Default lists lean US/UK.** Most imposter apps are made by US or EU developers, and their categories include "American Culture"-style content. This is our inference from their listings. No reviewer said it outright. One guide uses Coffee/Tea as a deliberate trap because "The British like this" catches Americans [S21]. That shows how much clue-giving depends on a group's shared culture.
- **The market has noticed.** WordSpy sells **India Mix**, **Indonesia Mix** and **Philippines Mix** packs at $1.99 each, and has added "Extra Hinglish words in Mixed" [S10]. MASJV's open-source game ships **"Desi Blend"** (Indian food, Bollywood, landmarks, sweets, cities) next to "American Culture" [S16]. The Yanstar Undercover listing in India has a review from an Indian player about language mismatch in online rooms [S2b]. Its changelog credits a community volunteer with the Tamil localisation [S1].
- **Offensive or sensitive entries get through.** A GitHub issue on an Undercover implementation asks: "also remove the hitler word please" [S23]. Guides tell you to avoid politics (Trump/Biden) and relationship triggers (Ex-Girlfriend/Wife) unless the group is fine with them [S21].
- **What this means for us.** An Indian group will stumble on US-only references (Thanksgiving, Wendy's, NFL). The opposite also happens: generic "Indian" lists can be shallow. Pick references that an urban, English-speaking Indian friend group actually shares, such as cricket, Bollywood, street food, apps like Swiggy or Zomato, and IPL.

### 5. Too few words / repetition

- **Free tier too small.** Undercover gives "only 50 are free" [S2]. A player complained: "u can run out of words and u wont be able to play the game anymore". The developer replied: "Once you've played the initial 50 words… you can unlock over 2000 words" [S1].
- **Repetition bug.** In Imposter Up: "The same word is shown in the same category if a match is finished… if the word is banana… another round will also show banana and only banana" [S5].
- **Paywalled variety.** "There's not many options to choose from if you don't pay" [S6]. "Almost everything costs money" [S5].
- **Spyfall.** "The set list of locations felt repetitive and made the game feel limiting" [S13].
- **Advertised list sizes** (developer claims):

| App | Claimed size |
|---|---|
| Imposter (Vanilla) | 1,700+ words across 16+ categories [S3] |
| Imposter Party Edition | 1,500+ words across 10 categories, plus a 240-word Family Mode [S8] |
| Imposter Spy | 800+ words across 30+ categories [S24] |
| WordSpy | 500+ pairs [S10] |
| MASJV | 500–880 pairs [S16] |
| Yanstar Undercover | 50 free, 2,000+ paid [S1] |

  The plan of about 400 hand-curated pairs is on the small side but competitive, as long as nothing repeats until the deck is used up.
- **Good practice.** "Word pairs do not repeat until the entire deck is exhausted" [S16]. Another tip is to track used words to avoid repeats [S17].

### 6. Bad translation or awkward phrasing

- **Admitted in a changelog.** Lumi's "Imposter Game Who's Undercover" v1.5.2 fixed "mistranslations, typos, and hints that accidentally revealed the answer" [S7]. That app went from English-only to 14+ languages in a few releases [S7].
- **"Never machine-translated" as a selling point.** UnderCover & Mr White Party says its pairs were written natively in three languages and stresses that they were "never machine-translated" [S15].
- **Many languages, unclear word lists.** Several apps support 35–49 UI languages: Undercover with 45 [S1], Imposter Who? with 49 [S6], and Imposter Spy with 36 [S24]. None of them says the word *pairs* are native in each language. Yanstar's own counts disagree with each other: 45 languages on the listing versus "28+" in the in-app purchase text [S1].
- **Why pairs translate badly.** The original Chinese rule allows pairs that share a character [S22]. These lose their link in English. Pairs that depend on English double meanings (Bat, Bank, Mouse [S21]) lose theirs when translated the other way.
- **Awkward phrasing in our own context.** This applies mostly through hints and through British versus American spellings and words (Couch/Sofa, Biscuit/Cookie). For an English-only dataset, the risk is pairs where one word is unfamiliar in Indian English, or reads differently there (e.g. "Pants", "Chips").

## Good practices worth copying

1. **Define difficulty as how close the pair is, not how rare the words are** [S9]. Hard means "almost indistinguishable", for example Frog/Toad. Medium means the same category but clearly different, for example Dog/Wolf. Easy means "loosely related", for example Sun/Moon. Both words should *always* be familiar.
2. **Aim for about 70% overlap with one telling difference** [S21]. Muffin/Cupcake and Dog/Wolf are examples: clues can overlap, but a sharp question can split them.
3. **Test every word: "familiar enough to describe, but broad enough to bluff"** [S14]. Each word should allow several angles for clues [S20].
4. **Don't repeat a pair until the whole deck is used**, and save that history across sessions [S16].
5. **Make hints optional and check them** [S4, S5, S7]. A hint must never give the answer away.
6. **Offer region and audience packs**, such as India Mix, Desi Blend and Family Mode [S10, S16, S8].
7. **Judge Mr. White's guess leniently**, so near-synonyms and different capitalisation still count [S15].
8. **Make sure entries in a category are the same kind of thing.** All places, or all foods. Don't mix in events or time periods [S13].

## Implications for our Quality Checklist

- [ ] **Familiarity:** both words are known to every member of an urban Indian English-speaking group, across ages 18–35. Reject anything that needs research, such as "Crusader Army".
- [ ] **Difficulty tag = closeness:** the Easy/Medium/Hard tag describes how close the pair is, never how obscure the words are. Check each tag against two or three anchor pairs per tier, and keep the tags consistent: Lion/Tiger and Cat/Tiger cannot both appear with contradictory tags.
- [ ] **Not synonyms:** reject pairs where nobody can describe a real difference (Sofa/Couch). Write down the one telling difference for each pair.
- [ ] **Not too far apart:** at least two or three clues must fit both words.
- [ ] **Same kind of thing:** every entry in a category is the same kind of thing. Category size is about 25–35 pairs, so each category has enough variety but still gives the imposter something to go on.
- [ ] **Correct category:** each pair sits in the right category (no Beyoncé under Movies).
- [ ] **No duplicates:** no word appears in more than one pair, unless deliberately allowed. Lint for this automatically.
- [ ] **Cultural fit:** the words are local to India where that helps (cricket, Bollywood, street food, Indian apps). Avoid US/UK-only references. Check Indian English meanings (Chips, Pants, Biscuit).
- [ ] **Sensitivity:** no political figures, dictators, religious figures or relationship triggers in the default deck. Anything edgy goes in an opt-in pack.
- [ ] **No repeats:** the shuffle-deck approach is specified, and history is saved.
- [ ] **Blank mode:** each civilian word gives a Mr. White enough to work from, so the category plus the clues are enough. A guess counts if it is a close synonym or differs only in spelling or capitalisation.
- [ ] **Hints (if any):** a hint never contains or reveals the civilian word, and it matches its own pair.
- [ ] **Phrasing:** one spelling standard (Indian/British English), Title Case, no articles, and multi-word phrases only when they are the common name.

## Sources

- [S1] Undercover™: Word Party Game (Yanstar), App Store US listing and reviews (Dragon_Lord14 review, developer reply, version notes): https://apps.apple.com/app/id946882449 and https://apps.apple.com/us/app/undercover-word-party-game/id946882449?see-all=reviews
- [S2] Undercover®: Word Party Game, Google Play (AU) listing (Jayjay Noble review: "only 50 are free"): https://play.google.com/store/apps/details?id=com.yanstarstudio.joss.undercover&hl=en_AU
- [S2b] Undercover, App Store India (Shanaya review about language): https://apps.apple.com/in/app/id946882449
- [S3] Imposter (Vanilla b.v.), Google Play: https://play.google.com/store/apps/details?id=com.vanilla.imposter&hl=en_US
- [S4] Imposter Game – Party Edition, App Store listing and reviews: https://apps.apple.com/us/app/imposter-game-party-edition/id6745120053
- [S5] Imposter Up – Who is the Spy? (Cosmicode), Google Play (Bishal Tamrakar and Angel Perez reviews): https://play.google.com/store/apps/details?id=pt.cosmicode.imposter&hl=en_US
- [S5b] Imposter : Word Party Game, Google Play (Jack Wiggins review): https://play.google.com/store/apps/details?id=com.impostor&hl=en_US
- [S6] Imposter Who? – Word Game, App Store: https://apps.apple.com/us/app/imposter-who-word-game/id6746781192
- [S7] Imposter Game Who's Undercover (Lumi Software), App Store version history: https://apps.apple.com/us/app/-/id6758348509
- [S8] Imposter Game – Party Edition version history (1,500 words, Family Mode): https://apps.apple.com/us/app/imposter-party-word-game/id6745120053
- [S9] Mr White & Undercover Game Words List, 200+ pairs with difficulty definitions: https://mrwhiteonline.com/words/
- [S10] WordSpy: Undercover Word Game, App Store (India Mix, Hinglish): https://apps.apple.com/app/id6766617415
- [S11] Mechanics of Magic, Spyfall critical play ("Crusader army also isn't a location"): https://mechanicsofmagic.com/?p=4677
- [S12] Mechanics of Magic, Critical Play: Spyfall: https://mechanicsofmagic.com/2022/04/07/critical-play-spyfall-7/ and https://mechanicsofmagic.com/?p=4312
- [S13] Mechanics of Magic, Critical Play: Spyfall ("not only limited but a bit odd"): https://mechanicsofmagic.com/2022/04/08/critical-play-spyfall-13/
- [S14] Psycat Games, 90+ Good Imposter Words: https://psycatgames.com/magazine/party-games/good-imposter-words/
- [S15] UnderCover & Mr White Party (Arouay Studio), Google Play ("never machine-translated"): https://play.google.com/store/apps/details?id=com.arouaystudio.undercoverparty&hl=en_IN
- [S16] MASJV/undercover-game on GitHub (Desi Blend, no-repeat deck): https://github.com/MASJV/undercover-game
- [S17] Indie Hackers, How an imposter game generator can make group games more fun: https://www.indiehackers.com/post/how-an-imposter-game-generator-can-make-group-games-more-fun-ORTip9ZKLJxiKOddGcYF
- [S18] Yanstar, Undercover rules (Mr. White): https://yanstarstudio.com/undercover-how-to-play
- [S19] Zatu, Spyfall 2 review: https://zatu.com/blogs/reviews/spyfall-2-review
- [S20] imposter.app, 200+ Best Imposter Game Words: https://imposter.app/imposter-game-words/
- [S21] imposterwords.com, Funny Imposter Game Words: https://www.imposterwords.com/blog/funny-imposter-game-words
- [S22] Hugging Face WhoIsSpyAgentExample prompts (original pair rule): https://huggingface.co/spaces/ZHZ1024/WhoIsSpyAgentExample/blob/main/prompts.py
- [S23] SchneaggchatV3 issue #840 ("remove the hitler word"): https://github.com/lerchenflo/SchneaggchatV3/issues/840
- [S24] Imposter Game: Spy, Fake Word, App Store: https://apps.apple.com/us/app/imposter-game-spy-fake-word/id6757858367

**Gaps.** Reddit could not be fetched (the fetch tool blocks the site). Store pages show only a few reviews each. Review aggregators (marlvel.ai, AppFollow) put their review themes behind a login or have no data. If you want player complaints at volume, have someone browse r/boardgames and r/partygames by hand, or read the full review lists in each app store.
