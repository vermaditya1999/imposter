# Curation log: Gadgets

Drafted and curated by Claude on 2026-10-09, after the user delegated curation. Each verdict cites the
[Quality Checklist](../quality-checklist.md) criterion that decided it. Approved Pairs are in
[dataset/en/gadgets.json](../../dataset/en/gadgets.json).

**Totals:** 35 drafted → **28 approved** (25 as drafted, 3 after an edit) · **7 rejected** (20%).

## Rejected

| Draft | Verdict | Why |
|---|---|---|
| Power Bank / Charger | reject: QC-09 | Bank (Places Around Town) plus a modifier. |
| Router / Modem | reject: QC-02 | Most players can't name a difference. |
| Mouse / Keyboard | reject: QC-09 | Mouse is already used in Animals. |
| Tablet / Kindle | reject: QC-08, QC-09 | Kindle is a brand and already used in Brands & Apps. |
| Ring Light / Softbox | reject: QC-09 | Ring (Clothes & Accessories) plus a modifier. |
| Alarm Clock / Smartwatch | reject: QC-09 | Clock (Around the House) plus a modifier. |
| Laptop / Gaming Laptop | reject: QC-09 | Laptop plus a modifier. |

## Edited, then approved

| Draft | Edit | Why |
|---|---|---|
| Power Bank / Charger | → **Charger / Extension Board** *(Medium)* | QC-09 (see Rejected). |
| Microphone / Webcam *(Medium)* | → **Easy** | QC-01: sound versus video splits them on the first clue. |
| Satellite Dish / Antenna *(Medium)* | → **Hard** | QC-01: both are rooftop TV receivers, and the shape is the only real difference. |

## Notes

Generic product names only (Smartphone, not iPhone). Brands live in Brands & Apps.

## Audit (v1)

Re-curated on 2026-10-09 after the blind [adversarial audit](audit-v1.json) (Sonnet, [prompt v1](../pipeline/prompts/audit-v1.md)). Covers every Pair the evaluator flagged plus the weakest 10% overall. Edits keep their id; replacements take the next free id in the block.

| Pair | Verdict | Why |
|---|---|---|
| Earphones / Headphones (Hard, `en-1301`) | keep (flagged) | Hard by design. Telling difference: in-ear vs over-ear. |
| Smartwatch / Fitness Band (Hard, `en-1302`) | keep (flagged) | Hard by design. Telling difference: a Smartwatch has a full screen and apps, a Fitness Band is a slim strip for steps and sleep. |
| Speaker / Soundbar (Hard, `en-1304`) | keep (weakest 10%) | Shape and placement split them cleanly. |
| Trimmer / Shaver (Hard, `en-1307`) | edit: QC-02 → **Trimmer / Massager** (Medium, `en-1307`) | Trimmer and Shaver are used interchangeably in India. Retagged Medium. |
| Satellite Dish / Antenna (Hard, `en-1309`) | keep (weakest 10%) | Dish vs rod is a clean shape clue. |
| CCTV / Baby Monitor (Medium, `en-1315`) | keep (weakest 10%) | Security vs a baby's room is a clean split. |
| Electric Scooter / Hoverboard (Medium, `en-1317`) | keep (weakest 10%) | Handlebar vs standing on two pads is a clean split. |
| Fairy Lights / Disco Ball (Easy, `en-1325`) | replace: QC-08 → **Air Fryer / Air Purifier** (Easy, `en-1329`) | Fairy Lights and a Disco Ball are decorations, not gadgets. |

### Blind re-check of the changes

Every edited or replacement Pair was re-judged blind by a fresh Sonnet evaluator; all passed.

## Audit (v2)

Re-curated on 2026-10-10 after the blind, tier-aware [v2 audit](audit-v2.json) ([prompt](../pipeline/prompts/audit-v2.md), [pipeline](../pipeline/README.md)). Covers every Pair that failed the v2 rules. The weakest-but-passing Pairs were reviewed and left as they are. Pairs whose words changed retired their old id and took a new one.

| Pair | Verdict | Why |
|---|---|---|
| Trimmer / Massager (Medium, `en-1307`) | QC-01 → **Trimmer / Massager (Easy, `en-1307`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Keyboard / Joystick (Medium, `en-1316`) | QC-01 → **Keyboard / Joystick (Easy, `en-1316`)** | Plays as Easy: the blind evaluator found it too distant for its old tier; tier changed, words and id unchanged. |
| Robot Vacuum / Smart Bulb (Easy, `en-1328`) | QC-04 → **Metal Detector / Smoke Detector (Easy, `en-1330`)** | Robot Vacuum and Smart Bulb are niche in Indian homes and share almost nothing. |
| Printer / Scanner (Hard, `en-1306`) | keep | Hard. Paper in vs paper out is one clean difference; bluffable 4 is borderline. Keeps Gadgets at 8 Hard. |
| Calculator / Typewriter (Easy, `en-1320`) | keep | Easy. Both are keypad machines; numbers vs letters. |
| Weighing Scale / Thermometer (Easy, `en-1322`) | keep | Easy. Both measure the body and show a number. |
