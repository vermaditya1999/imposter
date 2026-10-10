"""Register a new Category (theme): claim the next id block and create its empty files.

  python3 scripts/pipeline/new_category.py board-games "Board Games"

Appends the id to dataset/categories.json (blocks are append-only), and creates
dataset/en/<id>.json (no Pairs yet), dataset/drafts/<id>.json (where candidates are drafted) and
docs/curation/<id>.md. The Machine checks fail (QC-12) until the Category has 28–35 Pairs, so add
the Pairs before building."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dataset_lib import ROOT, category_path, registry, save_registry, write_category

cid, name = sys.argv[1], sys.argv[2]
reg = registry()
if cid in reg["order"]: sys.exit(f"{cid} is already registered")
if len(reg["order"]) >= 100: sys.exit("no id blocks left")
reg["order"].append(cid); save_registry(reg)
n = len(reg["order"]) - 1
write_category(category_path(cid), {"id": cid, "name": name, "pairs": []})
drafts = os.path.join(ROOT, "dataset", "drafts", cid + ".json")
os.makedirs(os.path.dirname(drafts), exist_ok=True)
if not os.path.exists(drafts):
    json.dump({"id": cid, "name": name, "pairs": []}, open(drafts, "w"), indent=1)
log = os.path.join(ROOT, "docs", "curation", cid + ".md")
if not os.path.exists(log):
    open(log, "w").write(f"# Curation log: {name}\n\nDrafted and curated through the [dataset pipeline](../pipeline/README.md). "
                         f"Each verdict cites the [Quality Checklist](../quality-checklist.md) criterion that decided it.\n")
print(f"{cid}: block {n} → ids en-{n:02d}01…en-{n:02d}99\n  {category_path(cid)}\n  {drafts}\n  {log}")
