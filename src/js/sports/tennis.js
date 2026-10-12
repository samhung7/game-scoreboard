/* Tennis (ITF Rules of Tennis). Points 0-15-30-40, deuce and advantage (or no-ad: one deciding point at 40-40).
   A set is the first to 6 games by 2; at 6-6 a tiebreak to 7 by 2. Final set options: the same 7-point tiebreak,
   a 10-point tiebreak at 6-6 (Grand Slam rule since 2022), or a 10-point match tiebreak instead of the final set.
   Serve alternates every game; in a tiebreak the first server serves 1 point, then 2 each. Players change ends after
   every odd game across the match, and every 6 points in a tiebreak. 90 s at a change of ends, 120 s between sets. */
window.SPORT = (() => {
  const { other, bestText, pair } = RallyRules;
  const PTS = ["0", "15", "30", "40"];
  const swapEv = (text) => ({ type: "swap", text });
  return {
    id: "tennis", title: "網球記分板", unit: "盤", unitShort: "S", maxPts: 40, pads: "tennis", showLead: false,
    defaults: { type: "single", sets: 3, games: 6, ad: true, final: "tb7", rests: true },
    types: [["single", "單打"], ["double", "雙打"]],
    names: (t) => pair(t !== "double"),
    settings: [
      { key: "type", kind: "seg", label: "單打 / 雙打", help: "雙打兩邊各填兩位選手名字", options: [["single", "單打"], ["double", "雙打"]] },
      { key: "sets", kind: "seg", label: "盤數", help: "先贏過半的一方獲勝", options: [[1, "1 盤"], [3, "3 盤 2 勝"], [5, "5 盤 3 勝"]] },
      { key: "games", kind: "seg", label: "每盤局數", help: "先贏這麼多局且領先 2 局；平手時打搶七", options: [[6, "6 局"], [4, "4 局（短盤）"]] },
      { key: "ad", kind: "switch", label: "Deuce 要連贏 2 分", help: "關掉就是無占先制：40 平時打一球決勝分" },
      { key: "final", kind: "seg", label: "決勝盤", help: "大滿貫決勝盤 6 平打搶十；業餘賽常以搶十取代第三盤", options: [["tb7", "搶七"], ["tb10", "6 平搶十"], ["super", "直接搶十"]], when: (c) => c.sets > 1 },
      { key: "rests", kind: "switch", label: "盤間休息計時", help: "盤與盤之間休息 120 秒" },
    ],
    rule: (c) => `${bestText(c.sets, "盤")} · ${c.games} 局${c.ad ? "" : " · 無占先"}${c.sets > 1 && c.final === "super" ? " · 決勝搶十" : ""}`,
    best: (c) => c.sets,
    startUnit(S, first, w, x, reset) {
      if (first) { S.server = "a"; S.x = { count: 0 }; }
      else if (!reset && S.x.tb) S.server = other(S.x.tbInit); // whoever received first in the tiebreak serves the next set
      S.score = { a: 0, b: 0 }; S.x.g = { a: 0, b: 0 }; S.x.tbDone = false; S.x.last = null;
      S.x.sup = !!x && x.deciding && S.cfg.sets > 1 && S.cfg.final === "super";
      S.x.tb = S.x.sup; S.x.tbTo = 10;
      if (S.x.tb) S.x.tbInit = S.server;
    },
    rally(S, s) { S.score[s] += 1; },
    // in a tiebreak the server follows from the points played: 1 serve, then 2 each
    sync(S) { if (S.x.tb) { const n = S.score.a + S.score.b; S.server = Math.floor((n + 1) / 2) % 2 === 0 ? S.x.tbInit : other(S.x.tbInit); } },
    toggleServe(S) { if (S.x.tb) { S.x.tbInit = other(S.x.tbInit); this.sync(S); } else S.server = other(S.server); },
    settle(S, s, x) {
      const p = S.score, o = other(s), ev = [];
      const gameWon = () => {
        S.x.g[s] += 1; S.x.count += 1; S.score = { a: 0, b: 0 };
        if (S.x.count % 2 === 1) ev.push(swapEv("換場：單數局結束，休息 90 秒"));
      };
      if (S.x.tb) {
        if (p[s] >= S.x.tbTo && p[s] - p[o] >= 2) { S.x.last = { ...p }; S.x.tbDone = true; gameWon(); }
        else if ((p.a + p.b) % 6 === 0) ev.push(swapEv("換場：搶七每 6 分交換場地"));
        return ev;
      }
      const won = S.cfg.ad ? p[s] >= 4 && p[s] - p[o] >= 2 : p[s] >= 4 && p[s] > p[o];
      if (!won) return ev;
      gameWon(); S.server = other(S.server);
      const G = S.cfg.games;
      if (S.x.g.a === G && S.x.g.b === G) {
        S.x.tb = true; S.x.tbInit = S.server;
        S.x.tbTo = x.deciding && S.cfg.sets > 1 && S.cfg.final === "tb10" ? 10 : 7;
        ev.push({ type: "toast", text: `${G} 平，進入${S.x.tbTo === 10 ? "搶十" : "搶七"}` });
      }
      return ev;
    },
    unitWinner(S) {
      const g = S.x.g, G = S.cfg.games;
      return ["a", "b"].find((s) => (S.x.sup ? g[s] >= 1 : g[s] >= G && (g[s] - g[other(s)] >= 2 || S.x.tbDone))) || null;
    },
    unitResult: (S, w) => ({ a: S.x.g.a, b: S.x.g.b, w, tb: S.x.last, sup: S.x.sup }),
    unitLabel: (u) => (u.sup ? `[${u.tb.a}-${u.tb.b}]` : `${u.a}-${u.b}${u.tb ? `(${Math.min(u.tb.a, u.tb.b)})` : ""}`),
    fmt(S, s, v) {
      if (S.x.tb) return String(v);
      const o = S.score[other(s)];
      if (v >= 3 && o >= 3) return v > o ? "AD" : "40";
      return PTS[v] ?? "G";
    },
    extra: (S, s) => `局數 <b>${S.x.g[s]}</b>`,
    betweenUnits: (S, w, x) => [{ type: "rest", sec: 120, tag: `第 ${x.idx} 盤結束`, title: `${S.names[w]} 拿下這盤`, detail: `盤間休息 120 秒。第 ${x.idx + 1} 盤由 ${S.names[S.server]} 先發球。` }],
    timeouts: () => ({ n: 0, sec: 0, per: "unit" }),
    serve: (S) => ({ side: S.server, text: (S.score.a + S.score.b) % 2 === 0 ? "右區" : "左區" }),
    call(S) {
      const { a, b } = S.score;
      if (S.x.tb) return `${S.x.tbTo === 10 ? "搶十" : "搶七"} ${a}-${b}`;
      if (a >= 3 && b >= 3) return a === b ? (S.cfg.ad ? "Deuce 平分" : "決勝分") : `占先 ${S.names[a > b ? "a" : "b"]}`;
      return "";
    },
    restButton: (S) => (S.score.a + S.score.b === 0 && S.x.g.a + S.x.g.b === 0 && S.units.length ? { sec: 120, tag: "盤間休息" } : { sec: 90, tag: "換場休息", title: "換場休息 90 秒" }),
    help: [
      "每一球按贏球那一邊的「+1 得分」（或點一下比分大數字），分數會照 0、15、30、40 顯示，40 平之後是 Deuce 和占先 AD。局數、盤數、發球權和換場都會自動算。按錯就按「復原」。",
      "先贏 6 局且領先 2 局拿下一盤，6 平打搶七（先到 7 分且領先 2 分）。搶七第一分由輪到的人發 1 球，之後每人發 2 球，每 6 分換場。",
      "單數局結束（第 1、3、5…局）換場，可休息 90 秒；盤與盤之間休息 120 秒。決勝盤可以在設定裡改成 6 平搶十，或直接用搶十取代。",
    ],
  };
})();
