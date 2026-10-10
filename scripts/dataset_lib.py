"""Shared dataset rules and file helpers for check_dataset.py and the pipeline scripts.
Standard library only. Paths are relative to the repo root."""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "dataset", "categories.json")
TIERS = ("easy", "medium", "hard")
US = {"color","favorite","center","theater","airplane","jewelry","donut","gray","mustache","pajamas","catalog","tire","aluminum","flavor"}
SMALL = {"and","or","of","the","in","on","a","an","to","with","for"}


def registry():
    return json.load(open(REGISTRY))


def save_registry(reg):
    open(REGISTRY, "w").write(json.dumps(reg, indent=2, ensure_ascii=False) + "\n")


def category_path(cid, locale="en"):
    return os.path.join(ROOT, "dataset", locale, cid + ".json")


def load_category(path):
    return json.load(open(path))


def write_category(path, d):
    """One Pair per line, keeping the file's existing brace style ({"id"… or { "id"…)."""
    spaced = os.path.exists(path) and '\n    { "id"' in open(path).read()
    lines = [json.dumps(p, ensure_ascii=False) for p in d["pairs"]]
    if spaced:
        lines = ["{ " + l[1:-1] + " }" for l in lines]
    body = ",\n".join("    " + l for l in lines)
    open(path, "w").write('{\n  "id": %s,\n  "name": %s,\n  "pairs": [\n%s\n  ]\n}\n'
                          % (json.dumps(d["id"]), json.dumps(d["name"], ensure_ascii=False), body))


def block(cid, reg=None):
    """(lo, hi) id numbers owned by a Category."""
    n = (reg or registry())["order"].index(cid)
    return n * 100 + 1, n * 100 + 99


def next_id(cid, taken=(), reg=None, locale="en"):
    """Next free id in the Category's block, skipping current, retired and `taken` ids."""
    reg = reg or registry()
    lo, hi = block(cid, reg)
    used = set(taken) | set(reg.get("retired", []))
    path = category_path(cid, locale)
    if os.path.exists(path):
        used |= {p["id"] for p in load_category(path)["pairs"]}
    nums = [int(i.split("-")[1]) for i in used if lo <= int(i.split("-")[1]) <= hi]
    n = max(nums, default=lo - 1) + 1
    if n > hi:
        raise SystemExit(f"{cid}: id block exhausted")
    return f"{locale}-{n:04d}"


def phrasing_errors(pid, w):
    """QC-10 Machine checks for one word. Returns (errors, notes)."""
    errs, notes = [], []
    toks = w.split()
    if toks[0].lower() in ("a", "an", "the"):
        errs.append(f"{pid}: article in {w!r} (QC-10)")
    for i, t in enumerate(toks):
        if not (t[0].isupper() or t[0].isdigit() or (i > 0 and t in SMALL)):
            errs.append(f"{pid}: not Title Case {w!r} (QC-10)")
        if re.sub(r"[^a-z]", "", t.lower()) in US:
            errs.append(f"{pid}: US spelling {w!r} (QC-10)")
    if len([t for t in toks if t not in SMALL]) > 2:
        notes.append(f"{pid}: {w!r} >2 words (QC-10, curator)")
    return errs, notes


def modifier_conflicts(words):
    """QC-09 modifier rule over {lowercase word: pair id}: no word is another word plus a modifier."""
    out = []
    for a in words:
        for b in words:
            if a != b and (b.endswith(" " + a) or b.startswith(a + " ")):
                out.append(f"modifier overlap {a!r} / {b!r} ({words[a]}, {words[b]}) (QC-09)")
    return out


def all_words(locale="en", skip_ids=()):
    """{lowercase word: pair id} across the whole locale."""
    reg = registry(); words = {}
    for cid in reg["order"]:
        path = category_path(cid, locale)
        if os.path.exists(path):
            for p in load_category(path)["pairs"]:
                if p["id"] not in skip_ids:
                    for w in p["words"]:
                        words[w.lower()] = p["id"]
    return words
