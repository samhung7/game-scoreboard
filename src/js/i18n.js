/* Language switch. The pages are written in Traditional Chinese; for another language the build's <head> loads
   js/i18n/<lang>.js first, which sets window.I18N_DICT = { "source text": "translation" }. Keys may hold {0}, {1}...
   for values filled in at runtime (numbers, names, other phrases), so "第 {0} 局" also matches "第 3 局".
   Every text node and label on the page is translated as it appears, including text the scripts write later. */
const I18N = (() => {
  const KEY = "scoreboard-lang";
  const LANGS = [["zh-Hant", "繁體中文"], ["zh-Hans", "简体中文"], ["en", "English"], ["ja", "日本語"], ["ko", "한국어"]];
  const SEPS = { "zh-Hans": null, ja: { "，": "、", "、": "、", "。": "。", "：": "：" }, default: { "，": ", ", "、": ", ", "。": ". ", "：": ": " } };
  const CJK = /[㐀-鿿]/;
  const saved = (() => { try { return localStorage.getItem(KEY); } catch (e) { return null; } })();
  const lang = saved || detect(); // nothing picked = follow the device
  // the device's language list in order of preference (navigator.languages); the first one we have wins
  function detect() {
    for (const raw of navigator.languages?.length ? navigator.languages : [navigator.language || "zh-TW"]) {
      const n = raw.toLowerCase();
      if (n.startsWith("zh")) return /cn|sg|hans/.test(n) ? "zh-Hans" : "zh-Hant";
      if (n.startsWith("ja")) return "ja";
      if (n.startsWith("ko")) return "ko";
      if (n.startsWith("en")) return "en";
    }
    return "en";
  }
  const page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "");
  const dict = lang !== "zh-Hant" && window.I18N_DICT ? { ...window.I18N_DICT, ...(window.I18N_SPORT || {})[page] } : null;
  const exact = new Map(), patterns = [];
  if (dict) {
    for (const [k, v] of Object.entries(dict)) {
      if (!/\{\d+\}/.test(k)) { exact.set(k, v); continue; }
      const names = [];
      const re = new RegExp("^" + k.split(/(\{\d+\})/).map((part) => {
        const m = part.match(/^\{(\d+)\}$/);
        if (m) { names.push(m[1]); return "(.+?)"; }
        return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("") + "$", "s");
      patterns.push({ re, names, out: v, weight: k.replace(/\{\d+\}/g, "").length });
    }
    patterns.sort((a, b) => b.weight - a.weight); // the most specific pattern wins
  }
  const seps = SEPS[lang] === null ? null : SEPS[lang] || SEPS.default;

  function core(s) {
    if (exact.has(s)) return exact.get(s);
    for (const p of patterns) {
      const m = p.re.exec(s); if (!m || m.slice(1).some((v) => v.includes(" · "))) continue; // " · " joins separate phrases
      const vals = {}; p.names.forEach((n, i) => (vals[n] = m[i + 1]));
      return p.out.replace(/\{(\d+)\}/g, (_, n) => tr(vals[n] ?? ""));
    }
    // a line glued together from several phrases: translate each piece
    for (const sep of [" · ", "、", "，", "。", "："]) {
      if (!s.includes(sep)) continue;
      const parts = s.split(sep); if (parts.length < 2) continue;
      const done = parts.map((x) => tr(x));
      if (done.some((x, i) => x !== parts[i])) return done.join(sep === " · " || !seps ? sep : seps[sep]).replace(/\s+$/, "");
    }
    return s;
  }
  function tr(s) {
    if (!dict || !s || !CJK.test(s)) return s;
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
    return lead + core(s.trim()) + trail;
  }

  /* ---------- apply to the page, now and whenever the scripts change it ---------- */
  const done = new WeakMap(); // node -> text we wrote, so our own writes are not translated again
  const ATTRS = ["aria-label", "placeholder", "title"];
  const skip = (n) => n.parentElement?.closest("[data-notr], script, style");
  function textNode(n) {
    if (done.get(n) === n.nodeValue || skip(n)) return;
    const v = n.parentElement?.tagName === "TITLE" ? n.nodeValue.split("｜")[0] : n.nodeValue; // the tab shows just the board's name; the long title is for search engines
    const t = tr(v); if (t !== n.nodeValue) n.nodeValue = t;
    done.set(n, n.nodeValue);
  }
  function attrs(el) {
    if (el.closest("[data-notr]")) return;
    ATTRS.forEach((a) => {
      const v = el.getAttribute(a); if (!v) return;
      const key = "a:" + a; const seen = done.get(el) || {}; if (seen[key] === v) return;
      const t = tr(v); if (t !== v) el.setAttribute(a, t);
      seen[key] = t; done.set(el, seen);
    });
  }
  function walk(root) {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1) return;
    attrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? textNode(n) : attrs(n);
  }
  if (dict) {
    document.documentElement.lang = lang;
    new MutationObserver((list) => list.forEach((m) => {
      if (m.type === "characterData") textNode(m.target);
      else if (m.type === "attributes") attrs(m.target);
      else m.addedNodes.forEach(walk);
    })).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    document.addEventListener("DOMContentLoaded", () => walk(document.documentElement));
    if (document.readyState !== "loading") walk(document.documentElement);
    // names typed into the name boxes are kept as typed; only the built-in defaults ("主隊", "選手 A") get translated
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    Object.defineProperty(HTMLInputElement.prototype, "value", {
      configurable: true, get() { return desc.get.call(this); },
      set(v) { desc.set.call(this, this.classList.contains("name") ? tr(String(v)) : v); },
    });
  }

  /* ---------- the language picker, at the top of every settings sheet ---------- */
  const AUTO = { "zh-Hant": "跟隨系統（繁體中文）", "zh-Hans": "跟随系统（简体中文）", en: "System (English)", ja: "システム（日本語）", ko: "시스템 (한국어)" };
  function addPicker() {
    document.querySelectorAll("#setOv .sheet > h2").forEach((h2) => {
      const row = document.createElement("div"); row.className = "row"; row.dataset.notr = "";
      row.innerHTML = `<label for="langSel">🌐 Language<small>語言 · 语言 · 言語 · 언어</small></label><select id="langSel" class="langsel"><option value="">${AUTO[detect()]}</option>${LANGS.map(([v, l]) => `<option value="${v}"${v === saved ? " selected" : ""}>${l}</option>`).join("")}</select>`;
      h2.after(row);
      row.querySelector("select").addEventListener("change", (e) => { try { e.target.value ? localStorage.setItem(KEY, e.target.value) : localStorage.removeItem(KEY); } catch (err) {} location.reload(); });
    });
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", addPicker) : addPicker();

  return { lang, tr, LANGS };
})();
