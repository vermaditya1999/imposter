# Wayfinder tracker (local markdown)

This repo's issue tracker for wayfinding lives here as markdown, not GitHub issues.

- `map.md` — the map (label `wayfinder:map`). An index, not a store.
- `tickets/NNN-slug.md` — child tickets of the map. The number is the ticket's id.

Ticket frontmatter:

- `title` — the ticket's name; always refer to tickets by this.
- `type` — `wayfinder:research | wayfinder:prototype | wayfinder:grilling | wayfinder:task`
- `status` — `open | closed`
- `assignee` — the claim. Empty = unclaimed. Set it **before** doing any work.
- `blocked_by` — list of ticket ids. A ticket is unblocked when all of them are closed.

**Frontier** = tickets that are `open`, unblocked, and unassigned.

Resolving a ticket: append a `## Resolution` section (the resolution comment), set `status: closed`,
and add a one-line pointer to the map's *Decisions so far*. Assets (research notes, prototypes) are
linked from the ticket, not pasted in.
