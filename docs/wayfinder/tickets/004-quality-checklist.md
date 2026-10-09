---
title: "Grilling: the Dataset Quality Checklist"
type: wayfinder:grilling
status: closed
assignee: "claude"
blocked_by: [001]
parent: map
---

## Question

Turn the six quality-bar points into concrete, checkable criteria every Pair must pass — including precise definitions of Easy / Medium / Hard, what makes a Pair "too similar" or "too distant", how broad a Category may be, and what "culturally off for the group" means in practice. Which criteria are machine-checkable and which need the user's judgement?

## Resolution

13 criteria (QC-01…QC-13), each marked Machine or Curator. Difficulty means **closeness**, with three anchor Pairs per tier. A Pair is too similar if it has no writable **Telling Difference** (synonyms and regional names fail) and too distant if fewer than three clues fit both words. Familiarity is judged against the least-plugged-in friend. Everyday Indian English (Chai, Dhaba) is allowed, Hindi-only words and US/UK-only references are not. Default exclusions: politics, religion, caste, stereotypes, sexual content, relationship triggers, with no edgy pack. Pop-culture references need ~5+ years of fame. Each word appears in exactly one Pair across the Dataset. Each Category has ~30 Pairs, all the same kind of thing, with ≥ 8 per difficulty tier. British/Indian spelling, Title Case, singular, ≤ 2 words. No hints in v1. Curators record the failed criterion ID on every reject or edit.

Checklist: [quality-checklist.md](../../quality-checklist.md)
