---
title: "Grilling: what the build-ready spec contains and where it lives"
type: wayfinder:grilling
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

The rules, the screen flow, repeat avoidance, the web stack and Dataset v1 are all decided, so this map's last step is the build-ready spec. What does it contain, and where does it live?
- **Form:** one document (e.g. `docs/spec.md`) or a set of files?
- **Content:** does it restate the decisions or link to the tickets that hold them?
- **Screens:** is each screen described in words, or does it point at the winning prototype variant?
- **Acceptance checks:** which ones are included, e.g. the real-iPhone test of the `visibilitychange` hide?
- **Dataset:** how is it referenced?
- **Done:** what counts as done for the build that follows?

What must be settled first (visual identity, hosting, the Dataset audit), and what can the builder decide alone?

## Resolution

*Decided by the user, 2026-10-09: "let's build the game now". No separate spec document.*

The decisions already live in their tickets (rules, reveal flow, repeat avoidance, PWA stack, schema, Dataset), so a spec restating them would only duplicate them. The map's destination is redrawn to include **building v1** of the app, tracked by [Task: build the v1 app](027-build-v1-app.md). The visual identity is settled there from the user's reference screenshot.

- **Settled first:** visual identity (from the reference). **Not blocking the build:** hosting (fog) and the Dataset audit (it changes Pair contents, never ids or the schema).
- **Builder decides alone:** component structure, animation details, copy tone, icon.
- **Acceptance checks** move into the build ticket.
