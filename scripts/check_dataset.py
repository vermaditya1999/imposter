"""Machine checks for the Quality Checklist (QC-09, QC-10, QC-12, QC-13, id blocks, difference present).
Id blocks and retired ids come from dataset/categories.json (append-only).
Usage: python3 scripts/check_dataset.py dataset/en"""
import collections, glob, json, os, sys
from dataset_lib import TIERS, modifier_conflicts, phrasing_errors, registry

root = sys.argv[1]
reg = registry(); ORDER = reg["order"]; RETIRED = set(reg.get("retired", []))
errs = []; words = {}
for f in sorted(glob.glob(os.path.join(root, "*.json"))):
    d = json.load(open(f)); cid = d["id"]; P = d["pairs"]
    if cid + ".json" != os.path.basename(f): errs.append(f"{f}: id mismatch")
    if cid not in ORDER: errs.append(f"{cid}: not registered in dataset/categories.json"); continue
    n = ORDER.index(cid); lo, hi = n * 100 + 1, n * 100 + 99
    mix = collections.Counter(p["difficulty"] for p in P)
    if not 28 <= len(P) <= 35: errs.append(f"{cid}: {len(P)} pairs (QC-12)")
    for t in TIERS:
        if mix[t] < 8: errs.append(f"{cid}: only {mix[t]} {t} (QC-13)")
    for p in P:
        num = int(p["id"].split("-")[1])
        if not (p["id"].startswith("en-") and lo <= num <= hi): errs.append(f"{cid}: id {p['id']} outside block")
        if p["id"] in RETIRED: errs.append(f"{p['id']}: retired id reused")
        if not p.get("difference", "").strip(): errs.append(f"{p['id']}: no difference (QC-02)")
        if p["difficulty"] not in TIERS: errs.append(f"{p['id']}: bad difficulty")
        if len(p["words"]) != 2: errs.append(f"{p['id']}: needs 2 words")
        for w in p["words"]:
            k = w.lower()
            if k in words: errs.append(f"duplicate word {w!r}: {words[k]} & {p['id']} (QC-09)")
            words[k] = p["id"]
            e, notes = phrasing_errors(p["id"], w); errs += e
            for note in notes: print("  note " + note)
    print(f"{cid:22} {len(P):3} pairs  E{mix['easy']:>2} M{mix['medium']:>2} H{mix['hard']:>2}")
errs += modifier_conflicts(words)
missing = [c for c in ORDER if not os.path.exists(os.path.join(root, c + ".json"))]
if missing: errs.append(f"registered but missing: {missing}")
print(f"TOTAL {len(words)//2} pairs, {len(words)} words")
print("\n".join(errs) if errs else "ALL CHECKS PASS")
sys.exit(1 if errs else 0)
