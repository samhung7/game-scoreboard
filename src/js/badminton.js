(() => {
  const $ = (id) => document.getElementById(id);
  const KEY = "badminton-scoreboard-v1";
  const SIDES = ["a", "b"];
  const SYSTEMS = { 21: { pts: 21, cap: 30 }, 15: { pts: 15, cap: 21 } };
  const fresh = () => ({
    cfg: { type: "single", sys: "21", pts: 21, cap: 30, best: 3, rests: true },
    names: { a: "選手 A", b: "選手 B" },
    score: { a: 0, b: 0 }, games: [], server: "a", swapped: false, midDone: false,
    undo: [], over: null, rest: null, startTs: 0, endTs: 0,
  });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); S = { ...fresh(), ...o, cfg: { ...fresh().cfg, ...o.cfg } }; } } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} Share.changed(); };
  const other = (s) => (s === "a" ? "b" : "a");
  const wins = (s) => S.games.filter((g) => g.w === s).length;
  const need = () => Math.ceil(S.cfg.best / 2);
  const deciding = () => S.games.length === S.cfg.best - 1;
  const mid = () => Math.ceil(S.cfg.pts / 2);
  const snapshot = () => JSON.stringify({ score: S.score, games: S.games, server: S.server, swapped: S.swapped, midDone: S.midDone, over: S.over });

  const Pads = Kit.pads($("pads"), "badminton");

  /* ---------- players ---------- */
  const T = {};
  SIDES.forEach((s) => {
    const sec = document.querySelector(`.team[data-side="${s}"]`);
    sec.appendChild($("teamTpl").content.cloneNode(true));
    const el = { name: sec.querySelector(".name"), serve: sec.querySelector(".serve"), court: sec.querySelector(".court"), score: sec.querySelector(".score"), lead: sec.querySelector(".lead") };
    T[s] = el;
    el.name.id = "name-" + s; el.name.setAttribute("aria-label", s === "a" ? "左邊選手名字" : "右邊選手名字");
    el.score.setAttribute("aria-valuemax", 60);
    el.score.setAttribute("aria-label", "比分，點一下加 1 分，往下滑加分、往上滑扣分");
    el.name.addEventListener("input", () => { S.names[s] = el.name.value.trim() || (s === "a" ? "選手 A" : "選手 B"); save(); });
    sec.querySelector(".plus").addEventListener("click", () => rally(s));
    sec.querySelector(".minus").addEventListener("click", () => adjust(s, -1));
    el.reel = Kit.reel({
      box: el.score, strip: sec.querySelector(".reel"), max: 60,
      get: () => S.score[s], set: (n) => { S.score[s] = n; renderLead(); }, locked: () => !!S.over || !!S.rest,
      commit: (base) => { if (S.score[s] !== base) { pushUndo(base, s); afterPoint(s, S.score[s] > base); } else render(); },
      tap: () => rally(s),
    });
  });

  /* ---------- scoring ---------- */
  function pushUndo(base, s) {
    const snap = JSON.parse(snapshot()); if (base != null) snap.score = { ...snap.score, [s]: base };
    S.undo.push(JSON.stringify(snap)); if (S.undo.length > 200) S.undo.shift();
  }
  function rally(s) {
    if (S.over || S.rest) return;
    if (!S.startTs) S.startTs = Date.now();
    S.undo.push(snapshot()); if (S.undo.length > 200) S.undo.shift();
    S.score[s] += 1; S.server = s; // rally-point scoring: whoever wins the rally serves next
    const el = T[s].score; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    afterPoint(s, true);
  }
  function adjust(s, d) {
    if (S.over || S.rest) return;
    const n = Math.max(0, S.score[s] + d); if (n === S.score[s]) return;
    S.undo.push(snapshot()); S.score[s] = n; afterPoint(s, d > 0);
  }
  function afterPoint(s, up) {
    Kit.ctx();
    if (up) {
      const me = S.score[s], op = S.score[other(s)];
      if ((me >= S.cfg.pts && me - op >= 2) || me >= S.cfg.cap) return gameEnd(s);
      if (!S.midDone && me >= mid() && op < mid()) {
        S.midDone = true;
        if (deciding()) S.swapped = !S.swapped; // deciding game: change ends at the interval
        if (S.cfg.rests) startRest("mid");
      }
    }
    save(); render();
  }
  function gameEnd(w) {
    S.games.push({ a: S.score.a, b: S.score.b, w });
    if (wins(w) >= need()) { S.over = { w }; S.endTs = Date.now(); save(); render(); showResult(); Kit.play("cheer"); return; }
    S.score = { a: 0, b: 0 }; S.server = w; S.swapped = !S.swapped; S.midDone = false; // winner serves first, players change ends
    save(); render();
    if (S.cfg.rests) startRest("game"); else Kit.play("cheer");
  }
  function undo() {
    const last = S.undo.pop(); if (!last) return;
    Object.assign(S, JSON.parse(last)); closeRest(); $("resOv").hidden = true; save(); render();
  }

  /* ---------- rest countdown ---------- */
  let restTimer = 0;
  function startRest(kind) {
    const sec = kind === "game" ? 120 : 60;
    S.rest = { kind, until: Date.now() + sec * 1000, warned: false }; save();
    const g = S.games[S.games.length - 1];
    $("restTag").textContent = kind === "game" ? `第 ${S.games.length} 局結束` : `第 ${S.games.length + 1} 局 局中休息`;
    $("restTitle").textContent = kind === "game" ? `${S.names[g.w]} 拿下這局 ${Math.max(g.a, g.b)}:${Math.min(g.a, g.b)}` : `休息 ${sec} 秒`;
    $("restDetail").textContent = kind === "game" ? `局間休息 120 秒，雙方換場，下一局由 ${S.names[g.w]} 先發球。` : deciding() ? "決勝局：雙方換場。" : "雙方可以到場邊喝水、聽教練指導。";
    $("restOv").hidden = false; Kit.keepAwake(true);
    if (kind === "game") Kit.play("cheer");
    clearInterval(restTimer); restTimer = setInterval(tickRest, 200); tickRest();
  }
  function tickRest() {
    if (!S.rest) return;
    const left = Math.max(0, S.rest.until - Date.now()), s = Math.ceil(left / 1000);
    const clk = $("restClock"); clk.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; clk.classList.toggle("warn", s <= 20);
    if (s <= 20 && !S.rest.warned) { S.rest.warned = true; save(); Kit.SFX.beep(); } // the umpire's "20 seconds" call
    if (left <= 0) { Kit.SFX.buzzer(); closeRest(); save(); render(); }
  }
  function closeRest() { clearInterval(restTimer); S.rest = null; $("restOv").hidden = true; Kit.keepAwake(false); }

  /* ---------- end of match ---------- */
  function showResult() {
    const w = S.over.w, l = other(w);
    $("resWinner").textContent = `${S.names[w]} 獲勝`;
    $("resH").textContent = wins("a"); $("resA").textContent = wins("b");
    $("resWhy").textContent = `${S.cfg.best === 1 ? "一局定勝負" : `${S.cfg.best} 局 ${need()} 勝`}`;
    const mins = S.startTs ? Math.round((S.endTs - S.startTs) / 60000) : 0;
    $("resDetail").textContent = `各局比分 ${S.games.map((g) => `${g[w]}-${g[l]}`).join("、")}${mins ? `，比賽時間約 ${mins} 分鐘` : ""}`;
    $("resOv").hidden = false;
  }
  function newMatch() {
    const keep = { cfg: S.cfg, names: S.names };
    closeRest(); S = { ...fresh(), ...keep }; save(); render();
  }

  /* ---------- render ---------- */
  const fmtElapsed = (ms) => { const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h ? `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}` : `${m}:${String(s % 60).padStart(2, "0")}`; };
  function renderElapsed() { $("elapsed").textContent = S.startTs ? fmtElapsed((S.over ? S.endTs : Date.now()) - S.startTs) : "0:00"; }
  function renderLead() {
    const d = S.score.a - S.score.b;
    T.a.lead.textContent = d > 0 ? `領先 ${d}` : ""; T.b.lead.textContent = d < 0 ? `領先 ${-d}` : "";
  }
  function render() {
    $("board").classList.toggle("swapped", S.swapped);
    SIDES.forEach((s) => {
      const el = T[s];
      el.reel.draw();
      if (document.activeElement !== el.name) el.name.value = S.names[s];
      const serving = S.server === s && !S.over;
      el.serve.hidden = !serving;
      el.court.textContent = serving ? (S.score[s] % 2 === 0 ? "右區" : "左區") : "";
    });
    renderLead();
    $("gA").textContent = wins("a"); $("gB").textContent = wins("b");
    $("gameNo").textContent = S.over ? "比賽結束" : deciding() && S.cfg.best > 1 ? `第 ${S.games.length + 1} 局（決勝局）` : `第 ${S.games.length + 1} 局`;
    $("hist").innerHTML = S.games.map((g, i) => `<span>G${i + 1} ${g.a}-${g.b}</span>`).join("");
    $("undoBtn").disabled = !S.undo.length;
    $("modeChip").querySelector("strong").textContent = S.cfg.type === "double" ? "雙打" : "單打";
    $("modeChip").setAttribute("aria-label", `${S.cfg.type === "double" ? "雙打" : "單打"}，點一下切換成${S.cfg.type === "double" ? "單打" : "雙打"}`);
    $("ruleChip").textContent = `${S.cfg.best === 1 ? "1 局" : `${S.cfg.best} 局 ${need()} 勝`} · ${S.cfg.pts} 分 · 封頂 ${S.cfg.cap}`;
    renderElapsed();
  }
  setInterval(() => { if (S.startTs && !S.over) renderElapsed(); }, 1000);

  /* ---------- settings ---------- */
  let draft;
  function fillSettings() {
    $("typeSeg").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === draft.type)));
    $("sysSeg").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(SYSTEMS[b.dataset.v].pts === draft.pts && SYSTEMS[b.dataset.v].cap === draft.cap)));
    $("bestSeg").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.v === draft.best)));
    $("pts").value = draft.pts; $("cap").value = draft.cap;
    $("rests").setAttribute("aria-checked", String(draft.rests));
  }
  const openSettings = () => { draft = { ...S.cfg }; fillSettings(); $("setOv").hidden = false; };
  $("setBtn").addEventListener("click", openSettings);
  $("ruleChip").addEventListener("click", openSettings);
  $("typeSeg").addEventListener("click", (e) => { const v = e.target.dataset?.v; if (v) { draft.type = v; fillSettings(); } });
  $("sysSeg").addEventListener("click", (e) => { const v = e.target.dataset?.v; if (v) { draft = { ...draft, sys: v, ...SYSTEMS[v] }; fillSettings(); } });
  $("bestSeg").addEventListener("click", (e) => { const v = e.target.dataset?.v; if (v) { draft.best = +v; fillSettings(); } });
  $("rests").addEventListener("click", () => { draft.rests = !draft.rests; fillSettings(); });
  $("pts").addEventListener("change", () => { draft.pts = Math.min(50, Math.max(5, Math.round(+$("pts").value) || 21)); draft.cap = Math.max(draft.cap, draft.pts); fillSettings(); });
  $("cap").addEventListener("change", () => { draft.cap = Math.min(60, Math.max(draft.pts, Math.round(+$("cap").value) || draft.pts)); fillSettings(); });
  // singles <-> doubles: doubles names are "A / C"
  function applyCfg(cfg) {
    const wasDouble = S.cfg.type === "double";
    S.cfg = { ...cfg };
    if (S.cfg.type === "double" && !wasDouble) S.names = { a: S.names.a.includes("/") ? S.names.a : "選手 A / 選手 C", b: S.names.b.includes("/") ? S.names.b : "選手 B / 選手 D" };
    if (S.cfg.type === "single" && wasDouble) S.names = { a: S.names.a.split("/")[0].trim() || "選手 A", b: S.names.b.split("/")[0].trim() || "選手 B" };
    save(); render();
  }
  $("setDone").addEventListener("click", () => { applyCfg(draft); $("setOv").hidden = true; });
  let toastTimer = 0;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2600); }
  $("modeChip").addEventListener("click", () => {
    const type = S.cfg.type === "double" ? "single" : "double";
    applyCfg({ ...S.cfg, type });
    toast(type === "double" ? "已切換成雙打，點選手名字可以改名" : "已切換成單打");
  });
  $("newGame").addEventListener("click", () => { $("setOv").hidden = true; $("confirmOv").hidden = false; });
  $("cNo").addEventListener("click", () => ($("confirmOv").hidden = true));
  $("cYes").addEventListener("click", () => { $("confirmOv").hidden = true; newMatch(); });
  $("resNew").addEventListener("click", () => { $("resOv").hidden = true; newMatch(); });
  $("resBack").addEventListener("click", undo);
  $("restGo").addEventListener("click", () => { closeRest(); save(); render(); });
  $("restUndo").addEventListener("click", undo);
  $("keyClose").addEventListener("click", () => ($("keyOv").hidden = true));
  ["setOv", "confirmOv", "keyOv"].forEach((id) => $(id).addEventListener("click", (e) => { if (e.target.id === id) $(id).hidden = true; }));

  /* ---------- wiring ---------- */
  $("helpBtn").addEventListener("click", () => ($("keyOv").hidden = false));
  $("fsBtn").addEventListener("click", Kit.fullscreen);
  $("undoBtn").addEventListener("click", undo);
  $("resetScore").addEventListener("click", async () => {
    if (S.over || S.rest) return;
    const ok = await Kit.confirm({ title: "這一局比分歸零？", text: "兩邊這一局的分數變回 0，已打完的局數不變。按錯可以用「復原」找回。", ok: "歸零" });
    if (!ok) return;
    S.undo.push(snapshot()); S.score = { a: 0, b: 0 }; S.midDone = false; save(); render();
  });
  $("swapBtn").addEventListener("click", () => { S.swapped = !S.swapped; save(); render(); });
  $("restBtn").addEventListener("click", () => startRest(S.score.a + S.score.b === 0 && S.games.length ? "game" : "mid"));
  const leftSide = () => (S.swapped ? "b" : "a");
  document.addEventListener("keydown", (e) => {
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) || e.target.closest?.(".overlay:not([hidden])") || e.metaKey || e.ctrlKey || e.altKey) return;
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
  else if (S.rest) { const r = S.rest; startRest(r.kind); S.rest.until = r.until; S.rest.warned = r.warned; tickRest(); }

  /* ---------- live sharing: someone else's board arrives here (js/share.js) ---------- */
  Share.attach({
    sport: "badminton", key: KEY, get: () => S,
    apply(st, { shift }) {
      const next = { ...fresh(), ...st, cfg: { ...fresh().cfg, ...st.cfg } };
      // times are on the sender's clock; move them onto this device's clock
      if (next.startTs) next.startTs += shift;
      if (next.endTs) next.endTs += shift;
      if (next.rest) next.rest.until += shift;
      clearInterval(restTimer); $("restOv").hidden = true; $("resOv").hidden = true;
      Object.keys(S).forEach((k) => delete S[k]); Object.assign(S, next);
      save(); render();
      if (S.over) showResult();
      else if (S.rest) { const r = S.rest; startRest(r.kind); S.rest.until = r.until; S.rest.warned = r.warned; tickRest(); }
      else Kit.keepAwake(false);
    },
  });
})();
