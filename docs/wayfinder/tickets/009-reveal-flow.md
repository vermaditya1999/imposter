---
title: "Prototype: pass-and-play setup and reveal flow"
type: wayfinder:prototype
status: closed
assignee: "claude"
blocked_by: [007]
parent: map
---

## Question

How should setup, passing the phone, and the private word Reveal look and behave so nobody accidentally sees another player's word? A cheap clickable **web** prototype (the app is a PWA) of the screens from player setup through the end-of-Round Reveal, to react to. Constraints from the PWA research:
- No screenshot blocking.
- Hide the word on `visibilitychange`, and test whether that beats the app-switcher snapshot on a real phone.
- No haptics on iPhone.
- Portrait without an orientation lock.

Compare tap-and-hold against tap-to-toggle for the reveal, and decide where to nudge iPhone players to Add to Home Screen. That's what keeps repeat-avoidance history safe.

## Resolution

*The user picked variant B and dropped the discussion timer (2026-10-09). The Add to Home Screen nudge and the accessibility fallback are Claude's calls, made on the user's standing delegation; revisit them freely.*

Prototype: the three variants are on branch `prototype/reveal-flow` (`prototypes/reveal-flow-prototype.html`, switch with `?variant=A|B|C`). **B (Hold to peek) won.**

**Setup** (one screen, as prototyped): player names (3–12, add/remove), imposter count stepper, Undercover/Blank toggle, then **Deal words**. Category and Difficulty selection sit on the same screen. **No discussion timer.**

**Passing and private Reveal (hold to peek):**
- One screen per player, in the order players were entered. It shows "Player n of N", the player's name in large type and the Category.
- A patterned card reads "Press and hold to peek". The word (or "You're the Imposter" in Blank mode) shows **only while a finger is on the card** and hides the instant it lifts or the touch is cancelled.
- A player may peek as often as they like on their own screen. "Done — pass to <next name>" stays disabled until they've peeked at least once. On the last player it reads "Everyone's seen it — start".
- On Android, `navigator.vibrate(30)` fires when the card opens. iPhone gets no haptics. The visual change is the main feedback either way.
- If the app is backgrounded (`visibilitychange`), the word is hidden. Hold-to-peek means the word is almost never on screen when someone swipes away, so the untested app-switcher snapshot timing matters much less. Still check it on a real iPhone while building.
- **Accessibility fallback:** a setting, off by default, switches the card to tap to show / tap to hide, with an auto-hide after 5 s.
- The screen stays awake (Screen Wake Lock) from Deal to the end-of-Round Reveal.

**Discussion:** a single screen with the Category, "First clue: <name>" ("then go round in order"), and a **Reveal** button. There's no timer, sound or buzz. The group discusses and votes out loud for as long as they like.

**End-of-Round Reveal (step by step, tap to advance):**
1. "Who was the imposter?"
2. The imposter names.
3. The Civilian Word and the Imposter Word ("nothing" in Blank mode, plus a Last Guess reminder).

Then **Next Round** (same players and settings) or **Setup**.

**Add to Home Screen nudge (iPhone only):** a dismissible one-line banner on the Setup screen when the game is open in iOS Safari but not installed ("Add to Home Screen so your played-words history isn't lost"). Show it on first launch and again after the Deck reshuffles. It stays dismissed for 30 days. How to Play repeats it. Android and installed copies never see it.

**Superseded:** the discussion timer from [Grilling: game rules and Round flow](007-game-rules.md) is gone.
