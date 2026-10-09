---
title: "Research: cross-platform framework for an offline pass-and-play app"
type: wayfinder:research
status: closed
assignee: "claude"
blocked_by: []
parent: map
---

## Question

Which cross-platform framework (e.g. Expo/React Native vs Flutter, or others worth considering) best fits a small, offline, single-device party game with a bundled JSON-ish dataset, built by one developer on a Mac? Compare setup cost, local-dev loop, bundling static data, haptics/screen-hiding for private reveals, and how each supports the friend-distribution path in "Research: getting the app onto friends' phones without a store release".

## Resolution

Recommend Expo (React Native), SDK 57: first-party haptics, keep-awake and screen-capture blocking; Expo Go for fast on-phone dev; EAS builds shareable to both platforms. Flutter is a close second. Bundling the dataset is trivial in all options.

Full notes: [cross-platform-framework.md](../../docs/research/cross-platform-framework.md)
