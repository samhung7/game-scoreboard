/* Live sharing. One person opens a room; others join with its 4-character code or link and see the board live.
   Nobody signs in: each device picks a nickname and an animal, and gets an anonymous id behind the scenes.
   The room's owner decides who may change the score; everyone else watches.
   Backend: Firebase Realtime Database + anonymous sign-in (config in js/config.js; the SDK loads only when sharing is used).
   Each board calls Share.attach({ sport, key, get, apply }) once and Share.changed() after every save(). */
const Share = (() => {
  const $ = (id) => document.getElementById(id);
  const CFG = window.SCOREBOARD_CONFIG || {};
  const params = new URLSearchParams(location.search);
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} } };
  // ?emu runs against the local Firebase emulator (testing only)
  if (params.has("emu")) store.set("scoreboard-emu", params.get("emu") === "0" ? null : "1");
  const EMU = !!store.get("scoreboard-emu");
  const FB = EMU ? { apiKey: "demo-key", projectId: "demo-scoreboard", databaseURL: `http://${location.hostname}:9000?ns=demo-scoreboard` } : CFG.firebase;
  const enabled = !!(FB && FB.databaseURL);
  const SDK = new URL("vendor/firebase.js", document.currentScript.src).href;
  const ME_KEY = "scoreboard-me", ROOM_KEY = "scoreboard-room";
  const AVATARS = [["🐻", "小熊"], ["🦊", "狐狸"], ["🐼", "熊貓"], ["🐯", "老虎"], ["🦁", "獅子"], ["🐸", "青蛙"], ["🐵", "猴子"], ["🐧", "企鵝"], ["🦉", "貓頭鷹"], ["🐙", "章魚"], ["🦄", "獨角獸"], ["🐶", "小狗"], ["🐱", "小貓"], ["🐰", "兔子"], ["🐨", "無尾熊"], ["🐲", "小龍"]];
  const CODE_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0/O, 1/I/L
  const PAGES = { basketball: "./", badminton: "badminton.html", volleyball: "volleyball.html", tennis: "tennis.html", pickleball: "pickleball.html", tabletennis: "tabletennis.html" };
  const STALE = 2 * 864e5; // a room nobody has touched for 2 days can be reused

  let pendingNote = "";
  let fb, db, uid, offset = 0, connecting = null;
  let board = null, room = null, code = null, stopWatch = null;
  const session = Math.random().toString(36).slice(2); // tells our own writes apart when they echo back
  let pushTimer = 0, seenState = null, knownMembers = null, applying = false, stopConn = null;

  /* ---------- identity: nickname + animal, kept on this device ---------- */
  const me = () => { try { const m = JSON.parse(store.get(ME_KEY)); if (m && m.name) return m; } catch (e) {} return null; };
  function askMe(firstTime) {
    return new Promise((res) => {
      const cur = me() || (() => { const [a, n] = AVATARS[(Math.random() * AVATARS.length) | 0]; return { avatar: a, name: Share.tr(n), auto: true }; })();
      const ov = document.createElement("div"); ov.className = "overlay"; ov.id = "meOv";
      ov.innerHTML = `<div class="sheet" role="dialog" aria-labelledby="meTitle"><h2 id="meTitle">${firstTime ? "選一個身分" : "修改身分"}</h2>
        <p class="muted">不用註冊，其他人會看到這個名字和頭像。</p>
        <div class="avatars"></div>
        <label class="lbl" for="meName">暱稱</label><input id="meName" class="mename" maxlength="12" autocomplete="off">
        <div class="actions"><button class="btn" data-a="no">取消</button><button class="btn primary" data-a="yes">確定</button></div></div>`;
      const grid = ov.querySelector(".avatars"), input = ov.querySelector("#meName");
      let pick = cur.avatar, auto = !!cur.auto;
      input.value = cur.name;
      AVATARS.forEach(([a, n]) => {
        const b = document.createElement("button"); b.className = "av"; b.textContent = a; b.setAttribute("aria-label", n); b.setAttribute("aria-pressed", String(a === pick));
        b.addEventListener("click", () => { pick = a; grid.querySelectorAll(".av").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); if (auto) input.value = Share.tr(n); });
        grid.appendChild(b);
      });
      input.addEventListener("input", () => (auto = false));
      const done = (v) => { ov.remove(); res(v); };
      ov.addEventListener("click", (e) => {
        const a = e.target.dataset?.a;
        if (a === "yes") { const m = { avatar: pick, name: input.value.trim() || Share.tr(AVATARS.find((x) => x[0] === pick)[1]) }; store.set(ME_KEY, JSON.stringify(m)); done(m); }
        else if (a === "no" || e.target === ov) done(null);
      });
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") ov.querySelector("[data-a=yes]").click(); });
      document.body.appendChild(ov);
    });
  }
  async function ensureMe() { return me() || (await askMe(true)); }

  /* ---------- Firebase ---------- */
  function connect() {
    if (!connecting) connecting = (async () => {
      fb = await import(SDK);
      const app = fb.initializeApp(FB);
      db = fb.getDatabase(app);
      if (EMU) { // local emulator: a made-up id per device stands in for anonymous sign-in
        uid = store.get("scoreboard-emu-uid") || "emu" + Math.random().toString(36).slice(2, 12); store.set("scoreboard-emu-uid", uid);
        fb.connectDatabaseEmulator(db, location.hostname, 9000, { mockUserToken: { sub: uid, user_id: uid } });
      } else uid = (await fb.signInAnonymously(fb.getAuth(app))).user.uid;
      fb.onValue(fb.ref(db, ".info/serverTimeOffset"), (s) => (offset = s.val() || 0));
    })().catch((e) => { connecting = null; throw e; });
    return connecting;
  }
  const now = () => Date.now() + offset; // server time
  const rRef = (path = "") => fb.ref(db, `rooms/${code}${path ? "/" + path : ""}`);
  const pack = () => ({ json: JSON.stringify(board.get()), at: now(), off: offset, by: session });
  const memberData = (m) => ({ name: m.name, avatar: m.avatar, online: true, seen: now() });

  /* ---------- roles ---------- */
  const isOwner = () => !!room && room.owner === uid;
  const canEdit = () => !room || isOwner() || room.editors?.[uid] === true;
  function applyRole() {
    const view = !!room && !canEdit();
    document.body.classList.toggle("viewonly", view);
    document.body.classList.toggle("shared", !!room);
    document.querySelectorAll("input.name").forEach((i) => (i.readOnly = view));
    const btn = $("shareBtn");
    if (btn) {
      btn.classList.toggle("live", !!room); btn.classList.toggle("watch", view);
      btn.querySelector(".code").textContent = room ? (view ? "👁 " : "") + code : "";
      const asks = isOwner() ? Object.entries(room.members || {}).filter(([id, m]) => m.req && !room.editors?.[id]).length : 0;
      btn.classList.toggle("ask", asks > 0);
      btn.setAttribute("aria-label", room ? (view ? `觀賽中，分享碼 ${code}` : `分享中，分享碼 ${code}`) : "分享記分板");
    }
  }

  /* ---------- watching the room ---------- */
  function watch(c) {
    stopWatch?.(); code = c; store.set(ROOM_KEY, c);
    let first = true;
    stopWatch = fb.onValue(rRef(), (snap) => {
      const r = snap.val();
      if (!r) { const wasIn = !!room; room = null; pendingNote = first ? "找不到這個分享碼，可能已經結束了" : wasIn ? "分享已經結束" : ""; toast(pendingNote); leaveLocal(); return; }
      if (r.sport !== board.sport) { location.assign(PAGES[r.sport] + "?room=" + c); return; }
      room = r; first = false;
      const st = r.state;
      if (st && st.by !== session && (!seenState || st.at !== seenState.at || st.by !== seenState.by)) {
        seenState = st;
        applying = true; // the board saves what it receives; that must not be sent back out
        try { board.apply(JSON.parse(st.json), { elapsed: Math.max(0, now() - st.at), shift: (st.off || 0) - offset }); } catch (e) { console.error(e); }
        applying = false;
      }
      announce(r.members || {});
      applyRole(); renderSheet();
    }, () => { toast("連不上分享，請檢查網路"); });
    const mRef = rRef("members/" + uid);
    stopConn?.(); stopConn = fb.onValue(fb.ref(db, ".info/connected"), (s) => { if (s.val() && code === c) { fb.onDisconnect(fb.ref(db, `rooms/${c}/members/${uid}/online`)).set(false); fb.update(mRef, { online: true, seen: now() }).catch(() => {}); } });
  }
  function announce(members) {
    // a short note when someone joins, or (for the owner) asks to edit
    if (knownMembers) Object.entries(members).forEach(([id, m]) => {
      const was = knownMembers[id];
      if (id === uid) return;
      if (m.online && !was?.online) toast(`${m.avatar} ${m.name} 加入了`);
      if (isOwner() && m.req && !was?.req && !room.editors?.[id]) toast(`${m.avatar} ${m.name} 想要編輯權限`);
    });
    knownMembers = JSON.parse(JSON.stringify(members));
  }

  async function create() {
    const m = await ensureMe(); if (!m) return;
    busy(true);
    try {
      await connect();
      for (let i = 0; i < 30; i++) {
        const c = Array.from({ length: 4 }, () => CODE_CHARS[(Math.random() * CODE_CHARS.length) | 0]).join("");
        const t = await fb.runTransaction(fb.ref(db, "rooms/" + c), (cur) => {
          if (cur && cur.state && now() - (cur.state.at || 0) < STALE) return; // taken
          return { owner: uid, sport: board.sport, created: now(), editors: { [uid]: true }, members: { [uid]: memberData(m) }, state: pack() };
        }, { applyLocally: false });
        if (t.committed) { seenState = t.snapshot.val().state; watch(c); return; }
      }
      toast("暫時建立不了分享，請再試一次");
    } catch (e) { console.error(e); toast("連不上分享，請檢查網路"); } finally { busy(false); }
  }
  async function join(c, quiet) {
    c = (c || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
    if (c.length !== 4) { toast("分享碼是 4 個字"); return; }
    const m = quiet ? me() : await ensureMe(); if (!m) return;
    busy(true);
    try {
      await connect();
      const snap = await fb.get(fb.ref(db, "rooms/" + c));
      if (!snap.exists()) { toast("找不到這個分享碼，可能已經結束了"); if (store.get(ROOM_KEY) === c) store.set(ROOM_KEY, null); return; }
      const r = snap.val();
      if (r.sport !== board.sport) { location.assign(PAGES[r.sport] + "?room=" + c); return; }
      // keep this device's own game aside while watching someone else's
      if (r.owner !== uid && store.get(board.key + "-own") == null) store.set(board.key + "-own", store.get(board.key) || "");
      await fb.update(fb.ref(db, `rooms/${c}/members/${uid}`), { ...memberData(m), req: r.members?.[uid]?.req || false });
      watch(c);
    } catch (e) { console.error(e); toast("連不上分享，請檢查網路"); } finally { busy(false); }
  }
  async function leave() {
    if (!room) return;
    if (isOwner()) {
      const ok = await Kit.confirm({ title: "結束分享？", text: "所有觀賽的人會斷線，分享碼也會失效。你的記分板會保留目前的比分。", ok: "結束分享" });
      if (!ok) return false;
      stopWatch?.(); stopWatch = null; stopConn?.(); stopConn = null; await fb.remove(rRef()).catch(() => {});
      room = null; code = null; store.set(ROOM_KEY, null); applyRole(); renderSheet(); toast("已結束分享");
      return true;
    }
    const ok = await Kit.confirm({ title: "離開這場比賽？", text: "你的裝置會回到自己的記分板。", ok: "離開", danger: false });
    if (!ok) return false;
    await fb.update(rRef("members/" + uid), { online: false }).catch(() => {});
    pendingNote = "";
    room = null; leaveLocal();
    return true;
  }
  function leaveLocal() {
    // back to this device's own game (saved when joining)
    stopWatch?.(); stopWatch = null; stopConn?.(); stopConn = null; code = null; store.set(ROOM_KEY, null);
    const own = store.get(board.key + "-own");
    if (own != null) { store.set(board.key, own || null); store.set(board.key + "-own", null); if (pendingNote) store.set("scoreboard-note", pendingNote); location.replace(location.pathname); return; }
    applyRole(); renderSheet();
  }
  const setEditor = (id, on) => fb.update(rRef(), { [`editors/${id}`]: on ? true : null, [`members/${id}/req`]: false }).catch(() => toast("沒有權限修改"));
  const askEdit = (on) => fb.update(rRef("members/" + uid), { req: on }).catch(() => {});

  /* ---------- pushing changes ---------- */
  function changed() {
    if (!room || !canEdit() || applying) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => { const st = pack(); seenState = st; fb.set(rRef("state"), st).catch(() => toast("同步失敗，請檢查網路")); }, 60);
  }

  /* ---------- viewers can look but not touch ---------- */
  const ALLOW = ".dj, .sportsel, #shareBtn, #helpBtn, #fsBtn, #setBtn, #shareOv, #meOv, #keyOv, #muOv, .langsel, #setHelp, .donate, #brkBack, .overlay.parked";
  let nagAt = 0;
  function guard(e) {
    if (!document.body.classList.contains("viewonly")) return;
    const t = e.target;
    if (!(t instanceof Element) || t.closest(ALLOW) || (t.classList.contains("overlay") && e.type === "click")) return;
    if (e.type === "keydown") { if (e.key === "Escape" || e.key === "Tab") return; }
    else if (!t.closest("button, input, select, .score, .clock, [role=switch], [role=button], .seg, .dots, .chip, #game, #shot, label")) { if (e.type !== "click") return; }
    e.preventDefault(); e.stopImmediatePropagation();
    if ((e.type === "click" || e.type === "keydown") && Date.now() - nagAt > 1500) { nagAt = Date.now(); toast("觀賽中：需要擁有者開放編輯權限才能操作"); }
  }
  ["pointerdown", "mousedown", "touchstart", "click", "dblclick", "wheel", "keydown", "input", "change", "contextmenu"].forEach((t) => document.addEventListener(t, guard, { capture: true, passive: false }));

  /* ---------- share sheet ---------- */
  let ov;
  function buildSheet() {
    ov = document.createElement("div"); ov.className = "overlay"; ov.id = "shareOv"; ov.hidden = true;
    ov.innerHTML = `<div class="sheet" role="dialog" aria-labelledby="shTitle"><h2 id="shTitle">分享記分板</h2><div class="shbody"></div></div>`;
    ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; });
    document.body.appendChild(ov);
  }
  const link = () => new URL((PAGES[board.sport] || "./") + "?room=" + code, location.href).href;
  function renderSheet() {
    if (!ov || ov.hidden) return;
    const body = ov.querySelector(".shbody"), m = me();
    const who = m ? `<button class="mebtn" data-a="me"><span class="av">${m.avatar}</span><span><b data-notr>${esc(m.name)}</b><small>修改身分</small></span></button>` : "";
    if (!room) {
      body.innerHTML = `${who}
        <p class="muted">建立分享後，朋友輸入 4 碼分享碼或打開連結就能即時看到比分。你可以決定誰能一起記分。</p>
        <button class="btn primary wide" data-a="create">建立分享</button>
        <div class="hr"></div>
        <label class="lbl" for="joinCode">加入別人的記分板</label>
        <div class="joinrow"><input id="joinCode" class="codein" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD" inputmode="text"><button class="btn primary" data-a="join">加入</button></div>`;
      const inp = body.querySelector("#joinCode");
      inp.addEventListener("input", () => (inp.value = inp.value.toUpperCase().replace(/[^0-9A-Z]/g, "")));
      inp.addEventListener("keydown", (e) => { if (e.key === "Enter") join(inp.value); });
      return;
    }
    const owner = isOwner(), edit = canEdit();
    const members = Object.entries(room.members || {}).sort(([a, x], [b, y]) => (a === room.owner ? -1 : b === room.owner ? 1 : (y.online ? 1 : 0) - (x.online ? 1 : 0)));
    const role = owner ? "你是擁有者" : edit ? "你可以一起記分" : "你正在觀賽";
    body.innerHTML = `<div class="codebox"><small>分享碼</small><div class="bigcode" data-notr>${code}</div><small>${role}</small></div>
      <div class="sharerow"><button class="btn primary" data-a="send">分享連結</button><button class="btn" data-a="copy">複製連結</button></div>
      <div class="hr"></div>
      <div class="lbl">在場的人${owner ? "（打開開關就能一起記分）" : ""}</div>
      <ul class="members">${members.map(([id, x]) => {
        const isO = id === room.owner, ed = isO || room.editors?.[id] === true;
        const tag = isO ? "擁有者" : ed ? "可記分" : x.req ? "想要編輯" : "觀賽";
        const ctl = owner && !isO ? `<button class="switch" role="switch" aria-checked="${ed}" data-a="ed" data-id="${id}" aria-label="讓 ${esc(x.name)} 記分"></button>` : "";
        return `<li class="${x.online ? "on" : "off"}${x.req && !ed ? " req" : ""}"><span class="av">${x.avatar}</span><span class="nm"><b data-notr>${esc(x.name)}</b>${id === uid ? "<small>（你）</small>" : ""}</span><span class="tag">${tag}</span>${ctl}</li>`;
      }).join("")}</ul>
      ${!edit ? `<button class="btn wide" data-a="ask">${room.members?.[uid]?.req ? "已送出申請，等擁有者開放" : "申請記分權限"}</button>` : ""}
      ${who}
      <div class="actions"><button class="btn danger" data-a="leave">${owner ? "結束分享" : "離開"}</button><button class="btn primary" data-a="close">完成</button></div>`;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function busy(on) { ov?.querySelectorAll("button").forEach((b) => (b.disabled = on)); }
  async function onSheetClick(e) {
    const b = e.target.closest("[data-a]"); if (!b) return;
    const a = b.dataset.a;
    if (a === "create") create();
    else if (a === "join") join(ov.querySelector("#joinCode").value);
    else if (a === "me") { const m = await askMe(false); if (m && room) fb.update(rRef("members/" + uid), { name: m.name, avatar: m.avatar }); renderSheet(); }
    else if (a === "copy") { try { await navigator.clipboard.writeText(link()); toast("連結已複製"); } catch (err) { prompt(Share.tr("複製這個連結："), link()); } }
    else if (a === "send") {
      const data = { title: Share.tr("比賽記分板"), text: Share.tr(`一起看比分！分享碼 ${code}`), url: link() };
      if (navigator.share) navigator.share(data).catch(() => {}); else { try { await navigator.clipboard.writeText(link()); toast("連結已複製"); } catch (err) {} }
    }
    else if (a === "ed") setEditor(b.dataset.id, b.getAttribute("aria-checked") !== "true");
    else if (a === "ask") askEdit(!room.members?.[uid]?.req);
    else if (a === "leave") { if (await leave()) ov.hidden = true; }
    else if (a === "close") ov.hidden = true;
  }
  function open() {
    if (!enabled) return;
    if (!ov) { buildSheet(); ov.addEventListener("click", onSheetClick); }
    ov.hidden = false; renderSheet();
  }

  /* ---------- small notes at the bottom of the screen ---------- */
  let toastEl, toastT = 0;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "sharetoast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (toastEl.hidden = true), 2600);
  }

  /* ---------- hook-up ---------- */
  function attach(b) {
    board = b;
    const btn = $("shareBtn");
    if (!enabled) { btn?.remove(); return; }
    btn?.addEventListener("click", open);
    // switching sport while sharing ends (owner) or leaves (viewer) the room first
    $("sportSel")?.addEventListener("change", async (e) => {
      if (!room) return;
      e.stopImmediatePropagation();
      const target = e.target.value; e.target.value = [...e.target.options].find((o) => PAGES[board.sport] === o.value)?.value || "./";
      if (await leave()) location.assign(target);
    }, true);
    const note = store.get("scoreboard-note"); if (note) { store.set("scoreboard-note", null); setTimeout(() => toast(note), 300); }
    const c = params.get("room"), saved = store.get(ROOM_KEY);
    if (c) { history.replaceState(null, "", location.pathname + (EMU ? "?emu" : "")); join(c); }
    else if (saved) join(saved, true);
  }

  return { attach, changed, tr: (s) => (typeof I18N !== "undefined" ? I18N.tr(s) : s), get enabled() { return enabled; }, canEdit };
})();
