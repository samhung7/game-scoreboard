"""Writes src/js/i18n/<lang>.js from the translation JSON files in this folder.
Usage: python3 i18n/mkdict.py en ja ko zh-Hans
To add text: run extract.py to list the Chinese source strings, add the new ones to each <lang>.json, then run this."""
import json, sys, pathlib, os
here = pathlib.Path(__file__).parent; os.chdir(here)
out = here.parent / "src" / "js" / "i18n"; out.mkdir(exist_ok=True)
for lang in sys.argv[1:]:
    d = json.load(open(f"{lang}.json"))
    for k, v in json.load(open("overrides.json")).items(): d[k] = v[lang]
    for k in d:
        if k.startswith("·"): d[k] = d[k].lstrip()
    li = {"en": 0, "ja": 1, "ko": 2}.get(lang)
    sport = {"volleyball": {k: v[li] for k, v in json.load(open("volley.json")).items()}} if li is not None else {}
    (out / f"{lang}.js").write_text("/* Translation table, generated from the Chinese source text (see js/i18n.js). */\nwindow.I18N_DICT = " + json.dumps(d, ensure_ascii=False, indent=0) + ";\n"
        + "/* words that differ by sport, e.g. a volleyball 局 is a set */\nwindow.I18N_SPORT = " + json.dumps(sport, ensure_ascii=False, indent=0) + ";\n")
    print(lang, len(d))
