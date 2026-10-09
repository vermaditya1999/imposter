"""Machine checks for the Quality Checklist (QC-09, QC-10, QC-12, QC-13, id blocks, difference present).
Stand-in for the planned scripts/check-dataset Node script. Usage: python3 scripts/check_dataset.py dataset/en"""
import json, sys, glob, os, re, collections

ORDER = ["indian-food","sweets-desserts","world-food","animals","places-around-town","travel-destinations","jobs",
         "sports-games","movies-shows","characters","brands-apps","around-the-house","clothes-accessories","gadgets"]
US = {"color","favorite","center","theater","airplane","jewelry","donut","gray","mustache","pajamas","catalog","tire","aluminum","flavor"}
SMALL = {"and","or","of","the","in","on","a","an","to","with","for"}

root = sys.argv[1]
errs = []; words = {}
for f in sorted(glob.glob(os.path.join(root, "*.json"))):
    d = json.load(open(f)); cid = d["id"]; P = d["pairs"]
    if cid + ".json" != os.path.basename(f): errs.append(f"{f}: id mismatch")
    n = ORDER.index(cid); lo, hi = n * 100 + 1, n * 100 + 99
    mix = collections.Counter(p["difficulty"] for p in P)
    if not 28 <= len(P) <= 35: errs.append(f"{cid}: {len(P)} pairs (QC-12)")
    for t in ("easy","medium","hard"):
        if mix[t] < 8: errs.append(f"{cid}: only {mix[t]} {t} (QC-13)")
    for p in P:
        num = int(p["id"].split("-")[1])
        if not (p["id"].startswith("en-") and lo <= num <= hi): errs.append(f"{cid}: id {p['id']} outside block")
        if not p.get("difference","").strip(): errs.append(f"{p['id']}: no difference (QC-02)")
        if p["difficulty"] not in ("easy","medium","hard"): errs.append(f"{p['id']}: bad difficulty")
        if len(p["words"]) != 2: errs.append(f"{p['id']}: needs 2 words")
        for w in p["words"]:
            k = w.lower()
            if k in words: errs.append(f"duplicate word {w!r}: {words[k]} & {p['id']} (QC-09)")
            words[k] = p["id"]
            toks = w.split()
            if toks[0].lower() in ("a","an","the"): errs.append(f"{p['id']}: article in {w!r} (QC-10)")
            for i, t in enumerate(toks):
                if not (t[0].isupper() or t[0].isdigit() or (i > 0 and t in SMALL)): errs.append(f"{p['id']}: not Title Case {w!r} (QC-10)")
                if re.sub(r"[^a-z]", "", t.lower()) in US: errs.append(f"{p['id']}: US spelling {w!r} (QC-10)")
            if len([t for t in toks if t not in SMALL]) > 2: print(f"  note {p['id']}: {w!r} >2 words (QC-10, curator)")
    print(f"{cid:22} {len(P):3} pairs  E{mix['easy']:>2} M{mix['medium']:>2} H{mix['hard']:>2}")
# modifier rule (QC-09): no word is another word plus a modifier
ks = list(words)
for a in ks:
    for b in ks:
        if a != b and (b.endswith(" " + a) or b.startswith(a + " ")):
            errs.append(f"modifier overlap {a!r} / {b!r} ({words[a]}, {words[b]}) (QC-09)")
print(f"TOTAL {sum(1 for _ in words)//2} pairs, {len(words)} words")
print("\n".join(errs) if errs else "ALL CHECKS PASS")
