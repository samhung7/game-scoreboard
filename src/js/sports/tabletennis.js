/* Table tennis (ITTF). Games to 11, win by 2; matches best of 3, 5 or 7.
   Service changes every 2 points; from 10-10 it changes every point. The player who served first in a game receives first in the next.
   Ends change after each game, and in the last possible game when one player first reaches 5.
   Up to 1 minute between games; one timeout of up to 1 minute per player per match. */
window.SPORT = (() => {
  const { other, winBy2, bestText, pair } = RallyRules;
  const deuceAt = (c) => 2 * (c.pts - 1);
  return {
    id: "tabletennis", title: "桌球記分板", unit: "局", unitShort: "G", maxPts: 60, pads: "tabletennis",
    defaults: { type: "single", best: 5, pts: 11, rests: true },
    types: [["single", "單打"], ["double", "雙打"]],
    names: (t) => pair(t !== "double"),
    settings: [
      { key: "type", kind: "seg", label: "單打 / 雙打", help: "雙打兩邊各填兩位選手名字", options: [["single", "單打"], ["double", "雙打"]] },
      { key: "best", kind: "seg", label: "局數", help: "先贏過半的一方獲勝", options: [[3, "3 局 2 勝"], [5, "5 局 3 勝"], [7, "7 局 4 勝"]] },
      { key: "pts", kind: "num", label: "每局分數", help: "目前規則是 11 分，領先 2 分才贏", min: 5, max: 30, suffix: "分" },
      { key: "rests", kind: "switch", label: "局間休息計時", help: "局與局之間最多休息 1 分鐘" },
    ],
    rule: (c) => `${bestText(c.best, "局")} · ${c.pts} 分`,
    best: (c) => c.best,
    startUnit(S, first, w, x, reset) {
      S.score = { a: 0, b: 0 }; S.x.mid = false;
      if (!reset) S.x.init = first ? "a" : other(S.x.init);
      this.sync(S);
    },
    // who serves follows from the score: 2 serves each, then 1 each from deuce
    sync(S) {
      const n = S.score.a + S.score.b, D = deuceAt(S.cfg);
      const turn = n >= D ? (S.cfg.pts - 1) + (n - D) : Math.floor(n / 2);
      S.server = turn % 2 === 0 ? S.x.init : other(S.x.init);
    },
    rally(S, s) { S.score[s] += 1; },
    toggleServe(S) { S.x.init = other(S.x.init); this.sync(S); },
    settle(S, s, x) {
      const half = Math.floor(S.cfg.pts / 2);
      if (x.deciding && !S.x.mid && Math.max(S.score.a, S.score.b) >= half) {
        S.x.mid = true;
        return [{ type: "swap", text: `換場：決勝局先到 ${half} 分${S.cfg.type === "double" ? "，接發球方交換接發順序" : ""}` }];
      }
      return [];
    },
    unitWinner: (S) => winBy2(S.score, S.cfg.pts),
    unitResult: (S, w) => ({ a: S.score.a, b: S.score.b, w }),
    unitLabel: (u) => `${u.a}-${u.b}`,
    fmt: (S, s, v) => String(v),
    betweenUnits: (S, w, x) => [{ type: "swap" }, { type: "rest", sec: 60, tag: `第 ${x.idx} 局結束`, title: `${S.names[w]} 拿下這局`, detail: `局間休息最多 1 分鐘，雙方換邊。第 ${x.idx + 1} 局由 ${S.names[S.server]} 先發球。` }],
    timeouts: () => ({ n: 1, sec: 60, per: "match" }),
    serve(S) {
      const n = S.score.a + S.score.b;
      return { side: S.server, text: n >= deuceAt(S.cfg) ? "每球換發" : n % 2 === 0 ? "發 2 球" : "再 1 球" };
    },
    call: (S) => (S.score.a + S.score.b >= deuceAt(S.cfg) ? `${S.cfg.pts - 1} 平之後每球換發` : ""),
    restButton: (S) => (S.score.a + S.score.b === 0 && S.units.length ? { sec: 60, tag: "局間休息" } : { sec: 60, tag: "暫停", title: "暫停 1 分鐘" }),
    help: [
      "每一球按贏球那一邊的「+1 得分」（或點一下比分大數字）。發球每 2 分換一次，10 平之後每 1 分換一次，記分板會自動顯示誰發球、還剩幾球。按錯就按「復原」。",
      "每局 11 分、領先 2 分才贏，常見 5 局 3 勝或 7 局 4 勝。每局結束換邊，決勝局有人先到 5 分時再換一次。下一局由上一局先接發球的一方先發。",
      "每位選手整場比賽可以叫 1 次暫停，最多 1 分鐘：點名字下方的圓點開始計時。局與局之間最多休息 1 分鐘。",
    ],
  };
})();
