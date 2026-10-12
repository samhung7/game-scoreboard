"""Builds the site from src/.

src/
  *.html                       page markup (body only; the build adds <head> and the PWA hooks)
  css/                         base.css (shared look) + one stylesheet per page
  js/                          kit.js (sounds, DJ pads, music, score reel) + one script per page
  partials/                    HTML shared by several pages, pulled in with <!--@include partials/x.html-->
Outputs:
  site/     the installable PWA (full HTML pages + manifest, service worker, icons, sounds) -> GitHub Pages
  preview/  the same pages for the claude.ai preview (index.html is a body fragment there)
"""
import html, json, pathlib, re, shutil

root = pathlib.Path(__file__).parent
src = root / "src"
PAGES = ["index.html", "badminton.html", "volleyball.html", "tennis.html", "pickleball.html", "tabletennis.html"]
URL = "https://samhung7.github.io/game-scoreboard/"
# search engines and link previews read these; the in-page <title> is replaced by the one here
SEO = {
    "index.html": ("籃球記分板｜免費線上計分器，含比賽計時與 24 秒進攻時間",
                   "免費籃球記分板網頁 App：5v5／3v3 計分、比賽大錶、24／14 秒進攻時間、犯規與暫停、DJ 音效。手機平板直接開，可加入主畫面離線使用。"),
    "badminton.html": ("羽球記分板｜免費線上計分器，單打雙打發球自動判斷",
                       "免費羽球記分板網頁 App：21 分或 15 分制、單打雙打發球位置自動判斷、換場與局間休息計時。手機平板直接開，可加入主畫面離線使用。"),
    "volleyball.html": ("排球記分板｜免費線上計分器，室內與沙灘排球",
                        "免費排球記分板網頁 App：室內 25 分五局三勝、沙灘 21 分三局兩勝、決勝局 15 分、換場與暫停計時。手機平板直接開，可加入主畫面離線使用。"),
    "tennis.html": ("網球記分板｜免費線上計分器，含搶七與無占先",
                    "免費網球記分板網頁 App：15／30／40 與占先、搶七、決勝盤搶十、無占先、換場提示與發球權。手機平板直接開，可加入主畫面離線使用。"),
    "pickleball.html": ("匹克球記分板｜免費線上計分器，雙打發球 0-0-2",
                        "免費匹克球記分板網頁 App：傳統發球得分（0-0-2 喊分）或每球得分、11／15／21 分、換場與暫停計時。手機平板直接開，可加入主畫面離線使用。"),
    "tabletennis.html": ("桌球記分板｜免費線上計分器，11 分制自動換發球",
                         "免費桌球（乒乓球）記分板網頁 App：11 分制、每兩分換發、10 平後每分換發、決勝局換邊與暫停。手機平板直接開，可加入主畫面離線使用。"),
}
SPORTS = {"index.html": "籃球", "badminton.html": "羽球", "volleyball.html": "排球", "tennis.html": "網球", "pickleball.html": "匹克球", "tabletennis.html": "桌球"}

def seo_head(page):
    title, desc = SEO[page]; url = URL + ("" if page == "index.html" else page)
    ld = {"@context": "https://schema.org", "@type": "WebApplication", "name": title.split("｜")[0], "url": url, "description": desc,
          "applicationCategory": "SportsApplication", "operatingSystem": "Any (web browser)", "inLanguage": ["zh-Hant", "zh-Hans", "en", "ja", "ko"],
          "offers": {"@type": "Offer", "price": "0", "priceCurrency": "TWD"}, "isPartOf": {"@type": "WebSite", "name": "比賽記分板", "url": URL}}
    e = html.escape
    return f"""<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="比賽記分板">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{URL}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="zh_TW">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
"""

INCLUDE = re.compile(r"<!--@include (\S+)-->")

def expand(text):
    return INCLUDE.sub(lambda m: expand((src / m.group(1)).read_text()), text)  # partials may include partials

HEAD = """<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d1628">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="比賽記分板">
@@SEO@@
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<script>/* language: load the translation table before the page is drawn (see js/i18n.js) */
(function(){var l;try{l=localStorage.getItem("scoreboard-lang")}catch(e){}if(!l){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"zh-TW"];for(var i=0;i<a.length&&!l;i++){var n=a[i].toLowerCase();l=n.indexOf("zh")===0?(/cn|sg|hans/.test(n)?"zh-Hans":"zh-Hant"):n.indexOf("ja")===0?"ja":n.indexOf("ko")===0?"ko":n.indexOf("en")===0?"en":null}l=l||"en"}if(l!=="zh-Hant")document.write('<script src="js/i18n/'+l+'.js"></'+'script>')})();
</script>
<script src="js/i18n.js"></script>
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
    for d in (site, preview):
        for sub in ("css", "js"):
            shutil.copytree(src / sub, d / sub)
    for out in PAGES:
        raw = expand((src / out).read_text())
        body = re.sub(r"^<title>.*?</title>\n", "", raw)
        full = HEAD.replace("@@SEO@@", seo_head(out)) + body + TAIL
        (site / out).write_text(full)
        (preview / out).write_text(raw if out == "index.html" else full)
    today = __import__("datetime").date.today().isoformat()
    (site / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{URL}{'' if p == 'index.html' else p}</loc><lastmod>{today}</lastmod></url>\n" for p in PAGES) + "</urlset>\n")
    print("built", ", ".join(PAGES))

if __name__ == "__main__":
    build()
