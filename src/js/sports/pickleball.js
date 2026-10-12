/* Pickleball (USA Pickleball rulebook). Games to 11 (or 15 / 21), win by 2.
   Traditional side-out scoring: only the serving side scores. In doubles each team has two servers; the first serving team
   of a game starts with only its second server ("0-0-2"). Score call: server's score, receiver's score, server number.
   Rally scoring (allowed in many formats since 2026): every rally scores, losing the rally passes the serve.
   Ends change after each game and, in the last game of the match, when a team first reaches 6 (8 in a game to 15, 11 to 21).
   Timeouts: 2 of 1 minute per game (3 in a game to 21); 2 minutes between games. */
window.SPORT = (() => {
  const { other, winBy2, bestText, pair } = RallyRules;
  const sideOut = (c) => c.scoring !== "rally";
  const dbl = (c) => c.type === "double";
  return {
    id: "pickleball", title: "匹克球記分板", unit: "局", unitShort: "G", maxPts: 60, pads: "pickleball",
    defaults: { type: "double", scoring: "side", pts: 11, best: 1, rests: true },
    types: [["double", "雙打"], ["single", "單打"]],
    names: (t) => pair(t !== "double"),
    settings: [
      { key: "type", kind: "seg", label: "單打 / 雙打", help: "雙打兩邊各填兩位選手名字", options: [["double", "雙打"], ["single", "單打"]] },
      { key: "scoring", kind: "seg", label: "計分方式", help: "傳統制只有發球方能得分；每球得分制每一球都算分", options: [["side", "傳統發球得分"], ["rally", "每球得分"]] },
      { key: "pts", kind: "seg", label: "每局分數", help: "到這個分數且領先 2 分就贏", options: [[11, "11 分"], [15, "15 分"], [21, "21 分"]] },
      { key: "best", kind: "seg", label: "局數", help: "一般球敘打 1 局，比賽常見 3 局 2 勝", options: [[1, "1 局"], [3, "3 局 2 勝"], [5, "5 局 3 勝"]] },
      { key: "rests", kind: "switch", label: "局間休息計時", help: "局與局之間休息 2 分鐘" },
    ],
    rule: (c) => `${bestText(c.best, "局")} · ${c.pts} 分 · ${sideOut(c) ? "傳統制" : "每球得分"}`,
    best: (c) => c.best,
    startUnit(S, first, w, x, reset) {
      S.score = { a: 0, b: 0 }; S.x.mid = false;
      if (!reset) { S.x.first = first ? "a" : other(S.x.first); S.server = S.x.first; } // the other team serves first next game
      S.x.num = dbl(S.cfg) && sideOut(S.cfg) ? 2 : 1;
    },
    rally(S, s) {
      if (!sideOut(S.cfg)) { S.score[s] += 1; S.server = s; S.x.num = 1; return true; }
      if (s === S.server) { S.score[s] += 1; return true; }
      if (dbl(S.cfg) && S.x.num === 1) { S.x.num = 2; return false; } // second server's turn
      S.server = s; S.x.num = 1; return false;                           // side out
    },
    toggleServe(S) {
      S.server = other(S.server);
      const start = S.score.a + S.score.b === 0;
      if (start) S.x.first = S.server;
      S.x.num = start && dbl(S.cfg) && sideOut(S.cfg) ? 2 : 1;
    },
    settle(S, s, x) {
      const half = Math.ceil(S.cfg.pts / 2);
      if (x.deciding && !S.x.mid && Math.max(S.score.a, S.score.b) >= half) { S.x.mid = true; return [{ type: "swap", text: `換場：最後一局有隊伍先到 ${half} 分` }]; }
      return [];
    },
    unitWinner: (S) => winBy2(S.score, S.cfg.pts),
    unitResult: (S, w) => ({ a: S.score.a, b: S.score.b, w }),
    unitLabel: (u) => `${u.a}-${u.b}`,
    fmt: (S, s, v) => String(v),
    betweenUnits: (S, w, x) => [{ type: "swap" }, { type: "rest", sec: 120, tag: `第 ${x.idx} 局結束`, title: `${S.names[w]} 拿下這局`, detail: `局間休息 2 分鐘，雙方換場。第 ${x.idx + 1} 局由 ${S.names[S.server]} 先發球。` }],
    timeouts: (c) => ({ n: c.pts >= 21 ? 3 : 2, sec: 60, per: "unit" }),
    serve(S) {
      const court = S.score[S.server] % 2 === 0 ? "右區" : "左區";
      if (dbl(S.cfg)) return { side: S.server, text: sideOut(S.cfg) ? `第 ${S.x.num} 發球員` : "" };
      return { side: S.server, text: court };
    },
    call(S) {
      const me = S.score[S.server], op = S.score[other(S.server)];
      return `報分 ${me}-${op}${dbl(S.cfg) && sideOut(S.cfg) ? `-${S.x.num}` : ""}`;
    },
    restButton: (S) => (S.score.a + S.score.b === 0 && S.units.length ? { sec: 120, tag: "局間休息" } : { sec: 60, tag: "暫停", title: "暫停 1 分鐘" }),
    help: [
      "每一球按贏球那一邊的「+1 得分」（或點一下比分大數字）。傳統制只有發球方贏球才得分；接發球方贏球只會換發球員或換邊發球（Side out），記分板會自動處理。按錯就按「復原」。",
      "雙打報分是「發球方分數－接發方分數－第幾發球員」，每局一開始先發球的隊伍只有一位發球員，所以從 0-0-2 開始。單打的發球方分數是偶數時從右區發、奇數從左區發。",
      "每局 11 分、領先 2 分才贏。每局結束換場，最後一局有隊伍先到 6 分時再換一次。每隊每局 2 次暫停各 1 分鐘（21 分制 3 次），點名字下方的圓點開始計時。",
    ],
  };
})();
