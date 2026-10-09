---
title: "Prototype: pass-and-play setup and reveal flow"
type: wayfinder:prototype
status: open
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
