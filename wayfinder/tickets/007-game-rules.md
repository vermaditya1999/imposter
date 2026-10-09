---
title: "Grilling: game rules and Round flow"
type: wayfinder:grilling
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

What exactly happens in a Round, from setup to reveal? Player count limits, allowed imposter counts per player count, how imposters are chosen, whether the Civilian/Imposter side of a Pair is randomised, how Blank mode changes the flow, who speaks first, timer defaults, what the final Reveal shows, and what happens between Rounds (same players, new Pair).

## Resolution

*Decided by Claude on the user's delegation (2026-10-09).*

**Setup** (remembered between Rounds):
- **Players: 3–12**, with names. Below 3 the game doesn't work, and above 12 passing the phone around gets too slow.
- **Imposter count:** from 1 up to ⌊(players − 1) ÷ 2⌋, so Civilians always outnumber imposters. The default is 1 for 3–7 players, 2 for 8–11 and 3 for 12.
- **Mode:** Undercover (default) or Blank.
- **Categories:** multi-select, all selected by default.
- **Difficulty:** multi-select across Easy, Medium and Hard, all selected by default.
- ~~**Discussion timer:** 3 min by default, adjustable from 1 to 10 min, or off.~~ *Removed 2026-10-09 by the user: no timer (see [Prototype: pass-and-play setup and reveal flow](009-reveal-flow.md)).*

**Dealing:**
- The Pair is chosen uniformly at random from the selected Categories and Difficulties. Repeat avoidance is still to be decided.
- A coin flip assigns the Civilian Word (the Pair is unordered).
- Imposters are chosen uniformly at random every Round. The same person can be the imposter twice in a row.

**Reveal (pass-and-play):**
- Players reveal in the order they were entered.
- Everyone sees the **Category**.
- Civilians and Undercover imposters see just their word. **Undercover imposters are not told they are the imposter.** This is the classic rule, and the whole fun of the mode.
- In **Blank mode**, imposters see "You're the Imposter" and no word.

**Discussion:**
- The app picks a random first speaker, then play goes round in player order.
- In Blank mode, an imposter is never picked to speak first.
- Each player gives one clue per turn, verbally. The app tracks nothing.
- ~~When the timer runs out, the phone buzzes and plays a sound.~~ *No timer (removed 2026-10-09).*

**Vote and end of Round:**
- One verbal vote, then someone taps **Reveal**. The screen shows the imposters' names, the Civilian Word and the Imposter Word (or "no word" in Blank mode).
- House rules printed in How to Play, which the app doesn't enforce:
  - If the player with the most votes is an imposter, Civilians win. Otherwise imposters win.
  - A caught Blank-mode imposter gets a **Last Guess** at the Civilian Word. If it's right, imposters win.
- The app doesn't keep score (scoring stays parked in Not yet specified).

**Next Round:** players and settings stay the same. A new Pair is dealt and new imposters are chosen.

**Ruled out of v1:** multi-vote elimination play (groups can play it verbally before tapping Reveal), and in-app voting or scoring.
