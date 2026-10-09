---
title: "Research: what a PWA can do for private pass-and-play on iPhone and Android"
type: wayfinder:research
status: open
assignee: "claude"
blocked_by: []
parent: map
---

## Question

Now that the app is web/PWA only: on current iOS Safari and Android Chrome, both installed to the home screen and in a plain browser tab, what works for this game?
- Keeping the screen awake (Screen Wake Lock).
- Haptics (Vibration API).
- Hiding a word when the app is switched away or a screenshot is taken.
- Full offline play via a service worker.
- How reliably on-device storage persists. Repeat avoidance depends on it, and iOS may evict a site's storage.

What does each gap mean for the reveal flow and repeat avoidance, and which web stack is lightest for an offline, single-page PWA?
