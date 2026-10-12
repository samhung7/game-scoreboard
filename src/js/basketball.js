(() => {
  const $ = (id) => document.getElementById(id);
  const KEY = "court-scoreboard-v2";
  const MAX = 200;
  const TEAMS = ["home", "away"];
  const PRESETS = {
    "5v5": { pts: [1, 2, 3], gOn: true, gMin: 10, periods: 4, otMin: 5, tOn: false, tPts: 21, sOn: true, sSec: 24, sShort: 14, sLinked: true, foulBonus: 5, timeouts: 5 },
    "3v3": { pts: [1, 2], gOn: true, gMin: 10, periods: 1, otMin: 0, tOn: true, tPts: 21, sOn: true, sSec: 12, sShort: 12, sLinked: true, foulBonus: 7, timeouts: 1 },
  };
  const fresh = () => ({
    mode: "5v5", cfg: { ...PRESETS["5v5"] },
    names: { home: "主隊", away: "客隊" },
    score: { home: 0, away: 0 }, fouls: { home: 0, away: 0 }, toUsed: { home: 0, away: 0 },
    period: 1, ot: 0, otBase: { home: 0, away: 0 },
    gameMs: 10 * 60000, shotMs: 24000, running: false, shotRunning: false, over: null, brk: null,
  });
  let S = fresh();
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); S = { ...fresh(), ...o, cfg: { ...PRESETS[o.mode || "5v5"], ...o.cfg } }; } } catch (e) {}
  S.running = false; S.shotRunning = false;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  const Pads = Kit.pads($("pads"), "basketball");

  /* ---------- teams: built from a template ---------- */
  const T = {};
  TEAMS.forEach((tm) => {
    const sec = document.querySelector(`.team.${tm}`);
    sec.appendChild($("teamTpl").content.cloneNode(true));
    const el = {
      name: sec.querySelector(".name"), fn: sec.querySelector(".fn"), bonus: sec.querySelector(".bonus"), dots: sec.querySelector(".dots"),
      score: sec.querySelector(".score"), lead: sec.querySelector(".lead"), pts: sec.querySelector(".pts"),
    };
    T[tm] = el;
    el.name.id = "name-" + tm; el.name.setAttribute("aria-label", tm === "home" ? "主隊名稱" : "客隊名稱");
    el.score.setAttribute("aria-label", (tm === "home" ? "主隊" : "客隊") + "比分，點一下加基本分，往下滑加分、往上滑扣分");
    el.name.addEventListener("input", () => { S.names[tm] = el.name.value.trim() || (tm === "home" ? "主隊" : "客隊"); save(); });
    sec.querySelector('[data-act="foul+"]').addEventListener("click", () => addFoul(tm, 1));
    sec.querySelector('[data-act="foul-"]').addEventListener("click", () => addFoul(tm, -1));
    el.dots.addEventListener("click", (e) => { const i = e.target.dataset?.i; if (i == null) return; useTimeout(tm, +i); });
    el.reel = Kit.reel({
      box: el.score, strip: sec.querySelector(".reel"), max: MAX,
      get: () => S.score[tm], set: (n) => { S.score[tm] = n; renderLead(); }, locked: () => !!S.over,
      commit: (base) => { if (S.score[tm] > base && !S.over) checkWin(tm); save(); render(); },
      tap: () => addPts(tm, S.mode === "3v3" ? 1 : 2), // basic basket: 1 in 3v3, 2 in 5v5
    });
  });

  function buildPts() {
    TEAMS.forEach((tm) => {
      const box = T[tm].pts; box.innerHTML = ""; const p = S.cfg.pts; box.style.setProperty("--cols", p.length);
      p.forEach((v) => { const b = document.createElement("button"); b.className = "plus"; b.textContent = "+" + v; b.addEventListener("click", () => addPts(tm, v)); box.appendChild(b); });
      p.forEach((v) => { const b = document.createElement("button"); b.className = "minus"; b.textContent = "−" + v; b.setAttribute("aria-label", "扣 " + v + " 分"); b.addEventListener("click", () => addPts(tm, -v)); box.appendChild(b); });
    });
  }
  function addPts(tm, v) {
    const n = Math.min(MAX, Math.max(0, S.score[tm] + v)), up = n > S.score[tm];
    S.score[tm] = n;
    if (up) { const el = T[tm].score; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); if (!S.over) checkWin(tm); }
    save(); render();
  }
  function checkWin(tm) {
    if (S.cfg.tOn && S.score[tm] >= S.cfg.tPts) return endGame("target");
    if (S.ot > 0 && S.cfg.otMin === 0 && S.score[tm] - S.otBase[tm] >= 2) return endGame("ot2");
  }
  function addFoul(tm, d) { S.fouls[tm] = Math.max(0, Math.min(99, S.fouls[tm] + d)); save(); render(); }
  function useTimeout(tm, i) {
    // tap the next available dot to use one, tap a used dot to give it back
    const used = S.toUsed[tm], total = S.cfg.timeouts;
    if (i >= total - used) S.toUsed[tm] = Math.max(0, used - 1);
    else { S.toUsed[tm] = Math.min(total, used + 1); if (S.running) setRunning(false); if (S.shotRunning) setShotRunning(false); }
    save(); render();
  }

  /* ---------- clocks ---------- */
  let last = 0, raf = 0;
  const fmtGame = (ms) => { if (ms < 60000) return (Math.max(0, ms) / 1000).toFixed(1); const s = Math.ceil(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
  const fmtShot = (ms) => (ms < 5000 && ms > 0 ? (ms / 1000).toFixed(1) : String(Math.ceil(ms / 1000)));
  const clockActive = () => S.cfg.gOn && !(S.ot > 0 && S.cfg.otMin === 0);
  const shotFollowsMain = () => S.cfg.sOn && (S.cfg.sLinked || !clockActive());
  const canRunMain = () => clockActive() || shotFollowsMain();
  const periodLabel = () => (S.ot > 0 ? (S.ot > 1 ? `延長賽 ${S.ot}` : "延長賽") : S.cfg.periods > 1 ? `第 ${S.period} 節` : "全場");
  const awake = () => Kit.keepAwake(S.running || S.shotRunning);
  function loop() { cancelAnimationFrame(raf); if (S.running || S.shotRunning) { last = performance.now(); raf = requestAnimationFrame(tick); } }
  function setRunning(on) {
    if (on && (S.over || S.brk || !canRunMain())) return;
    S.running = on; if (on) Kit.ctx();
    awake(); loop(); save(); render();
  }
  function setShotRunning(on) {
    if (on && (S.over || !S.cfg.sOn)) return;
    S.shotRunning = on; awake(); loop(); save(); render();
  }
  function tick(now) {
    const dt = now - last; last = now;
    if (S.running && clockActive()) S.gameMs = Math.max(0, S.gameMs - dt);
    if (S.cfg.sOn && ((S.running && shotFollowsMain()) || S.shotRunning)) S.shotMs = Math.max(0, S.shotMs - dt);
    if (S.running && clockActive() && S.gameMs <= 0) { Kit.SFX.buzzer(); S.running = false; S.shotRunning = false; return periodEnd(); }
    if (S.cfg.sOn && S.shotMs <= 0 && (S.running || S.shotRunning)) { Kit.SFX.buzzer(); S.running = false; S.shotRunning = false; awake(); save(); return render(); }
    renderClocks();
    raf = requestAnimationFrame(tick);
  }
  function resetShot(short) { S.shotMs = (short ? S.cfg.sShort : S.cfg.sSec) * 1000; save(); renderClocks(); }

  /* ---------- periods, overtime, end of game ---------- */
  function periodEnd() {
    awake();
    const h = S.score.home, a = S.score.away;
    if (S.ot > 0 || S.period >= S.cfg.periods) {
      if (h !== a) return endGame("clock");
      S.brk = { kind: "ot" };
    } else S.brk = { kind: "period" };
    save(); render(); showBreak();
  }
  function showBreak() {
    const h = S.score.home, a = S.score.away;
    $("brkH").textContent = h; $("brkA").textContent = a;
    $("brkTag").textContent = `${periodLabel()}結束`;
    if (S.brk.kind === "ot") {
      $("brkTitle").textContent = "平手！進入延長賽";
      $("brkDetail").textContent = S.cfg.otMin === 0 ? "延長賽先得 2 分的隊伍獲勝。" : `延長賽 ${S.cfg.otMin} 分鐘，再平手就繼續延長。`;
      $("brkGo").textContent = "開始延長賽";
    } else {
      $("brkTitle").textContent = `第 ${S.period + 1} 節`;
      $("brkDetail").textContent = `全隊犯規會歸零。${h === a ? "目前同分。" : `${h > a ? S.names.home : S.names.away} 領先 ${Math.abs(h - a)} 分。`}`;
      $("brkGo").textContent = "開始下一節";
    }
    $("brkOv").hidden = false;
  }
  function nextPeriod() {
    if (!S.brk) return;
    if (S.brk.kind === "ot") { S.ot += 1; S.otBase = { ...S.score }; S.gameMs = S.cfg.otMin * 60000; } // team fouls carry into overtime
    else { S.period += 1; S.fouls = { home: 0, away: 0 }; S.gameMs = S.cfg.gMin * 60000; }
    S.shotMs = S.cfg.sSec * 1000; S.brk = null; $("brkOv").hidden = true; save(); render();
  }
  function endGame(why) {
    const h = S.score.home, a = S.score.away;
    S.over = { why, h, a }; S.running = false; S.shotRunning = false; S.brk = null; awake(); save(); render();
    showResult();
    if (why !== "clock") Kit.play("cheer");
  }
  function showResult() {
    const { why, h, a } = S.over;
    $("resWhy").textContent = why === "clock" ? `${periodLabel()}時間到` : why === "ot2" ? "延長賽先得 2 分" : `達到目標 ${S.cfg.tPts} 分`;
    $("resWinner").textContent = h === a ? "平手" : `${h > a ? S.names.home : S.names.away} 獲勝`;
    $("resH").textContent = h; $("resA").textContent = a;
    $("resDetail").textContent = `${S.names.home} ${h} : ${a} ${S.names.away}，差距 ${Math.abs(h - a)} 分${S.ot > 0 ? `，打了 ${S.ot} 次延長賽` : ""}`;
    $("resOv").hidden = false;
  }
  function newGame() {
    const keep = { names: S.names, mode: S.mode, cfg: S.cfg };
    S.running = S.shotRunning = false; loop(); awake();
    S = { ...fresh(), ...keep }; S.gameMs = S.cfg.gMin * 60000; S.shotMs = S.cfg.sSec * 1000;
    save(); buildPts(); render();
  }

  /* ---------- render ---------- */
  function renderClocks() {
    const shot = $("shot");
    if (S.cfg.sOn) { shot.textContent = fmtShot(S.shotMs); shot.classList.remove("off"); } else { shot.textContent = "∞"; shot.classList.add("off"); }
    shot.classList.toggle("idle", S.cfg.sOn && !S.running && !S.shotRunning);
    const t = $("gameT");
    if (clockActive()) { t.textContent = fmtGame(S.gameMs); t.classList.remove("target"); }
    else if (S.ot > 0 && S.cfg.otMin === 0) { t.textContent = "搶 2"; t.classList.add("target"); }
    else { t.textContent = `搶 ${S.cfg.tPts}`; t.classList.add("target"); }
    $("perLabel").textContent = S.cfg.gOn ? periodLabel() : "目標得分";
    $("gameHint").textContent = S.over ? "比賽結束" : S.running ? (S.cfg.tOn ? `搶 ${S.cfg.tPts} 分` : "進行中") : clockActive() ? "點一下開始" : "先達到的贏";
    $("game").classList.toggle("paused", !S.running);
  }
  function renderLead() {
    const d = S.score.home - S.score.away;
    T.home.lead.textContent = d > 0 ? `領先 ${d}` : ""; T.away.lead.textContent = d < 0 ? `領先 ${-d}` : "";
  }
  function render() {
    renderClocks();
    TEAMS.forEach((tm) => {
      const el = T[tm];
      el.reel.draw();
      if (document.activeElement !== el.name) el.name.value = S.names[tm];
      el.fn.textContent = S.fouls[tm];
      el.bonus.hidden = S.fouls[tm] < S.cfg.foulBonus;
      const total = S.cfg.timeouts, left = total - S.toUsed[tm];
      el.dots.innerHTML = Array.from({ length: total }, (_, i) => `<button class="dot${i >= left ? " used" : ""}" data-i="${i}" aria-label="${i >= left ? "已用的暫停，點一下退回" : "剩餘暫停，點一下使用"}"></button>`).join("") || "<span>—</span>";
    });
    renderLead();
    const rb = $("runBtn"); rb.textContent = S.running ? "❚❚ 暫停" : "▶ 開始"; rb.classList.toggle("running", S.running); rb.disabled = !canRunMain() || !!S.over;
    const indep = S.cfg.sOn && !shotFollowsMain();
    const sr = $("shotRun"); sr.hidden = !indep; sr.textContent = S.shotRunning ? "❚❚ 進攻" : "▶ 進攻"; sr.classList.toggle("running", S.shotRunning);
    $("shot").setAttribute("aria-label", indep ? "進攻時間，點一下開始或暫停" : "進攻時間，點一下重設");
    $("shotFull").textContent = S.cfg.sSec; $("shotShort").textContent = S.cfg.sShort;
    $("shotFull").hidden = !S.cfg.sOn; $("shotShort").hidden = !S.cfg.sOn || S.cfg.sShort === S.cfg.sSec;
    $("modeChip").querySelector("strong").textContent = S.mode;
    $("modeChip").setAttribute("aria-label", `賽制 ${S.mode}，點一下切換成 ${otherMode()}`);
    const c = S.cfg, bits = [];
    if (c.gOn) bits.push(c.periods > 1 ? `${c.periods} 節 × ${c.gMin} 分` : `${c.gMin} 分鐘`);
    bits.push(c.sOn ? `進攻 ${c.sSec} 秒` : "不計進攻時間");
    $("ruleChip").textContent = bits.join(" · ");
    $("targetChip").querySelector("strong").textContent = c.tOn ? `搶 ${c.tPts}` : "未設定";
    $("game").setAttribute("aria-label", clockActive() ? "比賽時間，點一下開始或暫停" : "目標得分，點一下修改");
  }

  /* ---------- settings sheet ---------- */
  const NUMS = [["gMin", 1, 60], ["periods", 1, 8], ["otMin", 0, 20], ["tPts", 1, 200], ["sSec", 5, 60], ["sShort", 1, 60], ["foulBonus", 1, 20], ["timeouts", 0, 8]];
  const SWS = ["gOn", "tOn", "sOn", "sLinked"];
  let draft;
  function openSettings() { setRunning(false); setShotRunning(false); draft = { mode: S.mode, ...S.cfg }; fillSettings(); $("setOv").hidden = false; }
  function fillSettings() {
    $("modeSeg").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === draft.mode)));
    NUMS.forEach(([k]) => ($(k).value = draft[k]));
    SWS.forEach((k) => $(k).setAttribute("aria-checked", String(draft[k])));
    $("setWarn").hidden = draft.gOn || draft.tOn;
  }
  $("modeSeg").addEventListener("click", (e) => { const v = e.target.dataset?.v; if (!v) return; draft = { mode: v, ...PRESETS[v] }; fillSettings(); });
  SWS.forEach((k) => $(k).addEventListener("click", () => { draft[k] = !draft[k]; fillSettings(); }));
  NUMS.forEach(([k, lo, hi]) => $(k).addEventListener("change", () => { const n = Math.round(+$(k).value); draft[k] = Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo)); fillSettings(); }));
  $("setDone").addEventListener("click", () => {
    if (!draft.gOn && !draft.tOn) { $("setWarn").hidden = false; return; }
    const { mode, ...cfg } = draft;
    applyCfg(mode, cfg); $("setOv").hidden = true;
  });
  function applyCfg(mode, cfg) {
    cfg.pts = PRESETS[mode].pts;
    const old = S.cfg;
    if ((cfg.gMin !== old.gMin || cfg.gOn !== old.gOn) && S.ot === 0) S.gameMs = cfg.gMin * 60000;
    if (cfg.sSec !== old.sSec || cfg.sOn !== old.sOn) S.shotMs = cfg.sSec * 1000;
    S.period = Math.min(S.period, cfg.periods);
    S.toUsed = { home: Math.min(S.toUsed.home, cfg.timeouts), away: Math.min(S.toUsed.away, cfg.timeouts) };
    S.mode = mode; S.cfg = cfg;
    save(); buildPts(); render();
  }

  /* ---------- quick switches on the board: tap 5v5 to flip the format, tap the target to change it ---------- */
  const otherMode = () => (S.mode === "5v5" ? "3v3" : "5v5");
  $("modeChip").addEventListener("click", () => {
    setRunning(false); setShotRunning(false);
    const mode = otherMode(); applyCfg(mode, { ...PRESETS[mode] });
    toast(`已切換成 ${mode}：${mode === "3v3" ? "+1 / +2、進攻 12 秒、搶 21" : "+1 / +2 / +3、4 節、進攻 24 秒"}`);
  });
  let tDraft;
  function openTarget() {
    tDraft = { tOn: S.cfg.tOn || !S.cfg.gOn, tPts: S.cfg.tPts }; fillTarget(); $("tgtOv").hidden = false;
  }
  function fillTarget() {
    $("tgtN").value = tDraft.tPts; $("tgtOn").setAttribute("aria-checked", String(tDraft.tOn));
    $("tgtOn").disabled = !S.cfg.gOn; // without a game clock the target is the only way the game ends
    $("tgtPresets").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.v === tDraft.tPts)));
  }
  const setT = (n) => { tDraft.tPts = Math.min(200, Math.max(1, Math.round(n) || 1)); tDraft.tOn = true; fillTarget(); };
  $("targetChip").addEventListener("click", openTarget);
  $("tgtMinus").addEventListener("click", () => setT(tDraft.tPts - 1));
  $("tgtPlus").addEventListener("click", () => setT(tDraft.tPts + 1));
  $("tgtN").addEventListener("change", () => setT(+$("tgtN").value));
  $("tgtPresets").addEventListener("click", (e) => { const v = e.target.dataset?.v; if (v) setT(+v); });
  $("tgtOn").addEventListener("click", () => { tDraft.tOn = !tDraft.tOn; fillTarget(); });
  $("tgtCancel").addEventListener("click", () => ($("tgtOv").hidden = true));
  $("tgtDone").addEventListener("click", () => {
    applyCfg(S.mode, { ...S.cfg, tOn: tDraft.tOn, tPts: tDraft.tPts }); $("tgtOv").hidden = true;
    // raising the target past a finished game's score reopens it
    if (S.over?.why === "target" && Math.max(S.score.home, S.score.away) < S.cfg.tPts) { S.over = null; $("resOv").hidden = true; save(); render(); }
    else if (!S.over && S.cfg.tOn) TEAMS.forEach((tm) => !S.over && S.score[tm] >= S.cfg.tPts && endGame("target"));
  });
  let toastTimer = 0;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 2600); }
  $("newGame").addEventListener("click", () => { $("setOv").hidden = true; $("confirmOv").hidden = false; });
  $("cNo").addEventListener("click", () => ($("confirmOv").hidden = true));
  $("cYes").addEventListener("click", () => { $("confirmOv").hidden = true; newGame(); });
  $("resNew").addEventListener("click", () => { $("resOv").hidden = true; newGame(); });
  $("resBack").addEventListener("click", () => { $("resOv").hidden = true; S.over = null; save(); render(); });
  $("brkGo").addEventListener("click", nextPeriod);
  $("brkBack").addEventListener("click", () => { $("brkOv").hidden = true; });
  $("keyClose").addEventListener("click", () => ($("keyOv").hidden = true));
  ["setOv", "confirmOv", "keyOv", "tgtOv"].forEach((id) => $(id).addEventListener("click", (e) => { if (e.target.id === id) $(id).hidden = true; }));

  /* ---------- wiring ---------- */
  $("setBtn").addEventListener("click", openSettings);
  $("ruleChip").addEventListener("click", openSettings);
  $("resetScore").addEventListener("click", async () => {
    const ok = await Kit.confirm({ title: "比分歸零？", text: "兩隊比分都會變成 0。時間、節數、犯規和暫停都不變。", ok: "歸零" });
    if (!ok) return;
    S.score = { home: 0, away: 0 }; S.otBase = { home: 0, away: 0 };
    if (S.over) { S.over = null; $("resOv").hidden = true; }
    save(); render();
  });
  $("helpBtn").addEventListener("click", () => ($("keyOv").hidden = false));
  $("setHelp").addEventListener("click", () => { $("setOv").hidden = true; $("keyOv").hidden = false; });
  $("fsBtn").addEventListener("click", Kit.fullscreen);
  $("game").addEventListener("click", () => (clockActive() || S.over ? setRunning(!S.running) : openTarget()));
  $("runBtn").addEventListener("click", () => setRunning(!S.running));
  $("shot").addEventListener("click", () => { if (!S.cfg.sOn) return; if (shotFollowsMain()) resetShot(false); else setShotRunning(!S.shotRunning); });
  $("shotRun").addEventListener("click", () => setShotRunning(!S.shotRunning));
  $("shotFull").addEventListener("click", () => resetShot(false));

  /* ---------- set a clock by hand: "✎ 調時間" button, or long-press either clock ---------- */
  let tsDraft = null;
  function openTime() {
    setRunning(false); setShotRunning(false);
    tsDraft = { g: Math.ceil(S.gameMs / 1000), s: Math.ceil(S.shotMs / 1000) };
    $("tsGame").hidden = !clockActive(); $("tsShot").hidden = !S.cfg.sOn;
    fillTime(); $("timeOv").hidden = false;
  }
  function fillTime() {
    $("tsMin").value = Math.floor(tsDraft.g / 60); $("tsSec").value = String(tsDraft.g % 60).padStart(2, "0"); $("tsShotN").value = tsDraft.s;
  }
  const clampG = (n) => Math.min(99 * 60 + 59, Math.max(0, Math.round(n) || 0));
  const clampS = (n) => Math.min(99, Math.max(0, Math.round(n) || 0));
  $("timeOv").addEventListener("click", (e) => {
    const g = e.target.dataset?.step, s = e.target.dataset?.sstep;
    if (g) { tsDraft.g = clampG(tsDraft.g + +g); fillTime(); }
    if (s) { tsDraft.s = clampS(tsDraft.s + +s); fillTime(); }
    if (e.target.id === "timeOv") $("timeOv").hidden = true;
  });
  ["tsMin", "tsSec"].forEach((id) => $(id).addEventListener("change", () => { tsDraft.g = clampG((+$("tsMin").value || 0) * 60 + Math.min(59, +$("tsSec").value || 0)); fillTime(); }));
  $("tsShotN").addEventListener("change", () => { tsDraft.s = clampS(+$("tsShotN").value); fillTime(); });
  $("tsCancel").addEventListener("click", () => ($("timeOv").hidden = true));
  $("tsDone").addEventListener("click", () => {
    ["tsMin", "tsSec", "tsShotN"].forEach((id) => $(id).dispatchEvent(new Event("change"))); // take what was typed even without leaving the field
    if (clockActive()) S.gameMs = tsDraft.g * 1000;
    if (S.cfg.sOn) S.shotMs = tsDraft.s * 1000;
    $("timeOv").hidden = true; save(); render();
  });
  $("timeBtn").addEventListener("click", openTime);
  let pressTimer = 0, pressed = false;
  ["game", "shot"].forEach((id) => {
    const el = $(id);
    el.addEventListener("pointerdown", () => { pressed = false; clearTimeout(pressTimer); pressTimer = setTimeout(() => { pressed = true; Kit.haptic(); openTime(); }, 550); });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => el.addEventListener(ev, () => clearTimeout(pressTimer)));
    el.addEventListener("click", (e) => { if (pressed) { pressed = false; e.stopImmediatePropagation(); } }, true); // a long press is not also a tap
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  });
  $("shotShort").addEventListener("click", () => resetShot(true));

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase(), sign = e.shiftKey ? -1 : 1;
    if (e.code === "Space") { e.preventDefault(); setRunning(!S.running); return; }
    if (k === "s") return S.cfg.sOn && !shotFollowsMain() && setShotRunning(!S.shotRunning);
    if (k === "r") return S.cfg.sOn && resetShot(false);
    if (k === "t") return S.cfg.sOn && resetShot(true);
    if (k === "a") return addFoul("home", sign);
    if (k === "l") return addFoul("away", sign);
    if (k === "m") return Kit.Music.toggle();
    const pts = S.cfg.pts, hi = "qwe".indexOf(k), ai = "iop".indexOf(k);
    if (hi >= 0 && pts[hi]) return addPts("home", sign * pts[hi]);
    if (ai >= 0 && pts[ai]) return addPts("away", sign * pts[ai]);
    const n = parseInt(e.code.replace("Digit", ""), 10);
    if (n >= 1 && n <= Pads.count) Pads.byIndex(n);
  });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") awake(); });

  buildPts(); render();
  if (S.over) showResult(); else if (S.brk) showBreak();
})();
