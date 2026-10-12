"""Builds the site from src/.

src/<page>.html are page bodies; they pull shared code in with
  /*@include shared/x.css*/   //@include shared/x.js   <!--@include shared/x.html-->
Outputs:
  site/     the installable PWA (full HTML pages + manifest, service worker, icons, sounds) -> GitHub Pages
  preview/  the same pages for the claude.ai preview (index.html is a body fragment there)
"""
import pathlib, re, shutil

root = pathlib.Path(__file__).parent
src = root / "src"
PAGES = {"index.html": "basketball.html", "badminton.html": "badminton.html"}
INCLUDE = re.compile(r"/\*@include (\S+)\*/|//@include (\S+)|<!--@include (\S+)-->")

def expand(text):
    return INCLUDE.sub(lambda m: (src / next(g for g in m.groups() if g)).read_text(), text)

HEAD = """<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#241e1e">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="記分板">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box}[hidden]{display:none!important}</style>
</head>
<body>
"""
TAIL = """
<script>
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
</script>
</body>
</html>
"""

def build():
    site, preview = root / "site", root / "preview"
    for d in (site, preview):
        shutil.rmtree(d, ignore_errors=True); d.mkdir()
    shutil.copytree(root / "static", site, dirs_exist_ok=True)
    for out, page in PAGES.items():
        body = expand((src / page).read_text())
        full = HEAD + body + TAIL
        (site / out).write_text(full)
        (preview / out).write_text(body if out == "index.html" else full)
    print("built", ", ".join(PAGES))

if __name__ == "__main__":
    build()
