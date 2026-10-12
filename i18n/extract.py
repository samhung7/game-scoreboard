"""Collect every user-visible Chinese string from src/ as translation keys.
Usage: python3 i18n/extract.py src i18n/found.json   (compare with keys.json to see what is new)
Template literal parts ${...} become {0}, {1}... in the key."""
import re, json, pathlib, sys, html
src = pathlib.Path(sys.argv[1])
CJK = re.compile(r"[　-〿㐀-鿿＀-￯]")
keys = {}
def add(k, where):
    k = k.strip()
    if k and CJK.search(k): keys.setdefault(k, where)

def js_strings(text):
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        if text.startswith("//", i):
            j = text.find("\n", i); 
            if j < 0: break
            # comment: skip
            i = j; continue
        if text.startswith("/*", i):
            i = text.find("*/", i) + 2; continue
        if c in "'\"":
            j = i + 1
            while text[j] != c:
                j += 2 if text[j] == "\\" else 1
            yield text[i+1:j]; i = j + 1; continue
        if c == "`":
            j = i + 1; parts = []; buf = ""; idx = 0
            while text[j] != "`":
                if text[j] == "\\": buf += text[j:j+2]; j += 2; continue
                if text.startswith("${", j):
                    depth = 1; k = j + 2
                    while depth:
                        if text[k] == "{": depth += 1
                        elif text[k] == "}": depth -= 1
                        elif text[k] in "'\"`":
                            # skip nested string roughly
                            q = text[k]; k += 1
                            while text[k] != q:
                                if text[k] == "\\": k += 1
                                elif q == "`" and text.startswith("${", k):
                                    d2 = 1; k += 2
                                    while d2:
                                        if text[k] == "{": d2 += 1
                                        elif text[k] == "}": d2 -= 1
                                        k += 1
                                    continue
                                k += 1
                        k += 1
                    inner = text[j+2:k-1]
                    yield from js_strings(inner)
                    buf += "{%d}" % idx; idx += 1; j = k; continue
                buf += text[j]; j += 1
            yield buf; i = j + 1; continue
        i += 1

import subprocess, os
TS = os.popen("npm root -g").read().strip() + "/typescript"
for f in sorted(src.rglob("*.js")):
    for s in json.loads(subprocess.check_output(["node", os.path.join(os.path.dirname(__file__), "jsstr.cjs"), TS, str(f)])):
        # strings that are HTML snippets: split into text pieces
        if "<" in s and ">" in s:
            for piece in re.split(r"<[^>]*>", s):
                add(piece, f.name)
            for m in re.finditer(r'(?:aria-label|title|placeholder)="([^"]*)"', s): add(m.group(1), f.name)
        else:
            add(s, f.name)
for f in sorted(list(src.glob("*.html")) + list((src / "partials").glob("*.html"))):
    t = re.sub(r"<!--.*?-->", "", f.read_text(), flags=re.S)
    t = re.sub(r"<script.*?</script>", "", t, flags=re.S)
    t = re.sub(r"<style.*?</style>", "", t, flags=re.S)
    for m in re.finditer(r'(?:aria-label|title|placeholder|content)="([^"]*)"', t): add(html.unescape(m.group(1)), f.name)
    for piece in re.split(r"<[^>]*>", t): add(html.unescape(piece), f.name)
json.dump(keys, open(sys.argv[2], "w"), ensure_ascii=False, indent=0)
print(len(keys))
