---
title: "Grilling: repeat avoidance across Rounds and sessions"
type: wayfinder:grilling
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

Repetition is the top complaint in existing games. How does the app make sure a Pair isn't dealt again until it has to be? Does it keep a history of dealt Pair ids on the device across app restarts? What is the "deck": all Pairs, or only those matching the current Category and Difficulty selection? When the deck runs out, what happens, and is the player told? Does it matter which side of a Pair was the Civilian Word last time? Can players reset the history?

## Resolution

*Decided by Claude on the user's delegation (2026-10-09): "grill complete yourself".*

- **History is kept on the device.** The app stores the set of dealt Pair `id`s locally, and the set survives app restarts. It belongs to the device, not to a group of players: one phone means one shared history. There's no backend, which fits pass-and-play.
- **The Deck is the current selection minus history.** Each Round deals uniformly from the Pairs that match the selected Categories and Difficulties and haven't been dealt since the last reset. Changing the selection changes the Deck immediately, and history is never lost.
- **Sides don't matter.** A dealt Pair counts as played whichever word was the Civilian Word. Getting Samosa/Kachori again with the sides flipped still feels like a repeat.
- **When the Deck runs out**, the app clears history for just the Pairs in the current selection and shows a one-line notice: "You've played every Pair in this selection — reshuffling." Play never stops, and history for other Categories survives.
- **Manual reset:** a "Reset played words" action in settings, behind a confirmation.
- **Storage (added after the PWA research):** keep history in `localStorage` and call `navigator.storage.persist()`. In a plain iPhone Safari tab, history can be wiped after 7 days without play. That's acceptable, and the app nudges iPhone players to Add to Home Screen, where it's safe.
- **Dataset updates:** history is keyed on stable `id`s. Ids of removed Pairs are ignored, and new Pairs arrive unplayed.
