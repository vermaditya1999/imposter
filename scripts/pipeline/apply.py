"""Apply curator decisions to the Dataset, the curation logs and the audit file, in one step.

  python3 scripts/pipeline/apply.py CHANGES.json [--dry-run]

CHANGES.json:
{
  "heading": "Audit (v2)",                       # section in docs/curation/<category>.md (created if missing)
  "intro": "One paragraph for a new section.",
  "audit": "docs/curation/audit-v2.json",        # optional: record each decision on its audit row
  "changes": [
    {"action": "keep",   "id": "en-0102", "why": "..."},
    {"action": "change", "id": "en-0103", "words": ["Jalebi", "Churros"], "difficulty": "medium",
     "difference": "...", "qc": "QC-04", "why": "..."},
    {"action": "add",    "category": "sweets-desserts", "words": [...], "difficulty": "...",
     "difference": "...", "why": "...", "from": "d-007"},
    {"action": "remove", "id": "en-0230", "qc": "QC-02", "why": "..."}
  ]
}

Id policy (ids freeze at release): a released id is one present on origin/main. A change to a released
Pair's words retires its id and gives the Pair the next free id in its block; changing only the
difficulty or difference keeps the id. Unreleased ids are edited in place. Removed released ids are
retired. Retired ids are listed in dataset/categories.json and never reused."""
import argparse, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dataset_lib import ROOT, category_path, load_category, next_id, registry, save_registry, write_category

ap = argparse.ArgumentParser(); ap.add_argument("changes"); ap.add_argument("--dry-run", action="store_true")
a = ap.parse_args()
spec = json.load(open(a.changes)); reg = registry()
cats = {cid: load_category(category_path(cid)) for cid in reg["order"] if os.path.exists(category_path(cid))}
where = {p["id"]: cid for cid, d in cats.items() for p in d["pairs"]}


def released_ids(cid):
    try:
        out = subprocess.run(["git", "-C", ROOT, "show", f"origin/main:dataset/en/{cid}.json"], capture_output=True, text=True)
        return {p["id"] for p in json.loads(out.stdout)["pairs"]} if out.returncode == 0 else set()
    except FileNotFoundError:
        return {p["id"] for p in cats[cid]["pairs"]}  # no git: treat everything as released


released = {cid: released_ids(cid) for cid in cats}
taken, rows, decisions = set(), {}, {}


def label(words, tier, pid):
    return f"{' / '.join(words)} ({tier.title()}, `{pid}`)"


for c in spec["changes"]:
    act = c["action"]
    if act == "add":
        cid = c["category"]; d = cats[cid]
        nid = next_id(cid, taken | {p["id"] for p in d["pairs"]}, reg); taken.add(nid)
        p = {"id": nid, "words": c["words"], "difficulty": c["difficulty"], "difference": c["difference"]}
        d["pairs"].append(p)
        rows.setdefault(cid, []).append(f"| *(new{', draft ' + c['from'] if c.get('from') else ''})* | add → **{label(p['words'], p['difficulty'], nid)}** | {c['why']} |")
        decisions[c.get("from") or nid] = {"action": "add", "new_id": nid}
        continue
    pid = c["id"]; cid = where[pid]; d = cats[cid]
    i = next(k for k, p in enumerate(d["pairs"]) if p["id"] == pid); old = d["pairs"][i]
    before = label(old["words"], old["difficulty"], pid)
    if act == "keep":
        rows.setdefault(cid, []).append(f"| {before} | keep | {c['why']} |")
        decisions[pid] = {"action": "keep", "why": c["why"]}
    elif act == "remove":
        del d["pairs"][i]
        if pid in released[cid]: reg["retired"].append(pid)
        rows.setdefault(cid, []).append(f"| {before} | remove: {c['qc']} | {c['why']} |")
        decisions[pid] = {"action": "remove", "qc": c["qc"]}
    elif act == "change":
        new = {"id": pid, "words": c.get("words", old["words"]), "difficulty": c.get("difficulty", old["difficulty"]),
               "difference": c.get("difference", old["difference"])}
        if new["words"] != old["words"] and pid in released[cid]:
            new["id"] = next_id(cid, taken | {p["id"] for p in d["pairs"]}, reg); taken.add(new["id"])
            reg["retired"].append(pid)
        d["pairs"][i] = new
        rows.setdefault(cid, []).append(f"| {before} | {c['qc']} → **{label(new['words'], new['difficulty'], new['id'])}** | {c['why']} |")
        decisions[pid] = {"action": "change", "qc": c["qc"], "new_id": new["id"], "new_words": new["words"], "new_difficulty": new["difficulty"]}
    else:
        sys.exit(f"unknown action {act!r}")

if a.dry_run:
    for cid, r in rows.items(): print(f"## {cid}\n" + "\n".join(r))
    sys.exit(0)

for cid in rows: write_category(category_path(cid), cats[cid])
reg["retired"] = sorted(set(reg["retired"])); save_registry(reg)
for cid, r in rows.items():
    log = os.path.join(ROOT, "docs", "curation", cid + ".md")
    text = open(log).read() if os.path.exists(log) else f"# Curation log: {cats[cid]['name']}\n"
    head = f"## {spec['heading']}"
    if head not in text:
        text = text.rstrip("\n") + f"\n\n{head}\n\n{spec.get('intro', '')}\n\n| Pair | Verdict | Why |\n|---|---|---|\n"
    text = text.rstrip("\n") + "\n" + "\n".join(r) + "\n"
    open(log, "w").write(text)
if spec.get("audit"):
    path = os.path.join(ROOT, spec["audit"]); audit = json.load(open(path))
    for row in audit["pairs"]:
        if row["id"] in decisions: row["recuration"] = decisions[row["id"]]
        # a follow-up decision on an id this audit created updates the row that created it
        prev = row.get("recuration") or {}
        if prev.get("new_id") in decisions and prev.get("new_id") != row["id"]:
            follow = decisions[prev["new_id"]]
            for k in ("new_id", "new_words", "new_difficulty"):
                if k in follow: prev[k] = follow[k]
            if follow["action"] == "remove": prev["removed_later"] = follow["qc"]
    json.dump(audit, open(path, "w"), indent=1, ensure_ascii=False)
print(f"applied {len(spec['changes'])} decisions across {len(rows)} Categories; retired ids now {len(reg['retired'])}")
