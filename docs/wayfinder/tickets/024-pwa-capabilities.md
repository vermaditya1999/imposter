---
title: "Research: what a PWA can do for private pass-and-play on iPhone and Android"
type: wayfinder:research
status: closed
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

## Resolution

A PWA covers everything the game needs, with three iPhone gaps, none of them blocking:
- **No haptics on iPhone.** Vibration works on Android Chrome only.
- **Wake Lock in a home-screen app needs iOS 18.4+.** It works in a Safari tab from 16.4.
- **A Safari tab can lose its storage** after 7 days without the game being opened. Home-screen web apps are exempt, and `persist()` is granted mainly to them.

No web API can block or detect screenshots, so the reveal relies on hiding the word on `visibilitychange`. Whether that hide happens before the app-switcher snapshot is undocumented and needs testing on a real phone. iOS has no install prompt: it's Share → Add to Home Screen. There's no fullscreen mode or orientation lock on iOS, so design portrait-first without a lock.

**Recommended stack:** Vite + Preact + TypeScript, with vite-plugin-pwa (`generateSW`, prompt-to-update so an update never wipes a round in progress). Static hosting on GitHub Pages (public repo) or Cloudflare Pages.

Full notes: [pwa-capabilities.md](../../research/pwa-capabilities.md)
