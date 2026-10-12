/* Board for net and racket sports (volleyball, tennis, pickleball, table tennis).
   Works like the badminton board: tap "+1 得分" (or the big number) for whoever won the rally, swipe the number to fix it,
   undo any step. The rules live in js/sports/<sport>.js as window.SPORT; this file only runs them. */
(() => {
  const $ = (id) => document.getElementById(id);
  const SP = window.SPORT;
  const KEY = "rally-" + SP.id + "-v1";
  const SIDES = ["a", "b"];
  const other = (s) => (s === "a" ? "b" : "a");

  const fresh = (cfg = { ...SP.defaults }) => {
    const S = { cfg, names: SP.names(cfg.type), score: { a: 0, b: 0 }, units: [], server: "a", swapped: false, x: {}, tos: { a: 0, b: 0 }, undo: [], over: null, rest: null, startTs: 0, endTs: 0 };
    SP.startUnit(S, true);
    return S;
  };
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); S = { ...fresh(), ...o, cfg: { ...SP.defaults, ...o.cfg } }; } } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const wins = (s) => S.units.filter((u) => u.w === s).length;
  const best = () => SP.best(S.cfg);
  const need = () => Math.ceil(best() / 2);
  const snapshot = () => JSON.stringify({ score: S.score, units: S.units, server: S.server, swapped: S.swapped, x: S.x, tos: S.tos, over: S.over });
  const pushUndo = (snap = snapshot()) => { S.undo.push(snap); if (S.undo.length > 300) S.undo.shift(); };
  const ctx = () => ({ idx: S.units.length, deciding: S.units.length === best() - 1, best: best() }); // where we are in the match

  const Pads = Kit.pads($("pads"), SP.pads || "rally");
  document.title = SP.title;
  $("unitSep").textContent = SP.unit;

  /* ---------- sides ---------- */
  const T = {};
  SIDES.forEach((s) => {
    const sec = document.querySelector(`.team[data-side="${s}"]`);
    sec.appendChild($("teamTpl").content.cloneNode(true));
    const el = { name: sec.querySelector(".name"), serve: sec.querySelector(".serve"), court: sec.querySelector(".court"), score: sec.querySelector(".score"), lead: sec.querySelector(".lead"), extra: sec.querySelector(".extra"), dots: sec.querySelector(".dots"), tos: sec.querySelector(".tos") };
    T[s] = el;
    el.name.id = "name-" + s; el.name.setAttribute("aria-label", s === "a" ? "左邊名字" : "右邊名字");
    el.score.setAttribute("aria-valuemax", SP.maxPts);
    el.score.setAttribute("aria-label", "比分，點一下贏這一球，往下滑加分、往上滑扣分");
    el.name.addEventListener("input", () => { S.names[s] = el.name.value.trim() || SP.names(S.cfg.type)[s]; save(); });
    sec.querySelector(".plus").addEventListener("click", () => rally(s));
    sec.querySelector(".minus").addEventListener("click", () => adjust(s, -1));
    el.dots.addEventListener("click", (e) => { const i = e.target.dataset?.i; if (i != null) useTimeout(s, +i); });
    el.reel = Kit.reel({
      box: el.score, strip: sec.querySelector(".reel"), max: SP.maxPts, fmt: (v) => SP.fmt(S, s, v),
      get: () => S.score[s], set: (n) => { S.score[s] = n; renderLead(); }, locked: () => !!S.over || !!S.rest,
      commit: (base) => {
        if (S.score[s] === base) return render();
        const now = S.score[s]; S.score[s] = base; pushUndo(); S.score[s] = now;
        SP.sync?.(S, ctx());
        if (now > base) settle(s); else { save(); render(); }
      },
      tap: () => rally(s),
    });
  });

  /* ---------- scoring ---------- */
  function rally(s) {
    if (S.over || S.rest) return;
    if (!S.startTs) S.startTs = Date.now();
    pushUndo();
    const scored = SP.rally(S, s, ctx());
    SP.sync?.(S, ctx());
    if (scored !== false) { const el = T[s].score; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
    settle(s);
  }
  function adjust(s, d) {
    if (S.over || S.rest) return;
    const n = Math.max(0, Math.min(SP.maxPts, S.score[s] + d)); if (n === S.score[s]) return;
    pushUndo(); S.score[s] = n; SP.sync?.(S, ctx());
    if (d > 0) settle(s); else { save(); render(); }
  }
  // after a point: let the sport report what happens (change ends, a game inside a set...), then check the end of the game/set
  function settle(s) {
    Kit.ctx();
    const events = SP.settle?.(S, s, ctx()) || [];
    const w = SP.unitWinner(S, ctx());
    if (w) return unitEnd(w, events);
    apply(events); save(); render();
  }
  function unitEnd(w, events) {
    S.units.push(SP.unitResult(S, w));
    if (wins(w) >= need()) {
      S.over = { w }; S.endTs = Date.now(); save(); render(); showResult(); Kit.play("cheer"); return;
    }
    SP.startUnit(S, false, w, ctx());
    if (SP.timeouts(S.cfg).per === "unit") S.tos = { a: 0, b: 0 };
    const between = SP.betweenUnits?.(S, w, ctx()) || [];
    apply(events.filter((e) => e.type !== "rest").concat(between));
    save(); render(); Kit.play("cheer");
  }
  function apply(events) {
    let swapped = false;
    events.forEach((e) => {
      if (e.type === "swap" && !swapped) { S.swapped = !S.swapped; swapped = true; toast(e.text || "換場：雙方交換場地"); }
      if (e.type === "toast") toast(e.text);
      if (e.type === "rest" && S.cfg.rests) startRest(e);
    });
  }
  function undo() {
    const last = S.undo.pop(); if (!last) return;
    Object.assign(S, JSON.parse(last)); closeRest(); $("resOv").hidden = true; save(); render();
  }

  /* ---------- timeouts: dots under each name, tap the next one to call a timeout ---------- */
  function useTimeout(s, i) {
    const t = SP.timeouts(S.cfg), used = S.tos[s];
    if (i >= t.n - used) { S.tos[s] = Math.max(0, used - 1); save(); return render(); }
    if (S.over) return;
    S.tos[s] = Math.min(t.n, used + 1); save(); render();
    startRest({ sec: t.sec, tag: "暫停", title: `${S.names[s]} 請求暫停`, detail: `暫停 ${t.sec} 秒。`, force: true });
  }

  /* ---------- rest countdown ---------- */
  let restTimer = 0;
  function startRest(e) {
    S.rest = { until: Date.now() + e.sec * 1000, warned: false, e }; save();
    $("restTag").textContent = e.tag || "休息"; $("restTitle").textContent = e.title || `休息 ${e.sec} 秒`; $("restDetail").textContent = e.detail || "";
    $("restOv").hidden = false; Kit.keepAwake(true);
    clearInterval(restTimer); restTimer = setInterval(tickRest, 200); tickRest();
  }
  function tickRest() {
    if (!S.rest) return;
    const left = Math.max(0, S.rest.until - Date.now()), s = Math.ceil(left / 1000);
    const clk = $("restClock"); clk.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; clk.classList.toggle("warn", s <= 15);
    if (s <= 15 && !S.rest.warned && S.rest.e.sec > 20) { S.rest.warned = true; save(); Kit.SFX.beep(); }
    if (left <= 0) { Kit.SFX.buzzer(); closeRest(); save(); render(); }
  }
  function closeRest() { clearInterval(restTimer); S.rest = null; $("restOv").hidden = true; Kit.keepAwake(false); }

  /* ---------- end of match ---------- */
  function showResult() {
    const w = S.over.w;
    $("resWinner").textContent = `${S.names[w]} 獲勝`;
    $("resH").textContent = wins("a"); $("resA").textContent = wins("b");
    $("resWhy").textContent = best() === 1 ? `一${SP.unit}定勝負` : `${best()} ${SP.unit} ${need()} 勝`;
    const mins = S.startTs ? Math.round((S.endTs - S.startTs) / 60000) : 0;
    $("resDetail").textContent = `各${SP.unit}比分 ${S.units.map((u) => SP.unitLabel(u, w)).join("、")}${mins ? `，比賽時間約 ${mins} 分鐘` : ""}`;
    $("resOv").hidden = false;
  }
  function newMatch() {
    const keep = { names: S.names };
    closeRest(); S = { ...fresh(S.cfg), ...keep }; save(); render();
  }

  /* ---------- render ---------- */
  const fmtElapsed = (ms) => { const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h ? `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}` : `${m}:${String(s % 60).padStart(2, "0")}`; };
  function renderElapsed() { $("elapsed").textContent = S.startTs ? fmtElapsed((S.over ? S.endTs : Date.now()) - S.startTs) : "0:00"; }
  function renderLead() {
    const d = S.score.a - S.score.b, show = SP.showLead !== false;
    T.a.lead.textContent = show && d > 0 ? `領先 ${d}` : ""; T.b.lead.textContent = show && d < 0 ? `領先 ${-d}` : "";
  }
  function render() {
    $("board").classList.toggle("swapped", S.swapped);
    const sv = SP.serve(S, ctx()), t = SP.timeouts(S.cfg);
    SIDES.forEach((s) => {
      const el = T[s];
      el.reel.draw();
      if (document.activeElement !== el.name) el.name.value = S.names[s];
      const serving = sv && sv.side === s && !S.over;
      el.serve.hidden = !serving;
      el.court.textContent = serving ? sv.text || "" : "";
      el.extra.innerHTML = SP.extra?.(S, s) || "";
      const left = t.n - S.tos[s];
      el.tos.hidden = !t.n;
      el.dots.innerHTML = Array.from({ length: t.n }, (_, i) => `<button class="dot${i >= left ? " used" : ""}" data-i="${i}" aria-label="${i >= left ? "已用的暫停，點一下退回" : "剩餘暫停，點一下使用"}"></button>`).join("");
    });
    renderLead();
    $("gA").textContent = wins("a"); $("gB").textContent = wins("b");
    const c = ctx();
    $("gameNo").textContent = S.over ? "比賽結束" : `第 ${c.idx + 1} ${SP.unit}${c.deciding && best() > 1 ? "（決勝" + SP.unit + "）" : ""}`;
    $("call").textContent = S.over ? "" : [SP.call?.(S, c), pointText()].filter(Boolean).join(" · ");
    $("hist").innerHTML = S.units.map((u, i) => `<span>${SP.unitShort}${i + 1} ${SP.unitLabel(u)}</span>`).join("");
    $("undoBtn").disabled = !S.undo.length;
    $("serveBtn").hidden = !!S.over;
    const type = SP.types.find((x) => x[0] === S.cfg.type) || SP.types[0], next = SP.types[(SP.types.indexOf(type) + 1) % SP.types.length];
    $("modeChip").querySelector("strong").textContent = type[1];
    $("modeChip").setAttribute("aria-label", `${type[1]}，點一下切換成${next[1]}`);
    $("ruleChip").textContent = SP.rule(S.cfg);
    renderElapsed();
  }
  // game / set / match point: play the next rally for each side on a copy and see whether it ends the game
  function pointText() {
    if (S.over) return "";
    for (const s of SIDES) {
      const c = JSON.parse(JSON.stringify({ ...S, undo: [] })), x = ctx();
      SP.rally(c, s, x); SP.sync?.(c, x); SP.settle?.(c, s, x);
      if (SP.unitWinner(c, x) === s) return `${wins(s) + 1 >= need() ? "賽點" : SP.unit + "點"} ${S.names[s]}`;
    }
    return "";
  }
  setInterval(() => { if (S.startTs && !S.over) renderElapsed(); }, 1000);

  /* ---------- settings sheet, built from the sport's list of options ---------- */
  let draft;
  function buildSettings() {
    $("setRows").innerHTML = SP.settings.map((r) => {
      const lab = `<label>${r.label}${r.help ? `<small>${r.help}</small>` : ""}</label>`;
      if (r.kind === "seg") return `<div class="row" data-k="${r.key}">${lab}<div class="seg">${r.options.map(([v, l]) => `<button data-v="${v}">${l}</button>`).join("")}</div></div>`;
      if (r.kind === "num") return `<div class="row" data-k="${r.key}">${lab}<div class="inline"><input class="num" type="number" min="${r.min}" max="${r.max}" inputmode="numeric"> ${r.suffix || ""}</div></div>`;
      return `<div class="row" data-k="${r.key}">${lab}<button class="switch" role="switch" aria-label="${r.label}"></button></div>`;
    }).join("");
  }
  function fillSettings() {
    SP.settings.forEach((r) => {
      const row = $("setRows").querySelector(`[data-k="${r.key}"]`);
      row.hidden = r.when ? !r.when(draft) : false;
      if (r.kind === "seg") row.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === String(draft[r.key]))));
      else if (r.kind === "num") row.querySelector("input").value = draft[r.key];
      else row.querySelector(".switch").setAttribute("aria-checked", String(!!draft[r.key]));
    });
  }
  buildSettings();
  $("setRows").addEventListener("click", (e) => {
    const row = e.target.closest(".row"); if (!row) return; const r = SP.settings.find((x) => x.key === row.dataset.k);
    if (r.kind === "seg" && e.target.dataset.v != null) {
      const v = e.target.dataset.v; const val = typeof SP.defaults[r.key] === "number" ? +v : v;
      draft = r.key === "type" && SP.preset ? { ...draft, ...SP.preset(val) } : { ...draft, [r.key]: val };
      fillSettings();
    }
    if (r.kind === "switch" && e.target.closest(".switch")) { draft[r.key] = !draft[r.key]; fillSettings(); }
  });
  $("setRows").addEventListener("change", (e) => {
    const row = e.target.closest(".row"); const r = SP.settings.find((x) => x.key === row.dataset.k);
    draft[r.key] = Math.min(r.max, Math.max(r.min, Math.round(+e.target.value) || SP.defaults[r.key])); fillSettings();
  });
  const openSettings = () => { draft = { ...S.cfg }; fillSettings(); $("setOv").hidden = false; };
  function applyCfg(cfg) {
    const typeChanged = cfg.type !== S.cfg.type, oldDefault = SP.names(S.cfg.type);
    S.cfg = { ...cfg };
    if (typeChanged) { const nd = SP.names(cfg.type); SIDES.forEach((s) => { if (S.names[s] === oldDefault[s]) S.names[s] = nd[s]; }); }
    save(); render();
  }
  $("setBtn").addEventListener("click", openSettings);
  $("ruleChip").addEventListener("click", openSettings);
  $("setDone").addEventListener("click", () => { $("setRows").querySelectorAll("input").forEach((i) => i.dispatchEvent(new Event("change", { bubbles: true }))); applyCfg(draft); $("setOv").hidden = true; });
  $("newGame").addEventListener("click", async () => {
    $("setOv").hidden = true;
    if (await Kit.confirm({ title: "清除比分重新開始？", text: `${SP.unit}數和分數歸零，名字和設定會保留。`, ok: "重新開始" })) { if (draft) applyCfg(draft); newMatch(); }
  });
  $("modeChip").addEventListener("click", () => {
    const i = SP.types.findIndex((x) => x[0] === S.cfg.type), next = SP.types[(i + 1) % SP.types.length];
    applyCfg({ ...S.cfg, ...(SP.preset ? SP.preset(next[0]) : { type: next[0] }) });
    toast(`已切換成${next[1]}${SP.presetNote ? "：" + SP.presetNote(S.cfg) : ""}`);
  });

  let toastTimer = 0;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2600); }

  /* ---------- wiring ---------- */
  $("helpText").innerHTML = SP.help.map((p) => `<p>${p}</p>`).join("");
  $("helpBtn").addEventListener("click", () => ($("keyOv").hidden = false));
  $("setHelp").addEventListener("click", () => { $("setOv").hidden = true; $("keyOv").hidden = false; });
  $("keyClose").addEventListener("click", () => ($("keyOv").hidden = true));
  ["setOv", "keyOv"].forEach((id) => $(id).addEventListener("click", (e) => { if (e.target.id === id) $(id).hidden = true; }));
  $("fsBtn").addEventListener("click", Kit.fullscreen);
  $("undoBtn").addEventListener("click", undo);
  $("resBack").addEventListener("click", undo);
  $("resNew").addEventListener("click", () => { $("resOv").hidden = true; newMatch(); });
  $("restGo").addEventListener("click", () => { closeRest(); save(); render(); });
  $("restUndo").addEventListener("click", () => { if (S.rest?.e.force) { closeRest(); save(); render(); } else undo(); });
  $("swapBtn").addEventListener("click", () => { S.swapped = !S.swapped; save(); render(); });
  $("serveBtn").addEventListener("click", () => {
    if (S.over || S.rest) return;
    pushUndo(); if (SP.toggleServe) SP.toggleServe(S, ctx()); else S.server = other(S.server);
    save(); render();
  });
  $("restBtn").addEventListener("click", () => startRest(SP.restButton(S, ctx())));
  $("resetScore").addEventListener("click", async () => {
    if (S.over || S.rest) return;
    const ok = await Kit.confirm({ title: `這一${SP.unit}比分歸零？`, text: `兩邊這一${SP.unit}的分數變回 0，已打完的${SP.unit}數不變。按錯可以用「復原」找回。`, ok: "歸零" });
    if (!ok) return;
    pushUndo(); SP.startUnit(S, false, null, ctx(), true); save(); render();
  });
  const leftSide = () => (S.swapped ? "b" : "a");
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    if (k === "q") return rally(leftSide());
    if (k === "p") return rally(other(leftSide()));
    if (k === "z") return undo();
    if (k === "x") { S.swapped = !S.swapped; save(); return render(); }
    if (k === "m") return Kit.Music.toggle();
    const n = parseInt(e.code.replace("Digit", ""), 10);
    if (n >= 1 && n <= Pads.count) Pads.byIndex(n);
  });

  render();
  if (S.over) showResult();
  else if (S.rest) { const r = S.rest; startRest(r.e); S.rest.until = r.until; S.rest.warned = r.warned; tickRest(); }
})();
