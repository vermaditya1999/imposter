"""Score blind evaluator results against each Pair's stored tier and write the audit file.

  python3 scripts/pipeline/score.py RESULTS_DIR --out docs/curation/audit-v3.json --prompt v3 \
      [--drafts dataset/drafts/board-games.json] [--weakest 0.10] [--partial]

RESULTS_DIR holds one JSON array per evaluator (prompt v2 or v3 output). The pass/fail rules live here,
not in the prompt, so they can depend on the stored tier the evaluator never sees. Prints the
worklist: every failing Pair, then the weakest passing ones."""
import argparse, glob, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dataset_lib import ROOT, category_path, load_category, registry

TIER_N = {"easy": 0, "medium": 1, "hard": 2}
# Per stored tier: (min distinguishing, max synonym_risk, min bluffable, criterion when too distant)
TIER_RULES = {
    "hard":   (4, 6, 5, "QC-01"),  # too distant for Hard → retier
    "medium": (5, 5, 4, "QC-03"),
    "easy":   (5, 4, 3, "QC-03"),
}


def fails(r, tier):
    s = r["scores"]; out = []
    dmin, smax, bmin, distant = TIER_RULES[tier]
    if s["distinguishing"] < dmin: out.append(f"QC-02 distinguishing {s['distinguishing']}<{dmin}")
    if s["synonym_risk"] > smax: out.append(f"QC-02 synonym_risk {s['synonym_risk']}>{smax}")
    if s["bluffable"] < bmin: out.append(f"{distant} bluffable {s['bluffable']}<{bmin}")
    if s["giveaway_risk"] >= 7: out.append(f"QC-14 giveaway_risk {s['giveaway_risk']}")
    if s["one_sided"] >= 7: out.append(f"QC-02 one_sided {s['one_sided']}")
    if s["familiarity"] < 6: out.append(f"QC-04 familiarity {s['familiarity']}")
    if r.get("kind_of"): out.append("QC-02 kind_of")
    if r.get("is_set"): out.append("QC-15 is_set")
    if r.get("same_kind") is False: out.append("QC-15 not same_kind")
    if r.get("safe") is False: out.append("QC-06 unsafe")
    if r.get("fits_category") is False: out.append("QC-08 misfiled")
    g = r.get("tier_guess")
    if g in TIER_N and abs(TIER_N[g] - TIER_N[tier]) == 2: out.append(f"QC-01 tier_guess {g} vs {tier}")
    return out


def weakness(r):
    s = r["scores"]
    return ((10 - s["distinguishing"]) + (10 - s["bluffable"]) + s["giveaway_risk"] + s["synonym_risk"]
            + s["one_sided"] + (10 - s["familiarity"]))


ap = argparse.ArgumentParser()
ap.add_argument("results"); ap.add_argument("--out", required=True); ap.add_argument("--prompt", default="v3")
ap.add_argument("--drafts", action="append", default=[]); ap.add_argument("--weakest", type=float, default=0.10)
ap.add_argument("--model", default="haiku 5.5 (Claude Code subagent)")
ap.add_argument("--partial", action="store_true", help="a re-check of chosen ids: skip the coverage warning")
a = ap.parse_args()

stored = {}
for path in [category_path(c) for c in registry()["order"]] + a.drafts:
    if os.path.exists(path):
        d = load_category(path)
        for p in d["pairs"]: stored[p["id"]] = (d["id"], p)

rows, problems = [], []
for f in sorted(glob.glob(os.path.join(a.results, "*.json"))):
    for r in json.load(open(f)):
        if r["id"] not in stored: problems.append(f"{r['id']}: not in the Dataset or drafts"); continue
        cid, p = stored[r["id"]]
        if sorted(r["words"]) != sorted(p["words"]): problems.append(f"{r['id']}: words {r['words']} ≠ stored {p['words']}")
        rows.append({"id": r["id"], "category": cid, "words": p["words"], "tier": p["difficulty"],
                     "scores": r["scores"], **{k: r.get(k) for k in ("kind_of", "is_set", "same_kind", "safe", "fits_category", "tier_guess")},
                     "fails": fails(r, p["difficulty"]), "weakness": weakness(r),
                     "note": r.get("note", ""), "evidence": r.get("evidence", {})})
scored = {r["id"] for r in rows}
for cid in {r["category"] for r in rows}:
    skipped = [i for i, (c, _) in stored.items() if c == cid and i not in scored]
    if skipped and not a.partial and not any(i.startswith("d-") for i in skipped):
        print(f"warning: {cid}: {len(skipped)} Pairs have no result (evaluator skipped them?): {skipped[:5]}")
if problems: sys.exit("results don't match the Dataset:\n" + "\n".join(problems))

rows.sort(key=lambda r: r["id"])
passing = sorted((r for r in rows if not r["fails"]), key=lambda r: -r["weakness"])
weak = {r["id"] for r in passing[:round(len(rows) * a.weakest)]}
for r in rows: r["worklist"] = "fail" if r["fails"] else ("weak" if r["id"] in weak else None)
audit = {"prompt_version": a.prompt, "model": a.model, "blind": True,
         "rules": {"tier": TIER_RULES, "all": "giveaway_risk>=7, one_sided>=7, familiarity<6, kind_of, is_set, not same_kind, unsafe, misfiled, tier_guess two tiers off",
                   "spy_guess": "recorded, not gated yet (v3)"},
         "summary": {"pairs": len(rows), "fail": sum(r["worklist"] == "fail" for r in rows), "weak": len(weak),
                     "spy_guess_7plus": {t: sum(r["scores"].get("spy_guess", 0) >= 7 for r in rows if r["tier"] == t) for t in TIER_N}},
         "pairs": rows}
json.dump(audit, open(os.path.join(ROOT, a.out) if not os.path.isabs(a.out) else a.out, "w"), indent=1, ensure_ascii=False)

print(f"{len(rows)} pairs scored → {a.out}: {audit['summary']['fail']} fail, {len(weak)} weakest-but-passing")
print(f"spy_guess >= 7 by tier (not gated): {audit['summary']['spy_guess_7plus']}")
for r in rows:
    if r["worklist"]:
        print(f"{r['id']} {r['worklist']:4} w{r['weakness']:2} {'/'.join(r['words'])} [{r['tier']}→{r['tier_guess']}] "
              f"{'; '.join(r['fails'])} :: {r['note']}")
