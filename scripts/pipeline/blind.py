"""Write blind evaluator inputs: only the Category name and the two words, never difference or difficulty.

  python3 scripts/pipeline/blind.py OUT_DIR --categories all          # one file per Category
  python3 scripts/pipeline/blind.py OUT_DIR --categories jobs,gadgets
  python3 scripts/pipeline/blind.py OUT_DIR --ids en-0101,en-0230     # one recheck.json across Categories
  python3 scripts/pipeline/blind.py OUT_DIR --drafts dataset/drafts/board-games.json

Drafts are also pre-checked against the whole Dataset for QC-09 and QC-10, so the evaluator's time
isn't spent on candidates that can never ship."""
import argparse, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dataset_lib import all_words, category_path, load_category, phrasing_errors, registry

ap = argparse.ArgumentParser()
ap.add_argument("out")
g = ap.add_mutually_exclusive_group(required=True)
g.add_argument("--categories"); g.add_argument("--ids"); g.add_argument("--drafts")
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)


def blind(d, pairs):
    return [{"category": d["name"], "id": p["id"], "words": p["words"]} for p in pairs]


def write(name, rows):
    path = os.path.join(a.out, name + ".json")
    json.dump({"pairs": rows}, open(path, "w"), indent=1, ensure_ascii=False)
    print(f"{path}: {len(rows)} pairs")


if a.categories:
    cids = registry()["order"] if a.categories == "all" else a.categories.split(",")
    for cid in cids:
        d = load_category(category_path(cid)); write(cid, blind(d, d["pairs"]))
elif a.ids:
    want = set(a.ids.split(",")); rows = []
    for cid in registry()["order"]:
        d = load_category(category_path(cid))
        rows += blind(d, [p for p in d["pairs"] if p["id"] in want])
    missing = want - {r["id"] for r in rows}
    if missing: sys.exit(f"unknown ids: {sorted(missing)}")
    write("recheck", rows)
else:
    d = load_category(a.drafts); existing = all_words(); errs = []; seen = {}
    for p in d["pairs"]:
        for w in p["words"]:
            k = w.lower()
            if k in existing: errs.append(f"{p['id']}: {w!r} already in the Dataset ({existing[k]}) (QC-09)")
            if k in seen: errs.append(f"{p['id']}: {w!r} repeats draft {seen[k]} (QC-09)")
            seen[k] = p["id"]; errs += phrasing_errors(p["id"], w)[0]
    both = {**existing, **seen}
    for x in seen:  # QC-09 modifier rule, only for pairs involving a draft word
        for y in both:
            if x != y and (y.endswith(" " + x) or y.startswith(x + " ") or x.endswith(" " + y) or x.startswith(y + " ")):
                errs.append(f"{seen[x]}: {x!r} and {y!r} ({both[y]}) differ only by a modifier (QC-09)")
    print("\n".join(errs) if errs else "drafts: QC-09/QC-10 pre-check clean")
    write(d["id"] + ".drafts", blind(d, d["pairs"]))
