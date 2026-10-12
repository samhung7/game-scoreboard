/* Shared by every board: sound effects, DJ pads, music player, score reel, screen wake lock. */
const Kit = (() => {
  const $ = (id) => document.getElementById(id);

  /* ---------- audio engine: effects are synthesized; a recording in sounds/ replaces one ---------- */
  let ac;
  const ctx = () => { if (!ac) { applyMix(); ac = new (window.AudioContext || window.webkitAudioContext)(); } if (ac.state === "suspended") ac.resume(); return ac; };
  // "ambient" lets effects play over music from another app (Spotify) instead of stopping it; Safari 17+ only
  const applyMix = () => { try { if (navigator.audioSession) navigator.audioSession.type = "ambient"; } catch (e) {} };
  const master = () => { const c = ctx(); if (!c._m) { c._m = c.createGain(); c._m.gain.value = 0.9; c._m.connect(c.destination); } return c._m; };
  const noiseBuf = (c, sec) => { const b = c.createBuffer(1, Math.max(1, c.sampleRate * sec), c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; };
  const env = (g, t, a, peak, d) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); };
  const tone = (type, f, t, dur, peak = 0.3, out) => { const c = ctx(); const o = c.createOscillator(); const g = c.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); env(g, t, 0.01, peak, dur); o.connect(g).connect(out || master()); o.start(t); o.stop(t + dur + 0.05); return o; };
  const rnd = (a, b) => a + Math.random() * (b - a);

  // one shouting voice: a buzzy source through three vowel formants, so it reads as a human "woo / yeah / hey"
  const VOWELS = { u: [320, 800, 2240], o: [520, 920, 2400], a: [780, 1180, 2600], e: [560, 1820, 2500], i: [330, 2150, 2950] };
  function voice(c, out, t, f0, shape, len, peak) {
    const path = { woo: ["u", "o", "o"], yeah: ["i", "e", "a"], hey: ["e", "e", "i"], ahh: ["a", "a", "o"] }[shape];
    const contour = { woo: [0.85, 1.4, 1.05], yeah: [1.25, 1.15, 0.85], hey: [1.3, 1.3, 1.1], ahh: [1.05, 1.15, 0.9] }[shape];
    const src = c.createOscillator(); src.type = "sawtooth";
    src.frequency.setValueAtTime(f0 * contour[0], t);
    src.frequency.linearRampToValueAtTime(f0 * contour[1], t + len * 0.35);
    src.frequency.linearRampToValueAtTime(f0 * contour[2], t + len);
    const vib = c.createOscillator(); const vg = c.createGain(); vib.frequency.value = rnd(4.5, 6.5); vg.gain.value = f0 * 0.035; vib.connect(vg).connect(src.frequency);
    const breath = c.createBufferSource(); breath.buffer = noiseBuf(c, len + 0.1); const bg = c.createGain(); bg.gain.value = 0.25;
    const pan = c.createStereoPanner ? c.createStereoPanner() : c.createGain(); if (pan.pan) pan.pan.value = rnd(-0.9, 0.9);
    const amp = c.createGain(); amp.gain.setValueAtTime(0.0001, t); amp.gain.exponentialRampToValueAtTime(peak, t + 0.07); amp.gain.setValueAtTime(peak, t + len * 0.6); amp.gain.exponentialRampToValueAtTime(0.0001, t + len);
    [1, 0.5, 0.22].forEach((lvl, i) => {
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; const vs = path.map((v) => VOWELS[v][i] * (f0 > 190 ? 1.15 : 1));
      bp.frequency.setValueAtTime(vs[0], t); bp.frequency.linearRampToValueAtTime(vs[1], t + len * 0.35); bp.frequency.linearRampToValueAtTime(vs[2], t + len);
      bp.Q.value = vs[0] / 90;
      const g = c.createGain(); g.gain.value = lvl * 6;
      src.connect(bp); breath.connect(bg).connect(bp); bp.connect(g).connect(amp);
    });
    amp.connect(pan).connect(out);
    [src, vib, breath].forEach((n) => { n.start(t); n.stop(t + len + 0.05); });
  }

  const SFX = {
    cheer() { // crowd of shouting voices over arena murmur, with claps and a couple of whistles
      const c = ctx(), t = c.currentTime, dur = 3.4, out = c.createGain(); out.gain.value = 0.9; out.connect(master());
      const bed = c.createBufferSource(); bed.buffer = noiseBuf(c, dur); const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 700; bp.Q.value = 0.6;
      const bgain = c.createGain(); bgain.gain.setValueAtTime(0.0001, t); bgain.gain.exponentialRampToValueAtTime(0.18, t + 0.4); bgain.gain.setValueAtTime(0.18, t + 2.2); bgain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      bed.connect(bp).connect(bgain).connect(out); bed.start(t);
      const shapes = ["woo", "woo", "yeah", "yeah", "hey", "ahh"];
      for (let v = 0; v < 28; v++) {
        const female = Math.random() < 0.45;
        voice(c, out, t + rnd(0, v < 8 ? 0.25 : 1.3), female ? rnd(230, 360) : rnd(120, 190), shapes[(Math.random() * shapes.length) | 0], rnd(0.6, 1.6), rnd(0.03, 0.06));
      }
      for (let k = 0; k < 40; k++) { // claps
        const st = t + rnd(0.2, 2.8); const s = c.createBufferSource(); s.buffer = noiseBuf(c, 0.05);
        const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = rnd(1000, 2200); f.Q.value = 1.2;
        const g = c.createGain(); env(g, st, 0.002, rnd(0.05, 0.12), 0.04); s.connect(f).connect(g).connect(out); s.start(st);
      }
      for (let k = 0; k < 2; k++) { const st = t + rnd(0.4, 1.6); const o = tone("sine", 2100, st, 0.5, 0.05, out); o.frequency.exponentialRampToValueAtTime(2900, st + 0.15); o.frequency.exponentialRampToValueAtTime(2300, st + 0.45); }
    },
    whistle() { // referee pea whistle: one short blast, the pea makes the fast warble
      const c = ctx(), t = c.currentTime;
      [[0, 0.3]].forEach(([st, d]) => {
        const s0 = t + st, s1 = s0 + d, out = c.createGain(); out.connect(master());
        out.gain.setValueAtTime(0.0001, s0); out.gain.exponentialRampToValueAtTime(0.32, s0 + 0.025); out.gain.setValueAtTime(0.32, s1 - 0.05); out.gain.exponentialRampToValueAtTime(0.0001, s1);
        const trem = c.createGain(); trem.gain.value = 0.65; trem.connect(out);
        const lfo = c.createOscillator(); lfo.frequency.value = rnd(32, 38); const lg = c.createGain(); lg.gain.value = 0.35; lfo.connect(lg).connect(trem.gain);
        [[2850, 0.5, "sine"], [2985, 0.35, "sine"], [5700, 0.06, "triangle"]].forEach(([f, lvl, type]) => {
          const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f * 0.97, s0); o.frequency.linearRampToValueAtTime(f, s0 + 0.04);
          const fm = c.createGain(); fm.gain.value = f * 0.025; lfo.connect(fm).connect(o.frequency);
          const g = c.createGain(); g.gain.value = lvl; o.connect(g).connect(trem); o.start(s0); o.stop(s1 + 0.02);
        });
        const n = c.createBufferSource(); n.buffer = noiseBuf(c, d + 0.05); const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2900; bp.Q.value = 4;
        const ng = c.createGain(); ng.gain.value = 0.18; n.connect(bp).connect(ng).connect(trem); n.start(s0); n.stop(s1 + 0.02);
        lfo.start(s0); lfo.stop(s1 + 0.02);
      });
    },
    sadhorn() {
      const c = ctx(), t = c.currentTime;
      [[293, 0], [277, 0.45], [261, 0.9], [247, 1.35]].forEach(([f, st], i) => {
        const d = i === 3 ? 1.3 : 0.4; const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.connect(master());
        const o = tone("sawtooth", f, t + st, d, 0.6, lp);
        if (i === 3) { const v = c.createOscillator(); const vg = c.createGain(); v.frequency.value = 6; vg.gain.value = 6; v.connect(vg).connect(o.frequency); v.start(t + st + 0.2); v.stop(t + st + d); o.frequency.linearRampToValueAtTime(f * 0.93, t + st + d); }
      });
    },
    brick() {
      const c = ctx(), t = c.currentTime;
      [523, 1187, 1693, 2531, 3217].forEach((f, i) => tone("sine", f, t, 0.9 - i * 0.12, 0.18 - i * 0.025));
      const s = c.createBufferSource(); s.buffer = noiseBuf(c, 0.08); const g = c.createGain(); env(g, t, 0.002, 0.4, 0.07); const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1500; s.connect(hp).connect(g).connect(master()); s.start(t);
      const o = tone("sine", 120, t, 0.25, 0.4); o.frequency.exponentialRampToValueAtTime(60, t + 0.2);
      [0.32, 0.55].forEach((d, k) => [523, 1693].forEach((f) => tone("sine", f, t + d, 0.3, 0.06 / (k + 1))));
    },
    coin() { const c = ctx(), t = c.currentTime; tone("square", 988, t, 0.08, 0.15); tone("square", 1319, t + 0.08, 0.45, 0.15); },
    swish() {
      const c = ctx(), t = c.currentTime; const s = c.createBufferSource(); s.buffer = noiseBuf(c, 0.6);
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.5; bp.frequency.setValueAtTime(1200, t); bp.frequency.exponentialRampToValueAtTime(5000, t + 0.25); bp.frequency.exponentialRampToValueAtTime(2500, t + 0.5);
      const g = c.createGain(); env(g, t, 0.05, 0.6, 0.45); s.connect(bp).connect(g).connect(master()); s.start(t);
    },
    smash() { // shuttle smash: sharp crack + whoosh
      const c = ctx(), t = c.currentTime; const s = c.createBufferSource(); s.buffer = noiseBuf(c, 0.35);
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 0.9; bp.frequency.setValueAtTime(5000, t); bp.frequency.exponentialRampToValueAtTime(900, t + 0.3);
      const g = c.createGain(); env(g, t, 0.003, 0.9, 0.3); s.connect(bp).connect(g).connect(master()); s.start(t);
      tone("triangle", 1800, t, 0.06, 0.3);
    },
    defense() {
      const c = ctx(), t = c.currentTime;
      const kick = (st) => { const o = tone("sine", 150, st, 0.3, 0.8); o.frequency.exponentialRampToValueAtTime(45, st + 0.25); };
      const clap = (st) => { const s = c.createBufferSource(); s.buffer = noiseBuf(c, 0.2); const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1400; const g = c.createGain(); env(g, st, 0.003, 0.7, 0.15); s.connect(bp).connect(g).connect(master()); s.start(st); };
      for (let r = 0; r < 2; r++) { const b = t + r * 1.2; kick(b); kick(b + 0.3); clap(b + 0.6); }
    },
    buzzer() { const c = ctx(), t = c.currentTime; const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800; lp.connect(master()); [196, 198, 392].forEach((f) => { const o = c.createOscillator(); const g = c.createGain(); o.type = "square"; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.14, t + 0.02); g.gain.setValueAtTime(0.14, t + 1.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.25); o.connect(g).connect(lp); o.start(t); o.stop(t + 1.3); }); },
    beep() { const c = ctx(), t = c.currentTime; tone("square", 880, t, 0.15, 0.12); tone("square", 880, t + 0.25, 0.15, 0.12); },
  };

  // Recordings dropped into sounds/ (listed in sounds/manifest.json, e.g. {"cheer":"cheer.mp3"}) replace the synthesized version.
  const samples = {};
  fetch("sounds/manifest.json").then((r) => (r.ok ? r.json() : {})).then((m) => {
    Object.entries(m || {}).forEach(([k, file]) => fetch("sounds/" + file).then((r) => r.arrayBuffer()).then((buf) => ctx().decodeAudioData(buf)).then((b) => (samples[k] = b)).catch(() => {}));
  }).catch(() => {});
  function play(k) {
    if (samples[k]) { const c = ctx(); const s = c.createBufferSource(); s.buffer = samples[k]; s.connect(master()); s.start(); return samples[k].duration; }
    SFX[k]?.(); return null;
  }

  /* ---------- music: Spotify embed (works without Premium) + local files ---------- */
  const MKEY = "scoreboard-music";
  let mPrefs = { spUrl: "" };
  try { mPrefs = { ...mPrefs, ...JSON.parse(localStorage.getItem(MKEY) || "{}") }; } catch (e) {}
  const mSave = () => { try { localStorage.setItem(MKEY, JSON.stringify(mPrefs)); } catch (e) {} };
  const Music = (() => {
    let sp = null, spPaused = true, api = null, apiWaiters = [], onChange = () => {};
    const audio = new Audio(); audio.preload = "auto";
    let files = [], cur = -1, vol = 0.8;
    function spUri(url) {
      const m = String(url).trim().match(/(?:open\.spotify\.com\/(?:intl-[a-z-]+\/)?|spotify:)(playlist|album|track|artist|show|episode)[/:]([A-Za-z0-9]{10,})/);
      return m ? `spotify:${m[1]}:${m[2]}` : null;
    }
    function loadApi() {
      return new Promise((res, rej) => {
        if (api) return res(api);
        apiWaiters.push(res);
        setTimeout(() => { if (!api) rej(new Error("timeout")); }, 8000);
        if (document.getElementById("spApi")) return;
        window.onSpotifyIframeApiReady = (IFrameAPI) => { api = IFrameAPI; apiWaiters.splice(0).forEach((f) => f(api)); };
        const s = document.createElement("script"); s.id = "spApi"; s.src = "https://open.spotify.com/embed/iframe-api/v1"; s.async = true;
        s.onerror = () => rej(new Error("blocked")); document.head.appendChild(s);
      });
    }
    async function loadSpotify(url) {
      const uri = spUri(url), empty = $("spEmpty");
      if (!uri) { empty.hidden = false; empty.textContent = "看不懂這個連結。請在 Spotify 按「分享 → 複製連結」再貼上。"; return; }
      mPrefs.spUrl = url; mSave();
      $("spOpen").href = uri.replace(/^spotify:(\w+):(\w+)$/, "https://open.spotify.com/$1/$2");
      empty.hidden = false; empty.textContent = "載入中…";
      try {
        const IFrameAPI = await loadApi();
        if (sp) { sp.loadUri(uri); sp.play?.(); empty.hidden = true; return; }
        const host = document.createElement("div"); $("spEmbed").replaceChildren(host);
        IFrameAPI.createController(host, { uri, width: "100%", height: 152 }, (c) => {
          sp = c; empty.hidden = true; c.play?.();
          c.addListener("playback_update", (e) => { spPaused = e.data.isPaused; onChange(); });
        });
      } catch (e) {
        empty.textContent = "這裡載入不了 Spotify 播放器（線上預覽版的限制）。正式網址上會正常顯示，也可以先按「在 Spotify 開啟」用 App 播放。";
      }
    }
    function renderList() {
      $("loList").innerHTML = files.map((f, i) => `<button data-i="${i}" class="${i === cur ? "cur" : ""}">${i === cur ? "▶ " : ""}${f.name.replace(/\.[^.]+$/, "").replace(/[<>&]/g, "")}</button>`).join("") || `<p>還沒選歌。</p>`;
      $("loPlay").textContent = audio.paused ? "▶" : "❚❚";
    }
    function playIdx(i) {
      if (!files.length) return;
      cur = (i + files.length) % files.length;
      audio.src = files[cur].url; audio.volume = vol; audio.play().catch(() => {}); renderList(); onChange();
    }
    function toggle(which) {
      const useLocal = which === "local" || (!which && files.length && (!sp || !audio.paused || spPaused));
      if (useLocal) { if (!files.length) return; if (audio.paused) { if (cur < 0) playIdx(0); else audio.play().catch(() => {}); } else audio.pause(); return; }
      if (sp) sp.togglePlay();
    }
    function init(changed) {
      onChange = changed;
      $("loFiles").addEventListener("change", (e) => {
        files = files.concat([...e.target.files].map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
        e.target.value = ""; if (cur < 0 && files.length) playIdx(0); else renderList();
      });
      $("loList").addEventListener("click", (e) => { const i = e.target.closest("button")?.dataset.i; if (i != null) playIdx(+i); });
      $("loPlay").addEventListener("click", () => toggle("local"));
      $("loPrev").addEventListener("click", () => playIdx(cur - 1));
      $("loNext").addEventListener("click", () => playIdx(cur + 1));
      $("loVol").addEventListener("input", (e) => { vol = e.target.value / 100; audio.volume = vol; });
      audio.addEventListener("ended", () => playIdx(cur + 1));
      ["play", "pause"].forEach((ev) => audio.addEventListener(ev, () => { renderList(); onChange(); }));
      $("spLoad").addEventListener("click", () => loadSpotify($("spUrl").value));
      $("spUrl").addEventListener("keydown", (e) => { if (e.key === "Enter") loadSpotify($("spUrl").value); });
      const tab = (isSp) => { $("tabSp").setAttribute("aria-selected", String(isSp)); $("tabLo").setAttribute("aria-selected", String(!isSp)); $("paneSp").hidden = !isSp; $("paneLo").hidden = isSp; };
      $("tabSp").addEventListener("click", () => tab(true));
      $("tabLo").addEventListener("click", () => tab(false));
      $("muClose").addEventListener("click", () => $("muOv").classList.add("parked"));
      $("muOv").addEventListener("click", (e) => { if (e.target.id === "muOv") $("muOv").classList.add("parked"); });
      if (mPrefs.spUrl) $("spUrl").value = mPrefs.spUrl;
      $("spLists").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-id]"); if (!b) return;
        $("spLists").querySelectorAll(".cur").forEach((x) => x.classList.remove("cur")); b.classList.add("cur");
        loadSpotify("spotify:playlist:" + b.dataset.id);
      });
      renderList();
      renderAccount();
      SpotifyAuth.handleRedirect().then((r) => {
        if (!r || r.moved) return;
        $("muOv").classList.remove("parked");
        if (r.error) accountMsg(r.error === "access_denied" ? "你取消了 Spotify 登入。" : "Spotify 登入沒有完成，請再試一次。");
        renderAccount();
      });
    }

    /* Spotify account: sign in, then pick one of your playlists */
    const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
    function accountMsg(t) { const n = document.createElement("p"); n.className = "note"; n.textContent = t; $("spAccount").after(n); setTimeout(() => n.remove(), 6000); }
    async function renderAccount() {
      const box = $("spAccount"), lists = $("spLists");
      if (!SpotifyAuth.configured()) {
        box.innerHTML = `<span class="who">Spotify 帳號登入還沒設定好，目前可以先貼歌單連結播放。</span>`;
        lists.hidden = true; $("spPaste").open = true; return;
      }
      if (!SpotifyAuth.signedIn()) {
        box.innerHTML = `<button class="btn primary" id="spLogin">用 Spotify 帳號登入</button><span class="who">登入後會列出你的歌單，免費帳號也可以。</span>`;
        $("spLogin").addEventListener("click", () => SpotifyAuth.login().catch(() => accountMsg("Spotify 登入還沒設定好。")));
        lists.hidden = true; return;
      }
      box.innerHTML = `<span class="who">讀取帳號中…</span><button class="btn" id="spLogout">登出</button>`;
      $("spLogout").addEventListener("click", () => { SpotifyAuth.logout(); renderAccount(); });
      try {
        const [me, pls] = await Promise.all([SpotifyAuth.me(), SpotifyAuth.playlists()]);
        box.querySelector(".who").innerHTML = `已登入 <strong>${esc(me.display_name || me.id)}</strong>，共 ${pls.length} 個歌單`;
        lists.innerHTML = pls.map((p) => `<button data-id="${esc(p.id)}">${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy">` : `<span class="noimg"></span>`}<span class="t">${esc(p.name)}<small>${p.count !== "" ? esc(p.count) + " 首" : ""}</small></span></button>`).join("") || `<p>這個帳號還沒有歌單。</p>`;
        lists.hidden = false;
      } catch (e) {
        if (e.message === "signed-out") return renderAccount();
        box.querySelector(".who").textContent = e.message === "forbidden" ? "這個 Spotify 帳號還沒被加進本站的使用者名單，請管理員在 Spotify 開發者後台加入。" : "讀不到歌單，請稍後再試。";
      }
    }
    return {
      init, toggle,
      open: () => $("muOv").classList.remove("parked"),
      playing: () => !audio.paused || !!(sp && !spPaused),
      label: () => (!audio.paused && cur >= 0 ? files[cur].name.replace(/\.[^.]+$/, "") : sp && !spPaused ? "Spotify 播放中" : "Spotify / 手機音樂"),
    };
  })();

  /* ---------- DJ pads ---------- */
  // [key, icon, label]
  const WHISTLE = '<span class="svgico"><svg viewBox="0 0 32 32" width="1em" height="1em"><defs><linearGradient id="whG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f5fb"/><stop offset="1" stop-color="#8d9bb3"/></linearGradient></defs><path d="M6 8.5C3 5 1.5 3.5 1.5 2" fill="none" stroke="#f87575" stroke-width="2" stroke-linecap="round"/><circle cx="7.2" cy="10" r="2.6" fill="none" stroke="#c4cddc" stroke-width="1.6"/><rect x="11" y="9" width="19.5" height="8" rx="2" fill="url(#whG)" stroke="#4d5b75" stroke-width="1.2"/><circle cx="12" cy="20" r="9.5" fill="url(#whG)" stroke="#4d5b75" stroke-width="1.2"/><rect x="14" y="10.2" width="10" height="5.6" fill="url(#whG)"/><circle cx="12" cy="20" r="4.4" fill="#5c95ff" opacity=".85"/><rect x="17" y="8.2" width="4.5" height="2.6" rx=".8" fill="#2b3550"/></svg></span>'; // there is no whistle emoji, so this one is drawn
  const PAD_SETS = {
    basketball: [["cheer", "🙌", "歡呼"], ["whistle", WHISTLE, "哨音"], ["sadhorn", "🎺", "嘲諷喇叭"], ["brick", "🧱", "打鐵"], ["coin", "🪙", "金幣"], ["swish", "🏀", "空心"], ["defense", "🥁", "防守"], ["buzzer", "🚨", "蜂鳴器"]],
    badminton: [["cheer", "🙌", "歡呼"], ["whistle", WHISTLE, "哨音"], ["sadhorn", "🎺", "嘲諷喇叭"], ["smash", "💥", "殺球"], ["coin", "🪙", "金幣"], ["defense", "🥁", "加油鼓"], ["buzzer", "🚨", "蜂鳴器"]],
  };
  function pads(el, set) {
    const list = PAD_SETS[set];
    const playPad = (k) => {
      play(k);
      const b = el.querySelector(`[data-k="${k}"]`); if (b) { b.classList.add("hit"); setTimeout(() => b.classList.remove("hit"), 250); }
    };
    list.forEach(([k, ico, label], i) => {
      const b = document.createElement("button"); b.className = "pad"; b.dataset.k = k;
      b.innerHTML = `<kbd>${i + 1}</kbd><span class="ico" aria-hidden="true">${ico}</span><span>${label}</span>`;
      b.addEventListener("click", () => playPad(k)); el.appendChild(b);
    });
    const mp = document.createElement("button"); mp.className = "pad music";
    mp.innerHTML = `<span class="ico" aria-hidden="true">♫</span><span>音樂</span><small></small>`;
    mp.addEventListener("click", Music.open); el.appendChild(mp);
    const refresh = () => { mp.classList.toggle("on", Music.playing()); mp.querySelector("small").textContent = Music.label(); };
    Music.init(refresh); refresh();
    return { playPad, byIndex: (n) => list[n - 1] && playPad(list[n - 1][0]), count: list.length };
  }

  /* ---------- score reel: drag down = more points, drag up = fewer ---------- */
  function reel({ box, strip, get, set, max = 200, locked = () => false, commit, tap }) {
    let drag = null, wheelAcc = 0;
    const stepPx = () => Math.max(64, Math.min(160, box.clientHeight * 0.45)); // finger travel per point
    const reelH = () => box.clientHeight;                                      // spacing between numbers
    const clamp = (n) => Math.min(max, Math.max(0, n));
    const offset = (frac, snap) => { strip.classList.toggle("snap", !!snap); strip.style.transform = `translateY(${frac * reelH()}px)`; };
    function draw() {
      const n = get(); let html = "";
      // larger number waits above, smaller below, so pulling down brings the next one in
      for (let k = -1; k <= 1; k++) { const v = n - k; if (v < 0 || v > max) continue; html += `<span class="n${k ? " ghost" : ""}" style="--k:${k}">${v}</span>`; }
      strip.innerHTML = html; box.setAttribute("aria-valuenow", n);
    }
    box.addEventListener("pointerdown", (e) => {
      if (locked()) return;
      box.setPointerCapture(e.pointerId);
      drag = { y0: e.clientY, t0: e.timeStamp, moved: 0, base: get(), last: get(), hist: [[e.timeStamp, e.clientY]] };
    });
    box.addEventListener("pointermove", (e) => {
      if (!drag) return;
      drag.moved = Math.max(drag.moved, Math.abs(e.clientY - drag.y0));
      const units = (e.clientY - drag.y0) / stepPx();
      const k = Math.trunc(units); let frac = units - k;
      let n = drag.base + k;
      if (n >= max) { n = max; frac = Math.min(0, frac) * 0.3; } // rubber band at the ends
      if (n <= 0) { n = 0; frac = Math.max(0, frac) * 0.3; }
      if (n !== drag.last) { drag.last = n; set(n, true); draw(); haptic(); }
      offset(frac);
      drag.hist.push([e.timeStamp, e.clientY]); if (drag.hist.length > 6) drag.hist.shift();
    });
    const end = (e) => {
      if (!drag) return;
      const d = drag; drag = null;
      if (tap && e.type === "pointerup" && d.moved < 10 && d.last === d.base && e.timeStamp - d.t0 < 500) { offset(0, true); haptic(); tap(); return; }
      const [t0, y0] = d.hist[0], [t1, y1] = d.hist[d.hist.length - 1];
      const v = t1 > t0 ? (y1 - y0) / (t1 - t0) : 0; // px per ms, downward positive
      const extra = Math.abs(v) > 1.6 ? Math.max(-2, Math.min(2, Math.round(v))) : 0; // only a hard flick adds a few more
      offset(0, true);
      const target = clamp(d.last + extra);
      const spin = () => { const n = get(); if (n === target) return commit(d.base); set(n + Math.sign(target - n), true); draw(); haptic(); setTimeout(spin, 150); };
      spin();
    };
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
    box.addEventListener("wheel", (e) => {
      e.preventDefault(); if (locked()) return;
      const base = get(); wheelAcc += e.deltaY;
      while (Math.abs(wheelAcc) >= 120) { const s = Math.sign(wheelAcc); wheelAcc -= s * 120; set(clamp(get() + s), true); }
      draw(); commit(base);
    }, { passive: false });
    box.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault(); e.stopPropagation(); if (locked()) return;
      const base = get(); set(clamp(get() + (e.key === "ArrowUp" ? 1 : -1)), true); draw(); commit(base);
    });
    return { draw };
  }

  /* ---------- haptic tap: Android vibrates; iPhone (iOS 18+) has no vibrate API, but toggling a switch control through its label gives a tick.
     Safari only does that inside a real user gesture, and a finger touching down is not one (lifting it is), so buttons buzz on click. ---------- */
  function haptic() {
    try {
      if (navigator.vibrate) { navigator.vibrate(12); return; }
      const label = document.createElement("label"); label.setAttribute("aria-hidden", "true"); label.style.display = "none";
      const i = document.createElement("input"); i.type = "checkbox"; i.setAttribute("switch", "");
      label.appendChild(i); document.head.appendChild(label); label.click(); label.remove();
    } catch (e) {}
  }
  // every point button on every board
  document.addEventListener("click", (e) => { if (e.target.closest(".pts button")) haptic(); }, true);

  /* ---------- no double-tap zoom: a quick second tap on anything that is not a control is swallowed (iOS ignores touch-action there) ---------- */
  let lastTouch = 0;
  document.addEventListener("touchend", (e) => {
    const now = e.timeStamp;
    if (now - lastTouch < 350 && !e.target.closest("button, a, input, select, textarea, label, .score")) e.preventDefault();
    lastTouch = now;
  }, { passive: false });
  document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });
  ["gesturestart", "gesturechange"].forEach((ev) => document.addEventListener(ev, (e) => e.preventDefault(), { passive: false })); // pinch zoom on iOS

  /* ---------- in-page confirmation (the browser's confirm() is not used) ---------- */
  function confirmBox({ title, text, ok = "確定", danger = true }) {
    return new Promise((res) => {
      const ov = document.createElement("div"); ov.className = "overlay";
      ov.innerHTML = `<div class="sheet" role="alertdialog" aria-modal="true"><h2></h2><p></p><div class="actions"><button class="btn" data-a="no">取消</button><button class="btn ${danger ? "danger" : "primary"}" data-a="yes"></button></div></div>`;
      ov.querySelector("h2").textContent = title; ov.querySelector("p").textContent = text; ov.querySelector("[data-a=yes]").textContent = ok;
      const done = (v) => { ov.remove(); res(v); };
      ov.addEventListener("click", (e) => { const a = e.target.dataset?.a; if (a) done(a === "yes"); else if (e.target === ov) done(false); });
      document.body.appendChild(ov); ov.querySelector("[data-a=no]").focus();
    });
  }

  /* ---------- keep the screen on while a clock runs ---------- */
  let wake = null;
  function keepAwake(on) {
    if (on) { try { navigator.wakeLock?.request("screen").then((w) => (wake = w)).catch(() => {}); } catch (e) {} }
    else { try { wake?.release(); } catch (e) {} wake = null; }
  }
  function fullscreen() { try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()?.catch(() => {}); } catch (e) {} }

  return { ctx, SFX, play, Music, pads, reel, keepAwake, fullscreen, haptic, confirm: confirmBox };
})();
